import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const Privacy = () => (
  <>
    <CustomCursor />
    <Navbar />
    <main>
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="w-10 h-[1px] bg-signal-red" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(204,41,54,0.8)" }}>Legal</span>
          </motion.div>
          <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] leading-[0.9] text-steel tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: customEase }}>
            Privacy Policy
          </motion.h1>
          <motion.p className="font-mono text-[11px] text-steel/25 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Last updated: March 2025</motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 relative">
        <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <div className="prose-custom space-y-8">
            {[
              { title: "1. Information We Collect", content: "When you book a repair, submit an enquiry, or contact us, we collect: your name, email address, phone number, device details, repair requirements, and any additional information you provide (such as descriptions of device issues or uploaded photos). We collect this information solely to process your repair and communicate with you about your booking." },
              { title: "2. How We Use Your Information", content: "We use your personal information to: process and manage your repair booking, communicate with you about your repair status, send you booking confirmations and collection notifications, maintain records for warranty purposes, and improve our services. We will never sell, rent, or share your personal data with third parties for marketing purposes." },
              { title: "3. Data Storage & Security", content: "Your data is stored securely using industry-standard encryption and access controls. We use Supabase for database hosting, which provides enterprise-grade security including encryption at rest and in transit. Only authorised MobiMedic staff can access your information." },
              { title: "4. Data Retention", content: "We retain your booking and repair data for 24 months after your last interaction to support warranty claims and service history. After this period, your data is securely deleted unless you request earlier deletion." },
              { title: "5. Your Rights", content: "Under UK GDPR, you have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to processing of your data, and request a portable copy of your data. To exercise any of these rights, contact us at hello@mobimedic.co.uk." },
              { title: "6. Cookies", content: "Our website uses essential cookies for functionality (such as remembering your booking progress). We do not use advertising or tracking cookies. No third-party analytics platforms track your browsing behaviour on our site." },
              { title: "7. Third-Party Services", content: "We use the following third-party services to operate: Supabase (database and authentication), Stripe (payment processing for deposits), and Resend (transactional emails). Each of these services has their own privacy policy and handles data in accordance with UK GDPR requirements." },
              { title: "8. Contact", content: "If you have any questions about this privacy policy or how we handle your data, contact us at hello@mobimedic.co.uk or visit our workshop in Guilden Sutton, Chester." },
            ].map((s) => (
              <div key={s.title}>
                <h2 className="font-body text-[18px] font-semibold mb-3" style={{ color: "#080809" }}>{s.title}</h2>
                <p className="font-body text-[15px] font-light leading-[1.8]" style={{ color: "#6B6B78" }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <MobileCTA />
  </>
);

export default Privacy;
