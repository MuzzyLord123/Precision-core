
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'owner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,
  how_found_us TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage customers" ON public.customers FOR ALL USING (auth.uid() IS NOT NULL);

-- Create enquiries table
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref TEXT UNIQUE NOT NULL DEFAULT ('MBM-' || upper(substr(md5(random()::text), 1, 6))),
  customer_id UUID REFERENCES public.customers(id),
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('price_widget','contact_form','booking_form','walk_in','manual')),
  device_type TEXT,
  device_model TEXT,
  repairs_requested TEXT[],
  booked_date DATE,
  booked_time TEXT,
  is_walk_in BOOLEAN DEFAULT false,
  issue_description TEXT,
  photos TEXT[],
  how_found_us TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','confirmed','in_progress','ready_for_collection','completed','cancelled')),
  estimated_price_pence INTEGER,
  confirmed_price_pence INTEGER,
  deposit_paid BOOLEAN DEFAULT false,
  deposit_amount_pence INTEGER DEFAULT 0,
  stripe_payment_intent_id TEXT,
  owner_notes TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  collected_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage enquiries" ON public.enquiries FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Create enquiry_activity table
CREATE TABLE public.enquiry_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.enquiry_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage activity" ON public.enquiry_activity FOR ALL USING (auth.uid() IS NOT NULL);

-- Create repair_pricing table
CREATE TABLE public.repair_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_type TEXT NOT NULL,
  device_model TEXT NOT NULL,
  repair_type TEXT NOT NULL,
  price_from_pence INTEGER NOT NULL,
  price_display TEXT,
  turnaround_mins INTEGER,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.repair_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pricing" ON public.repair_pricing FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage pricing" ON public.repair_pricing FOR ALL USING (auth.uid() IS NOT NULL);

-- Create business_settings table
CREATE TABLE public.business_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  shop_name TEXT DEFAULT 'MobiMedic',
  address TEXT DEFAULT 'Guilden Sutton, Chester',
  phone TEXT DEFAULT '+44 1234 567890',
  email TEXT DEFAULT 'hello@mobimedic.co.uk',
  opening_hours JSONB DEFAULT '{"mon":"9:00-18:00","tue":"9:00-18:00","wed":"9:00-18:00","thu":"9:00-18:00","fri":"9:00-18:00","sat":"10:00-16:00","sun":"Closed"}'::jsonb,
  deposit_required BOOLEAN DEFAULT false,
  deposit_amount_pence INTEGER DEFAULT 1000,
  max_bookings_per_day INTEGER DEFAULT 12,
  min_notice_hours INTEGER DEFAULT 2,
  warranty_months INTEGER DEFAULT 12,
  warranty_policy_text TEXT DEFAULT 'All repairs carry a 12-month parts and labour warranty.',
  notification_email TEXT DEFAULT 'owner@mobimedic.co.uk',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read settings" ON public.business_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update settings" ON public.business_settings FOR UPDATE USING (auth.uid() IS NOT NULL);

INSERT INTO public.business_settings (id) VALUES (1);

-- Trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_repair_pricing_updated_at BEFORE UPDATE ON public.repair_pricing FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_business_settings_updated_at BEFORE UPDATE ON public.business_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Owner'), NEW.email, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
