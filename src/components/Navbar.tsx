import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  { label: "Laptop (Other)", href: "/devices/laptop" },
  { label: "iMac", href: "/devices/imac" },
  { label: "Apple Watch", href: "/devices/apple-watch" },
  { label: "AirPods", href: "/devices/airpods" },
  { label: "Gaming Consoles", href: "/devices/gaming-consoles" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location]);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Repairs", href: "/repairs", children: repairLinks },
    { label: "Devices", href: "/devices", children: deviceLinks },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-6 lg:px-10"
        style={{
          backgroundColor: scrolled ? "hsl(var(--background) / 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(30px) saturate(1.5)" : "none",
          borderBottom: scrolled ? "1px solid hsl(var(--foreground) / 0.04)" : "1px solid transparent",
        }}
        animate={{ height: scrolled ? 64 : 76 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <Link to="/" className="flex flex-col group">
          <div className="flex items-center">
            <span className="font-display text-[22px] font-light tracking-wide text-foreground transition-colors">MOBI</span>
            <span className="font-display text-[22px] font-light tracking-wide text-primary">MEDIC</span>
          </div>
          <span className="font-mono text-[7px] tracking-[0.25em] text-foreground/10 group-hover:text-foreground/20 transition-colors">GUILDEN SUTTON</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link
                to={item.href}
                className={`font-body text-[13px] font-normal flex items-center gap-1 transition-all duration-300 relative py-2 ${
                  isActive(item.href) && item.href !== "/" 
                    ? "text-foreground" 
                    : item.href === "/" && location.pathname === "/" 
                    ? "text-foreground" 
                    : "text-foreground/30 hover:text-foreground/60"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3 transition-transform duration-200" style={{ transform: dropdown === item.label ? "rotate(180deg)" : "rotate(0)" }} />}
                {((isActive(item.href) && item.href !== "/") || (item.href === "/" && location.pathname === "/")) && (
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-primary rounded-full"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && dropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-0 pt-4"
                  >
                    <div
                      className="rounded-[18px] p-2.5 min-w-[260px]"
                      style={{
                        background: "hsl(var(--background) / 0.97)",
                        border: "1px solid hsl(var(--foreground) / 0.06)",
                        backdropFilter: "blur(30px) saturate(1.5)",
                        boxShadow: "0 20px 60px hsl(0 0% 0% / 0.4), 0 0 0 1px hsl(var(--foreground) / 0.03)",
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="flex items-center justify-between px-4 py-3 rounded-[12px] font-body text-[13px] text-foreground/35 hover:text-foreground hover:bg-foreground/[0.03] transition-all duration-200 group/item"
                        >
                          {child.label}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-50 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-5">
          <Link to="/login" className="font-body text-[12px] text-foreground/15 hover:text-foreground/35 transition-colors">Login</Link>
          <Link
            to="/book"
            className="group relative overflow-hidden font-body text-[13px] font-semibold text-primary-foreground rounded-xl h-[42px] px-7 flex items-center gap-2 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(355 71% 36%) 100%)", boxShadow: "0 4px 16px hsl(var(--primary) / 0.2)" }}
            data-cursor="cta"
          >
            <span className="relative z-10">Book a Repair</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-foreground/50 w-10 h-10 flex items-center justify-center" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex flex-col overflow-y-auto"
            style={{ backgroundColor: "hsl(var(--background))" }}
          >
            <div className="flex flex-col items-center justify-center flex-1 pt-20 pb-40 px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="w-full text-center"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  {item.children ? (
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="font-display text-[36px] font-extralight text-foreground/50 hover:text-foreground transition-colors py-2 flex items-center gap-2 mx-auto"
                    >
                      {item.label}
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="font-display text-[36px] font-extralight text-foreground/50 hover:text-foreground transition-colors py-2 block"
                    >
                      {item.label}
                    </Link>
                  )}
                  <AnimatePresence>
                    {item.children && mobileExpanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 flex flex-col gap-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="font-body text-[15px] text-foreground/25 hover:text-foreground/50 transition-colors py-1.5"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Mobile bottom CTAs */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 pb-10" style={{ background: "linear-gradient(180deg, transparent 0%, hsl(var(--background)) 30%)" }}>
              <Link
                to="/book"
                className="font-body text-[15px] font-semibold text-primary-foreground rounded-xl h-[56px] flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(355 71% 36%) 100%)" }}
              >
                Book a Repair
              </Link>
              <a
                href="tel:+441234567890"
                className="font-body text-[14px] text-foreground/30 border border-foreground/[0.06] rounded-xl h-[52px] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
