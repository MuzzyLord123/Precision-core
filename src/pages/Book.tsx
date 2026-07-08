import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Tablet, Laptop, Monitor, Watch, Wrench, Headphones, Gamepad2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const devices = [
  { id: "iphone", label: "iPhone", Icon: Smartphone },
  { id: "samsung", label: "Samsung", Icon: Smartphone },
  { id: "ipad", label: "iPad", Icon: Tablet },
  { id: "macbook", label: "MacBook", Icon: Laptop },
  { id: "laptop", label: "Laptop", Icon: Monitor },
  { id: "other", label: "Other", Icon: Wrench },
];

const models: Record<string, string[]> = {
  iphone: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23", "Galaxy A54", "Galaxy A34"],
  ipad: ["iPad Pro 12.9\"", "iPad Pro 11\"", "iPad Air", "iPad Mini", "iPad 10th Gen"],
  macbook: ["MacBook Pro 16\"", "MacBook Pro 14\"", "MacBook Air 15\"", "MacBook Air 13\""],
  laptop: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "Microsoft Surface", "Other"],
  other: ["Apple Watch", "AirPods", "Gaming Console", "iMac", "Other"],
};

const repairs = [
  { id: "screen", label: "Screen Replacement", price: "£79", icon: Smartphone },
  { id: "battery", label: "Battery Replacement", price: "£49", icon: Smartphone },
  { id: "port", label: "Charging Port", price: "£45", icon: Smartphone },
  { id: "camera", label: "Camera Repair", price: "£69", icon: Smartphone },
  { id: "water", label: "Water Damage", price: "£59", icon: Smartphone },
  { id: "data", label: "Data Recovery", price: "£59", icon: Smartphone },
  { id: "keyboard", label: "Keyboard/Trackpad", price: "£69", icon: Smartphone },
  { id: "software", label: "Software & Diagnostics", price: "£29", icon: Smartphone },
  { id: "restoration", label: "Full Restoration", price: "£99", icon: Smartphone },
];

const totalSteps = 6;

