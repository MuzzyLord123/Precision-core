import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MobileCTA from "@/components/MobileCTA";
import { supabase } from "@/integrations/supabase/client";

const customEase = [0.22, 1, 0.36, 1] as const;

const deviceOptions = ["iPhone", "Samsung", "iPad", "MacBook", "Laptop", "iMac", "Apple Watch", "AirPods", "Gaming Console", "Other"];
const repairOptions = ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Camera Repair", "Water Damage Recovery", "Data Recovery", "Software & Diagnostics", "Keyboard Repair", "Full Restoration", "Other"];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", device: "", repair: "", model: "", description: "", urgency: "this-week", source: "" });
  const [refNum] = useState(() => `MBM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");
    const { error } = await supabase.from("enquiries").insert({
      guest_name: form.name,
      guest_email: form.email,
      guest_phone: form.phone || null,
      device_type: form.device,
      device_model: form.model || null,
      issue_description: `${form.description}\n\nRepair needed: ${form.repair}\nUrgency: ${form.urgency}`,
      how_found_us: form.source || null,
      ref: refNum,
      source: "contact_form",
    });
    setSubmitting(false);
    if (error) {
      setSubmitError("Something went wrong sending your enquiry. Please try again.");
      return;
    }
    setSubmitted(true);
  };
  const inputClass = "w-full rounded-xl px-4 py-4 font-body text-[14px] transition-all outline-none border focus:border-signal-red focus:ring-2 focus:ring-signal-red/10 bg-graphite-control border-steel/[0.06] text-steel placeholder:text-steel/20";

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Get In Touch</span>
            </motion.div>
            <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] leading-[0.92] text-steel tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: customEase }}>
              Contact us.
            </motion.h1>
          </div>
        </section>

        <section className="py-12 md:py-20 grain relative" style={{ backgroundColor: "#0A0A0D" }}>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
              <div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input required placeholder="Your Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                      <input required type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
                    </div>
                    <input placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <select required value={form.device} onChange={e => setForm(f => ({ ...f, device: e.target.value }))} className={inputClass} style={{ appearance: "none" }}>
                        <option value="" className="bg-graphite-control">Device Type *</option>
                        {deviceOptions.map(d => <option key={d} value={d} className="bg-graphite-control">{d}</option>)}
                      </select>
                      <select required value={form.repair} onChange={e => setForm(f => ({ ...f, repair: e.target.value }))} className={inputClass} style={{ appearance: "none" }}>
                        <option value="" className="bg-graphite-control">Repair Needed *</option>
                        {repairOptions.map(r => <option key={r} value={r} className="bg-graphite-control">{r}</option>)}
                      </select>
                    </div>
                    <input placeholder="Device Model (e.g. iPhone 15 Pro)" value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} className={inputClass} />
                    <textarea required placeholder="Brief description of the issue *" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inputClass} resize-none`} />
                    <div>
                      <span className="font-mono text-[9px] text-steel/20 tracking-[0.16em] uppercase block mb-3">How urgent?</span>
                      <div className="flex gap-2">
                        {[{ id: "today", label: "Today" }, { id: "this-week", label: "This Week" }, { id: "no-rush", label: "No Rush" }].map(u => (
                          <button key={u.id} type="button" onClick={() => setForm(f => ({ ...f, urgency: u.id }))} className={`font-body text-[13px] px-5 py-2.5 rounded-xl border transition-all duration-300 ${form.urgency === u.id ? "border-signal-red text-steel" : "border-steel/[0.06] text-steel/30 hover:border-steel/10"}`} style={form.urgency === u.id ? { background: "linear-gradient(135deg, rgba(204,41,54,0.1) 0%, rgba(204,41,54,0.03) 100%)" } : {}}>
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input placeholder="How did you hear about us?" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} className={inputClass} />
                    <button type="submit" disabled={submitting} className="group w-full relative overflow-hidden font-body font-semibold text-[15px] rounded-[14px] h-[56px] text-steel mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: "linear-gradient(135deg, #CC2936 0%, #a82230 100%)", boxShadow: "0 8px 32px rgba(204,41,54,0.2)" }} data-cursor="cta">
                      <span className="relative z-10">{submitting ? "Sending…" : "Send Enquiry"}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    </button>
                    {submitError && (
                      <p className="font-body text-[13px] text-signal-red mt-3 text-center">{submitError}</p>
                    )}
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                    <motion.div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(204,41,54,0.15) 0%, rgba(204,41,54,0.05) 100%)", border: "1px solid rgba(204,41,54,0.2)" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                      <span className="text-signal-red text-[24px]">✓</span>
                    </motion.div>
                    <h3 className="font-display font-extralight text-[28px] text-steel mb-2">Enquiry received.</h3>
                    <p className="font-mono text-[18px] text-signal-red mb-4">{refNum}</p>
                    <p className="font-body text-[14px] text-steel/35">We'll reply within 1 hour during business hours.</p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                {[
                  { label: "Visit Us", content: <p className="font-body text-[14px] text-steel/50 leading-relaxed">MobiMedic<br />Guilden Sutton<br />Chester, CH3</p> },
                  { label: "Opening Hours", content: (
                    <div className="space-y-2">
                      {[["Mon–Fri", "9:00am – 6:00pm"], ["Saturday", "10:00am – 4:00pm"], ["Sunday", "Closed"]].map(([d, t]) => (
                        <div key={d} className="flex justify-between"><span className="font-mono text-[11px] text-steel/30">{d}</span><span className="font-mono text-[11px] text-steel/50">{t}</span></div>
                      ))}
                    </div>
                  )},
                  { label: "Contact", content: (
                    <div className="space-y-3">
                      <a href="tel:+441234567890" className="block font-mono text-[20px] text-signal-red hover:text-signal-red/80 transition-colors">01234 567 890</a>
                      <a href="mailto:hello@mobimedic.co.uk" className="block font-body text-[13px] text-steel/35 hover:text-steel/60 transition-colors">hello@mobimedic.co.uk</a>
                      <a href="https://wa.me/441234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-[12px] text-steel/50 px-4 py-2.5 rounded-xl border border-steel/[0.06] hover:border-green-500/20 hover:text-green-400 transition-all">💬 WhatsApp</a>
                    </div>
                  )}
                ].map(({ label, content }) => (
                  <div key={label} className="rounded-[20px] p-6" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="font-mono text-[9px] text-steel/20 tracking-[0.16em] uppercase block mb-4">{label}</span>
                    {content}
                  </div>
                ))}
                <div className="font-mono text-[10px] text-signal-red/70 px-4 py-3 rounded-full text-center tracking-wide" style={{ backgroundColor: "rgba(204,41,54,0.06)", border: "1px solid rgba(204,41,54,0.1)" }}>
                  Walk-ins always welcome
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export default Contact;
