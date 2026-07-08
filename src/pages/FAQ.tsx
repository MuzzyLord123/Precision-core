import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const faqCategories = [
  {
    category: "General",
    questions: [
      { q: "Where are you located?", a: "We're based in Guilden Sutton, Chester, CH3. Walk-ins are always welcome during opening hours — no appointment necessary." },
      { q: "What are your opening hours?", a: "Monday to Friday: 9:00am – 6:00pm. Saturday: 10:00am – 4:00pm. Sunday: Closed. Bank holidays may vary — check our social media for updates." },
      { q: "Do I need to book an appointment?", a: "No — walk-ins are always welcome. However, booking online guarantees your time slot and helps us prepare the right parts in advance." },
      { q: "How do I get a quote for my repair?", a: "You can check prices instantly on our pricing page, use the price check widget on our homepage, or contact us for a custom quote. All diagnosis is free." },
      { q: "Do you offer a collection/delivery service?", a: "Currently, we operate from our Guilden Sutton workshop only. Drop-off and collection in person." },
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, Apple Pay, Google Pay, contactless, and cash." },
    ]
  },
  {
    category: "Repairs",
    questions: [
      { q: "How long do repairs usually take?", a: "Most repairs are completed same day — many within 30-60 minutes. Complex repairs like water damage recovery or MacBook keyboard replacements may take 2-4 hours. We'll always give you an accurate timeframe before starting." },
      { q: "Do you use genuine parts?", a: "Yes. We use genuine manufacturer parts wherever available, and premium-grade certified alternatives where they offer equivalent quality. We never use cheap, uncertified components." },
      { q: "What if you can't fix my device?", a: "No fix, no fee. If we can't repair your device, you pay nothing. We also never charge for the initial diagnosis." },
      { q: "Will I lose my data during the repair?", a: "For most repairs (screen, battery, port, camera), your data is completely safe. For repairs involving storage or software, we'll discuss backup options with you beforehand." },
      { q: "Can you repair devices that other shops have attempted?", a: "Yes, we regularly receive devices that have been unsuccessfully repaired elsewhere. We'll assess the current state and provide an honest evaluation of what's possible." },
      { q: "Do you repair older devices?", a: "Yes, we repair most devices regardless of age. Parts availability may vary for very old models, but we'll always let you know upfront." },
    ]
  },
  {
    category: "Warranty & Returns",
    questions: [
      { q: "What does the 12-month warranty cover?", a: "Our warranty covers the specific parts replaced and the labour performed during your repair. If the replacement part fails within 12 months under normal use, we'll repair or replace it free of charge." },
      { q: "What isn't covered by the warranty?", a: "The warranty doesn't cover new physical damage (drops, impacts, liquid exposure), software issues unrelated to the repair, or modifications made by other parties after our repair." },
      { q: "How do I make a warranty claim?", a: "Simply bring the device back to our workshop with your repair reference number. We'll assess the issue and, if it's covered, repair it at no cost. No lengthy forms or phone trees." },
      { q: "Can I get a refund if I'm not happy?", a: "We stand behind our work. If you're not satisfied with the quality of a repair, bring it back and we'll make it right. If we can't resolve the issue, we'll discuss a fair refund." },
    ]
  },
  {
    category: "Pricing & Payment",
    questions: [
      { q: "Are your prices fixed?", a: "The prices on our website are accurate for standard repairs. In rare cases of severe or unusual damage, the price may be higher — but we'll always confirm the exact cost with you before starting any work." },
      { q: "Do you charge for diagnosis?", a: "Never. Diagnosis is always free. We'll inspect your device, tell you exactly what's wrong, confirm the price, and only proceed with your approval." },
      { q: "Are there any hidden fees?", a: "Absolutely not. The price we quote includes parts and labour. No call-out fees, no admin charges, no surprises." },
      { q: "Do you require a deposit for bookings?", a: "An optional £10 booking deposit secures your time slot. This is deducted from the final repair cost. Walk-ins require no deposit." },
    ]
  },
  {
    category: "Devices",
    questions: [
      { q: "What devices do you repair?", a: "We repair iPhones, Samsung phones, iPads, MacBooks, Windows laptops, iMacs, Apple Watches, AirPods, and gaming consoles (PlayStation, Xbox, Nintendo Switch, Steam Deck)." },
      { q: "Do you repair tablets other than iPads?", a: "We focus primarily on iPads, but can assess other tablets on a case-by-case basis. Contact us with your device details." },
      { q: "Can you repair my gaming console?", a: "Yes — we handle PlayStation 4/5, Xbox Series X/S, Nintendo Switch, and Steam Deck repairs including HDMI ports, disc drives, overheating, and controller drift." },
      { q: "Do you unlock phones?", a: "We can help with software-related access issues and factory resets. We cannot bypass activation locks or perform carrier unlocking — these must be done through your carrier or the device manufacturer." },
    ]
  },
];

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="w-10 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(204,41,54,0.8)" }}>Help Centre</span>
            </motion.div>
            <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] lg:text-[100px] leading-[0.9] text-steel mb-6 tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: customEase }}>
              Frequently asked<br />questions.
            </motion.h1>
            <motion.p className="font-body font-light text-[18px] max-w-[500px]" style={{ color: "rgba(240,239,244,0.45)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Everything you need to know about our repair services, pricing, warranty, and more.
            </motion.p>
          </div>
        </section>

        {faqCategories.map((cat, catIndex) => (
          <SectionReveal key={cat.category} className={`py-16 md:py-24 relative ${catIndex % 2 === 0 ? '' : 'grain'}`} style={catIndex % 2 !== 0 ? { backgroundColor: "#080809" } : undefined}>
            {catIndex % 2 === 0 && <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />}
            <div className="container mx-auto px-6 relative z-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-signal-red" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">{cat.category}</span>
              </div>
              <div className="space-y-3">
                {cat.questions.map((f, i) => {
                  const key = `${cat.category}-${i}`;
                  const isLight = catIndex % 2 === 0;
                  return (
                    <div key={key} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`, background: openFaq === key ? (isLight ? "#FFFFFF" : "rgba(255,255,255,0.04)") : (isLight ? "#FFFFFF" : "rgba(255,255,255,0.02)") }}>
                      <button onClick={() => setOpenFaq(openFaq === key ? null : key)} className="w-full text-left px-6 py-5 flex justify-between items-center gap-4">
                        <span className={`font-body text-[15px] font-medium ${isLight ? "text-[#080809]" : "text-steel/70"}`}>{f.q}</span>
                        <ChevronDown className={`w-4 h-4 text-signal-red/50 flex-shrink-0 transition-transform duration-300 ${openFaq === key ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === key && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: customEase }}>
                            <div className="px-6 pb-5">
                              <p className={`font-body text-[14px] font-light leading-[1.7] ${isLight ? "text-[#6B6B78]" : "text-steel/40"}`}>{f.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        ))}

        {/* CTA */}
        <section className="py-24 md:py-36 grain vignette relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-4 tracking-[-0.02em]">Still have questions?</h2>
            <p className="font-body font-light text-[16px] text-steel/40 mb-10 max-w-md mx-auto">We're here to help. Get in touch and we'll respond within 1 hour during business hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="group relative overflow-hidden bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center" style={{ boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }} data-cursor="cta">
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link to="/book" className="border border-steel/10 text-steel/50 font-body text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center hover:border-steel/20 hover:text-steel/70 transition-all">Book a Repair</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export default FAQ;
