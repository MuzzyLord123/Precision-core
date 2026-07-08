import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";

const repairLinks = [
  { label: "Screen Replacement", href: "/repairs/screen-replacement" },
  { label: "Battery Replacement", href: "/repairs/battery-replacement" },
  { label: "Charging Port Repair", href: "/repairs/charging-port" },
  { label: "Camera Repair", href: "/repairs/camera-repair" },
  { label: "Water Damage Recovery", href: "/repairs/water-damage" },
  { label: "Data Recovery", href: "/repairs/data-recovery" },
  { label: "Software & Diagnostics", href: "/repairs/software-diagnostics" },
  { label: "Keyboard Repair", href: "/repairs/keyboard-repair" },
  { label: "Full Restoration", href: "/repairs/full-restoration" },
];

const deviceLinks = [
  { label: "iPhone", href: "/devices/iphone" },
  { label: "Samsung", href: "/devices/samsung" },
  { label: "iPad", href: "/devices/ipad" },
  { label: "MacBook", href: "/devices/macbook" },
  { label: "Laptop", href: "/devices/laptop" },
  { label: "iMac", href: "/devices/imac" },
  { label: "Apple Watch", href: "/devices/apple-watch" },
  { label: "AirPods", href: "/devices/airpods" },
  { label: "Gaming Consoles", href: "/devices/gaming-consoles" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const helpLinks = [
  { label: "Book a Repair", href: "/book" },
  { label: "Warranty Policy", href: "/warranty" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const Footer = () => {
  return (
    <footer className="relative" style={{ backgroundColor: "hsl(240 8% 2.5%)", borderTop: "1px solid hsl(var(--foreground) / 0.03)" }}>
      <div className="absolute inset-0 grain opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top section - CTA banner */}
        <div className="py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8" style={{ borderBottom: "1px solid hsl(var(--foreground) / 0.04)" }}>
          <div>
            <h3 className="font-display font-extralight text-[36px] md:text-[48px] text-foreground leading-[0.95] tracking-[-0.02em]">
              Need a repair?
            </h3>
            <p className="font-body text-[15px] text-foreground/25 mt-2">Book online or walk in — we're ready when you are.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/book"
              className="group relative overflow-hidden font-body font-semibold text-[14px] rounded-xl h-[50px] px-8 flex items-center justify-center gap-2 text-primary-foreground transition-all"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(355 71% 36%) 100%)" }}
            >
              <span className="relative z-10">Book Now</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            <a href="tel:+441234567890" className="font-body text-[14px] text-foreground/30 border border-foreground/6 rounded-xl h-[50px] px-6 flex items-center gap-2 hover:text-foreground/50 transition-colors">
              <Phone className="w-4 h-4" /> Call
            </a>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <div className="flex items-center">
                <span className="font-display text-[26px] font-light text-foreground">MOBI</span>
                <span className="font-display text-[26px] font-light text-primary">MEDIC</span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.25em] text-foreground/10 block mt-0.5">GUILDEN SUTTON · CHESTER</span>
            </Link>
            <p className="font-body text-[14px] font-light text-foreground/20 mb-6 leading-[1.7] max-w-[280px]">
              Expert device repairs with genuine parts, transparent pricing, and a 12-month warranty on every repair.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="font-mono text-[11px] text-foreground/18 leading-relaxed">Guilden Sutton<br />Chester, CH3</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary/30 flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+441234567890" className="font-mono text-[11px] text-foreground/18 hover:text-foreground/35 transition-colors">01234 567 890</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary/30 flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:hello@mobimedic.co.uk" className="font-mono text-[11px] text-foreground/18 hover:text-foreground/35 transition-colors">hello@mobimedic.co.uk</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-primary/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-mono text-[10px] text-foreground/15">Mon–Fri: 9am–6pm</p>
                  <p className="font-mono text-[10px] text-foreground/15">Sat: 10am–4pm</p>
                  <p className="font-mono text-[10px] text-foreground/10">Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repairs */}
          <div>
            <span className="font-mono text-[9px] text-foreground/18 tracking-[0.2em] uppercase block mb-6">Repairs</span>
            {repairLinks.map((l) => (
              <Link key={l.label} to={l.href} className="block font-body text-[12px] text-foreground/18 hover:text-foreground/40 transition-colors duration-200 mb-3 leading-relaxed">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Devices */}
          <div>
            <span className="font-mono text-[9px] text-foreground/18 tracking-[0.2em] uppercase block mb-6">Devices</span>
            {deviceLinks.map((l) => (
              <Link key={l.label} to={l.href} className="block font-body text-[12px] text-foreground/18 hover:text-foreground/40 transition-colors duration-200 mb-3 leading-relaxed">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <span className="font-mono text-[9px] text-foreground/18 tracking-[0.2em] uppercase block mb-6">Company</span>
            {companyLinks.map((l) => (
              <Link key={l.label} to={l.href} className="block font-body text-[12px] text-foreground/18 hover:text-foreground/40 transition-colors duration-200 mb-3 leading-relaxed">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Help */}
          <div>
            <span className="font-mono text-[9px] text-foreground/18 tracking-[0.2em] uppercase block mb-6">Help</span>
            {helpLinks.map((l) => (
              <Link key={l.label} to={l.href} className="block font-body text-[12px] text-foreground/18 hover:text-foreground/40 transition-colors duration-200 mb-3 leading-relaxed">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-wrap gap-6 justify-center font-mono text-[9px] text-foreground/8 tracking-wide" style={{ borderTop: "1px solid hsl(var(--foreground) / 0.03)" }}>
          <span>© 2025 MobiMedic. All rights reserved.</span>
          <span>Guilden Sutton, Chester</span>
          <Link to="/privacy" className="hover:text-foreground/20 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground/20 transition-colors">Terms</Link>
          <Link to="/warranty" className="hover:text-foreground/20 transition-colors">Warranty</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
