import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const covered = [
  "Failure of replacement parts under normal use",
  "Defects in workmanship or installation",
  "Component malfunction attributable to the repair",
  "Adhesive seal failure related to the repair",
  "Touch screen calibration issues post-repair",
  "Battery capacity dropping below 80% within warranty period",
];

const notCovered = [
  "New physical damage (drops, impacts, crushing)",
  "Liquid damage occurring after the repair",
  "Software issues unrelated to the repair performed",
  "Modifications or repairs performed by third parties",
  "Cosmetic wear and tear (scratches, scuffs)",
  "Damage caused by unauthorised accessories",
];

const Warranty = () => (
  <>
    <CustomCursor />
    <Navbar />
    <main>
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="w-10 h-[1px] bg-signal-red" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(204,41,54,0.8)" }}>Your Protection</span>
          </motion.div>
          <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] lg:text-[100px] leading-[0.9] text-steel mb-6 tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: customEase }}>
            12-month warranty.<br />Every repair.
          </motion.h1>
          <motion.p className="font-body font-light text-[18px] max-w-[560px] leading-[1.7]" style={{ color: "rgba(240,239,244,0.45)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Every repair we perform is backed by a comprehensive 12-month parts and labour warranty. No fine print. No exceptions.
          </motion.p>
        </div>
      </section>

      {/* Overview */}
      <SectionReveal className="py-24 md:py-36 relative">
        <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-signal-red" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Warranty Overview</span>
          </div>
          <h2 className="font-display font-extralight text-[40px] md:text-[64px] mb-10 leading-[1]" style={{ color: "#080809" }}>Our promise to you.</h2>
          <div className="space-y-6 font-body text-[16px] font-light leading-[1.8]" style={{ color: "#6B6B78" }}>
            <p>At MobiMedic, we believe that a repair isn't complete until it's stood the test of time. That's why every single repair — from a simple screen replacement to a complex board-level restoration — carries our full <strong className="font-medium text-[#080809]">12-month parts and labour warranty</strong>.</p>
            <p>This isn't a limited warranty buried in fine print. If the part we replaced or the work we performed fails within 12 months of your repair date under normal use conditions, we will repair or replace it <strong className="font-medium text-[#080809]">completely free of charge</strong>.</p>
            <p>Your repair reference number (MBM-XXXXXX) serves as your warranty proof. Keep it safe — though we also have it on record in our system.</p>
          </div>
        </div>
      </SectionReveal>

      {/* Covered / Not Covered */}
      <SectionReveal className="py-24 md:py-36 grain relative" style={{ backgroundColor: "#080809" }}>
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-signal-red" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">What's Covered</span>
              </div>
              <div className="space-y-3">
                {covered.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease: customEase }} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(48,200,94,0.04)", border: "1px solid rgba(48,200,94,0.1)" }}>
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="font-body text-[14px] font-light text-steel/60">{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px]" style={{ backgroundColor: "rgba(240,239,244,0.15)" }} />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel/30">Not Covered</span>
              </div>
              <div className="space-y-3">
                {notCovered.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease: customEase }} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <XCircle className="w-4 h-4 text-steel/20 flex-shrink-0 mt-0.5" />
                    <span className="font-body text-[14px] font-light text-steel/40">{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* How to claim */}
      <SectionReveal className="py-24 md:py-36 relative">
        <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-signal-red" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Making A Claim</span>
          </div>
          <h2 className="font-display font-extralight text-[40px] md:text-[56px] mb-10 leading-[1]" style={{ color: "#080809" }}>How to claim.</h2>
          <div className="space-y-6">
            {[
              { step: "01", title: "Bring your device back", desc: "Visit our Guilden Sutton workshop with your device and your repair reference number (MBM-XXXXXX). No appointment needed." },
              { step: "02", title: "We'll assess the issue", desc: "Our technician will inspect the device and determine whether the issue is covered by warranty. This assessment is always free." },
              { step: "03", title: "Repair or replace — free", desc: "If the issue is covered, we'll repair or replace the part at no charge. Most warranty repairs are completed the same day." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, ease: customEase }} className="flex gap-6 p-6 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(204,41,54,0.06)" }}>
                    <span className="font-mono text-[12px] text-signal-red font-medium">{s.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-body text-[16px] font-semibold mb-2" style={{ color: "#080809" }}>{s.title}</h3>
                  <p className="font-body text-[14px] font-light leading-[1.7]" style={{ color: "#6B6B78" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* CTA */}
      <section className="py-24 md:py-36 grain vignette relative" style={{ backgroundColor: "#080809" }}>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-4 tracking-[-0.02em]">Need to make a claim?</h2>
          <p className="font-body font-light text-[16px] text-steel/40 mb-10 max-w-md mx-auto">Bring your device and reference number to our workshop. We'll take care of the rest.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="group relative overflow-hidden bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center" style={{ boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }} data-cursor="cta">
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            <Link to="/faq" className="border border-steel/10 text-steel/50 font-body text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center hover:border-steel/20 hover:text-steel/70 transition-all">Read FAQ</Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <MobileCTA />
  </>
);

export default Warranty;