const Book = () => {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState("");
  const [model, setModel] = useState("");
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isWalkIn, setIsWalkIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [source, setSource] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const canNext = () => {
    if (step === 1) return !!device;
    if (step === 2) return !!model;
    if (step === 3) return selectedRepairs.length > 0;
    if (step === 4) return isWalkIn || (!!date && !!timeSlot);
    if (step === 5) return !!name && !!email && !!phone && gdpr;
    return true;
  };

  const toggleRepair = (id: string) => {
    setSelectedRepairs(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const inputClass = "w-full rounded-xl px-4 py-4 font-body text-[14px] transition-all outline-none border focus:border-signal-red focus:ring-2 focus:ring-signal-red/10 bg-graphite-control border-steel/[0.06] text-steel placeholder:text-steel/20";
  const refNum = `MBM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  if (confirmed) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen flex items-center justify-center grain circuit-bg relative" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(204,41,54,0.04) 0%, transparent 50%)" }} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: customEase }} className="text-center px-6 max-w-lg relative z-10">
            <motion.div
              className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(204,41,54,0.15) 0%, rgba(204,41,54,0.05) 100%)", border: "1px solid rgba(204,41,54,0.2)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="text-signal-red text-[28px]">✓</span>
            </motion.div>
            <h2 className="font-display font-extralight text-[36px] text-steel mb-2">Repair booked.</h2>
            <p className="font-mono text-[22px] text-signal-red mb-6">{refNum}</p>
            <p className="font-body text-[16px] text-steel/40 mb-2">
              {isWalkIn ? "Walk-in — come by any time during opening hours." : `See you on ${date} (${timeSlot}).`}
            </p>
            <p className="font-body text-[13px] text-steel/20 mb-12">What to bring: your device, passcode (optional), any relevant accessories.</p>
            <Link to="/" className="border border-steel/10 text-steel/40 font-body text-[14px] rounded-xl h-[48px] px-8 inline-flex items-center hover:border-steel/20 transition-all">Return Home</Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen grain relative" style={{ backgroundColor: "#080809" }}>
        <div className="absolute inset-0 circuit-bg opacity-30" />
        <div className="container mx-auto px-6 pt-28 pb-20 md:pt-36 relative z-10">
          {/* Progress */}
          <div className="max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-between mb-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-500 ${i + 1 <= step ? "bg-signal-red text-steel" : "text-steel/20"}`} style={i + 1 > step ? { backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" } : {}}>
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className="flex-1 h-[1px] mx-2" style={{ backgroundColor: i + 1 < step ? "#CC2936" : "rgba(255,255,255,0.06)" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: customEase }}>
                  <h2 className="font-display font-extralight text-[32px] md:text-[48px] text-steel mb-10 tracking-[-0.02em]">What device needs repairing?</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {devices.map(d => {
                      const Icon = d.Icon;
                      return (
                        <button key={d.id} onClick={() => { setDevice(d.id); setModel(""); }} className={`group rounded-2xl p-7 text-center transition-all duration-300 border relative overflow-hidden ${device === d.id ? "border-signal-red" : "border-steel/[0.06] hover:border-steel/[0.1]"}`} style={device === d.id ? { background: "linear-gradient(135deg, rgba(204,41,54,0.12) 0%, rgba(204,41,54,0.04) 100%)" } : { background: "rgba(255,255,255,0.02)" }}>
                          <Icon className={`w-7 h-7 mx-auto mb-3 ${device === d.id ? "text-signal-red" : "text-steel/30"}`} strokeWidth={1.5} />
                          <span className={`font-body text-[14px] ${device === d.id ? "text-steel" : "text-steel/50"}`}>{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: customEase }}>
                  <h2 className="font-display font-extralight text-[32px] md:text-[48px] text-steel mb-10 tracking-[-0.02em]">Which model is it?</h2>
                  <div className="space-y-2">
                    {(models[device] || []).map(m => (
                      <button key={m} onClick={() => setModel(m)} className={`w-full text-left rounded-xl px-5 py-4 transition-all duration-200 border flex items-center justify-between ${model === m ? "border-signal-red" : "border-steel/[0.06] hover:border-steel/[0.1]"}`} style={model === m ? { background: "linear-gradient(135deg, rgba(204,41,54,0.1) 0%, rgba(204,41,54,0.03) 100%)" } : { background: "rgba(255,255,255,0.02)" }}>
                        <span className={`font-body text-[14px] ${model === m ? "text-steel" : "text-steel/50"}`}>{m}</span>
                        <ChevronRight className={`w-4 h-4 ${model === m ? "text-signal-red" : "text-steel/15"}`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: customEase }}>
                  <h2 className="font-display font-extralight text-[32px] md:text-[48px] text-steel mb-2 tracking-[-0.02em]">What needs fixing?</h2>
                  <p className="font-body text-[14px] text-steel/30 mb-10">Select all that apply.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {repairs.map(r => (
                      <button key={r.id} onClick={() => toggleRepair(r.id)} className={`rounded-xl p-5 text-left transition-all duration-300 border flex justify-between items-center ${selectedRepairs.includes(r.id) ? "border-signal-red" : "border-steel/[0.06] hover:border-steel/[0.1]"}`} style={selectedRepairs.includes(r.id) ? { background: "linear-gradient(135deg, rgba(204,41,54,0.1) 0%, rgba(204,41,54,0.03) 100%)" } : { background: "rgba(255,255,255,0.02)" }}>
                        <span className={`font-body text-[14px] ${selectedRepairs.includes(r.id) ? "text-steel" : "text-steel/50"}`}>{r.label}</span>
                        <span className="font-mono text-[12px] text-signal-red">from {r.price}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: customEase }}>
                  <h2 className="font-display font-extralight text-[32px] md:text-[48px] text-steel mb-10 tracking-[-0.02em]">When would you like to come in?</h2>
                  <label className="flex items-center gap-3 mb-8 cursor-pointer">
                    <div onClick={() => setIsWalkIn(!isWalkIn)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isWalkIn ? "bg-signal-red" : "bg-steel/8"}`}>
                      <div className={`w-5 h-5 rounded-full absolute top-0.5 transition-all duration-300 ${isWalkIn ? "left-6 bg-steel" : "left-0.5 bg-steel/30"}`} />
                    </div>
                    <span className="font-body text-[14px] text-steel/60">I'll just walk in</span>
                  </label>
                  {!isWalkIn && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
                      <div className="grid grid-cols-3 gap-3">
                        {[{ id: "morning", label: "Morning", time: "9–12" }, { id: "afternoon", label: "Afternoon", time: "12–4" }, { id: "evening", label: "Evening", time: "4–6" }].map(t => (
                          <button key={t.id} onClick={() => setTimeSlot(t.id)} className={`rounded-xl p-5 text-center transition-all duration-300 border ${timeSlot === t.id ? "border-signal-red" : "border-steel/[0.06]"}`} style={timeSlot === t.id ? { background: "linear-gradient(135deg, rgba(204,41,54,0.1) 0%, rgba(204,41,54,0.03) 100%)" } : { background: "rgba(255,255,255,0.02)" }}>
                            <span className={`font-body text-[14px] block ${timeSlot === t.id ? "text-steel" : "text-steel/50"}`}>{t.label}</span>
                            <span className="font-mono text-[10px] text-steel/20 mt-1 block">{t.time}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: customEase }}>
                  <h2 className="font-display font-extralight text-[32px] md:text-[48px] text-steel mb-10 tracking-[-0.02em]">Your details.</h2>
                  <div className="space-y-4">
                    <input required placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
                    <input required type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                    <input required placeholder="Phone Number *" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
                    <textarea placeholder="Any extra info about the issue?" rows={3} value={extraInfo} onChange={e => setExtraInfo(e.target.value)} className={`${inputClass} resize-none`} />
                    <input placeholder="How did you hear about us?" value={source} onChange={e => setSource(e.target.value)} className={inputClass} />
                    <label className="flex items-start gap-3 cursor-pointer mt-4">
                      <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} className="mt-1 accent-signal-red" />
                      <span className="font-body text-[12px] text-steel/25 leading-relaxed">I consent to MobiMedic storing my details for the purpose of this repair enquiry. We never share your data. *</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div key="s6" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: customEase }}>
                  <h2 className="font-display font-extralight text-[32px] md:text-[48px] text-steel mb-10 tracking-[-0.02em]">Review & confirm.</h2>
                  <div className="rounded-[20px] p-7 md:p-9 space-y-5" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Row label="Device" value={`${devices.find(d => d.id === device)?.label} — ${model}`} />
                    <Row label="Repairs" value={selectedRepairs.map(id => repairs.find(r => r.id === id)?.label).join(", ")} />
                    <Row label="When" value={isWalkIn ? "Walk-in" : `${date} (${timeSlot})`} />
                    <Row label="Name" value={name} />
                    <Row label="Email" value={email} />
                    <Row label="Phone" value={phone} />
                    {extraInfo && <Row label="Notes" value={extraInfo} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav */}
            <div className="flex justify-between mt-12">
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} className="font-body text-[14px] text-steel/25 hover:text-steel/50 transition-colors">← Back</button>
              ) : <div />}
              {step < totalSteps ? (
                <button
                  disabled={!canNext()}
                  onClick={() => setStep(s => s + 1)}
                  className="group relative overflow-hidden font-body font-semibold text-[14px] rounded-xl h-[52px] px-8 text-steel transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #CC2936 0%, #a82230 100%)" }}
                  data-cursor="cta"
                >
                  <span className="relative z-10">Continue →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </button>
              ) : (
                <button
                  onClick={() => setConfirmed(true)}
                  className="group relative overflow-hidden font-body font-semibold text-[14px] rounded-xl h-[52px] px-10 text-steel transition-all"
                  style={{ background: "linear-gradient(135deg, #CC2936 0%, #a82230 100%)", boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }}
                  data-cursor="cta"
                >
                  <span className="relative z-10">Confirm Booking</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-6 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
    <span className="font-mono text-[10px] text-steel/20 uppercase tracking-[0.12em] flex-shrink-0 pt-0.5">{label}</span>
    <span className="font-body text-[14px] text-steel/60 text-right">{value}</span>
  </div>
);

export default Book;
