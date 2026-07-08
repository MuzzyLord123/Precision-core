import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Clock, CheckCircle2, Award, Heart, Wrench, Users, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const Counter = ({ target, suffix = "", prefix = "", inView }: { target: number; suffix?: string; prefix?: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{prefix}{count.toLocaleString()}{suffix}</>;
};

const values = [
  { icon: Shield, title: "Genuine Parts Only", desc: "We never use cheap aftermarket components. Every part is genuine or premium-grade, sourced directly from trusted suppliers. Your device deserves the same quality it was built with.", color: "#CC2936" },
  { icon: Award, title: "12-Month Warranty", desc: "Every single repair carries a full 12-month parts and labour warranty. If something isn't right, we make it right — no questions, no exceptions.", color: "#CC2936" },
  { icon: CheckCircle2, title: "No Fix, No Fee", desc: "If we can't repair your device, you don't pay a penny. We also never charge for diagnosis — it's always free. You only pay when we deliver results.", color: "#CC2936" },
  { icon: Clock, title: "Same Day Service", desc: "Most repairs are completed the same day, many within the hour. We respect your time and understand how essential your device is to your daily life.", color: "#CC2936" },
  { icon: Users, title: "Expert Technicians", desc: "Our team holds industry certifications across Apple, Samsung, and all major brands. With thousands of repairs completed, your device is in experienced, careful hands.", color: "#CC2936" },
];

const timeline = [
  { year: "2020", title: "Founded in Guilden Sutton", desc: "Started with a simple mission: bring premium, transparent tech repair to the local community." },
  { year: "2021", title: "1,000 Repairs Milestone", desc: "Reached our first thousand repairs. Word-of-mouth became our strongest marketing." },
  { year: "2022", title: "Expanded Services", desc: "Added MacBook, laptop, gaming console, and water damage recovery to our repair catalogue." },
  { year: "2023", title: "Board-Level Micro-Soldering", desc: "Invested in advanced micro-soldering equipment for component-level repairs other shops can't handle." },
  { year: "2024", title: "2,000+ Repairs & Growing", desc: "Surpassed 2,000 devices repaired with a 4.9-star average rating across all review platforms." },
];

const certs = ["Apple Certified Technician", "Samsung Authorised Repair", "CompTIA A+ Certified", "Board-Level Micro-Soldering", "Data Recovery Specialist", "ESD Safe Workspace"];

const About = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: customEase }}>
              <div className="w-10 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(204,41,54,0.8)" }}>About MobiMedic</span>
            </motion.div>
            <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] lg:text-[100px] leading-[0.9] text-steel mb-8 tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: customEase }}>
              Built by technicians.<br />Trusted by thousands.
            </motion.h1>
            <motion.p className="font-body font-light text-[18px] md:text-[20px] max-w-[560px] leading-[1.7]" style={{ color: "rgba(240,239,244,0.45)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              MobiMedic isn't a franchise. It's not a market stall. It's a precision tech surgery, founded in Guilden Sutton by people who care deeply about the devices they repair.
            </motion.p>
          </div>
        </section>

        {/* Brand story */}
        <SectionReveal className="py-24 md:py-36 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-signal-red" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Our Story</span>
              </div>
              <h2 className="font-display font-extralight text-[40px] md:text-[64px] mb-10 leading-[1]" style={{ color: "#080809" }}>Why we exist.</h2>
              <div className="space-y-6 font-body text-[16px] md:text-[17px] font-light leading-[1.8]" style={{ color: "#6B6B78" }}>
                <p>MobiMedic was founded with a simple, stubborn belief: <strong className="font-medium text-[#080809]">tech repair should be transparent, expert-led, and trustworthy</strong>. No hidden fees. No guesswork. No compromise on quality.</p>
                <p>Too many repair shops cut corners — cheap parts sourced from questionable suppliers, vague "from" pricing that balloons on arrival, warranties that don't actually cover anything meaningful. We built MobiMedic to be the precise opposite of all that.</p>
                <p>Every repair we perform uses genuine or premium-grade components sourced from verified suppliers. Every price is published on our website before you walk through the door. Every single job — from a £35 charging port clean to a £499 MacBook screen — carries a full 12-month parts and labour warranty.</p>
                <p>Our technicians are certified professionals with years of hands-on experience across Apple, Samsung, and every major brand. When you hand over your £1,200 iPhone, you're handing it to someone who treats it with the same precision and care as their own.</p>
                <p className="text-[18px] font-display font-light italic" style={{ color: "#080809" }}>"This isn't a market stall. This is precision tech surgery. And we're proud of every device we restore."</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Stats wall */}
        <section className="py-20 md:py-28 grain vignette relative" style={{ backgroundColor: "#080809" }} ref={statsRef}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { value: 2000, suffix: "+", label: "Devices Repaired", sublabel: "and counting" },
                { value: 4.9, suffix: "★", label: "Average Rating", sublabel: "across all platforms", isDecimal: true },
                { value: 98, suffix: "%", label: "Same-Day Completion", sublabel: "most repairs" },
                { value: 12, suffix: "mo", label: "Warranty", sublabel: "on every single repair" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: customEase }}
                  className="text-center p-8 rounded-[20px] relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="font-mono text-[48px] md:text-[56px] text-steel font-medium leading-none mb-3">
                    {s.isDecimal ? (statsInView ? "4.9" : "0.0") : <Counter target={s.value} suffix={s.suffix} inView={statsInView} />}
                    {s.isDecimal && s.suffix}
                  </div>
                  <div className="font-body text-[14px] text-steel/50">{s.label}</div>
                  <div className="font-mono text-[10px] text-steel/20 mt-1">{s.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <SectionReveal className="py-24 md:py-36 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Our Principles</span>
            </div>
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] mb-14 leading-[1]" style={{ color: "#080809" }}>The MobiMedic difference.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: customEase }} className="group rounded-[20px] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.04)" }}>
                    <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-signal-red to-transparent rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(204,41,54,0.06)" }}>
                      <Icon className="w-5 h-5 text-signal-red" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-body text-[17px] font-semibold mb-3" style={{ color: "#080809" }}>{v.title}</h3>
                    <p className="font-body text-[14px] font-light leading-[1.7]" style={{ color: "#6B6B78" }}>{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Timeline */}
        <SectionReveal className="py-24 md:py-36 grain relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Our Journey</span>
            </div>
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-14 leading-[1]">How we got here.</h2>
            <div className="space-y-0">
              {timeline.map((t, i) => (
                <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: customEase }} className="flex gap-6 py-8 relative" style={i < timeline.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}}>
                  <div className="flex-shrink-0 w-16">
                    <span className="font-mono text-[16px] text-signal-red font-medium">{t.year}</span>
                  </div>
                  <div>
                    <h3 className="font-body text-[16px] font-semibold text-steel mb-2">{t.title}</h3>
                    <p className="font-body text-[14px] font-light text-steel/40 leading-[1.7]">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Team & Certs */}
        <SectionReveal className="py-24 md:py-36 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Team */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-signal-red" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Our Team</span>
                </div>
                <h2 className="font-display font-extralight text-[40px] md:text-[56px] mb-10 leading-[1]" style={{ color: "#080809" }}>Meet the technician.</h2>
                <div className="rounded-[20px] p-8 md:p-10 relative overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, rgba(204,41,54,0.12) 0%, rgba(204,41,54,0.04) 100%)", border: "1px solid rgba(204,41,54,0.15)" }}>
                    <span className="font-display text-[28px] font-light text-signal-red">MM</span>
                  </div>
                  <h3 className="font-body text-[20px] font-semibold mb-1" style={{ color: "#080809" }}>Lead Technician</h3>
                  <p className="font-mono text-[12px] text-signal-red mb-5">Founder & Head of Repairs</p>
                  <p className="font-body text-[14px] font-light leading-[1.8] mb-6" style={{ color: "#6B6B78" }}>
                    Certified across Apple, Samsung, and all major brands with over 2,000 successful repairs and counting. Specialises in board-level micro-soldering, water damage recovery, and complex multi-component restorations. Every device that comes through our door is personally inspected.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-signal-red" />
                    <span className="font-mono text-[11px] text-signal-red/70">5+ years professional experience</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-signal-red" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Credentials</span>
                </div>
                <h2 className="font-display font-extralight text-[40px] md:text-[56px] mb-10 leading-[1]" style={{ color: "#080809" }}>Certifications.</h2>
                <div className="space-y-3">
                  {certs.map((c, i) => (
                    <motion.div key={c} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease: customEase }} className="flex items-center gap-4 p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(204,41,54,0.06)" }}>
                        <Award className="w-4 h-4 text-signal-red" strokeWidth={1.5} />
                      </div>
                      <span className="font-body text-[14px] font-medium" style={{ color: "#080809" }}>{c}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* CTA */}
        <section className="py-24 md:py-36 grain vignette relative" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-4 tracking-[-0.02em]">Ready to experience the difference?</h2>
            <p className="font-body font-light text-[16px] text-steel/40 mb-10 max-w-md mx-auto">Join thousands of satisfied customers who trust MobiMedic with their most important devices.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="group relative overflow-hidden bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center" style={{ boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }} data-cursor="cta">
                <span className="relative z-10">Book a Repair</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link to="/contact" className="border border-steel/10 text-steel/50 font-body text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center hover:border-steel/20 hover:text-steel/70 transition-all">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export default About;
