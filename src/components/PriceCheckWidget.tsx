import { motion } from "framer-motion";
import { Smartphone, Tablet, Laptop, Monitor, Watch, Wrench } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const devices = [
  { id: "iphone", label: "iPhone", Icon: Smartphone },
  { id: "samsung", label: "Samsung", Icon: Smartphone },
  { id: "ipad", label: "iPad", Icon: Tablet },
  { id: "macbook", label: "MacBook", Icon: Laptop },
  { id: "laptop", label: "Laptop", Icon: Monitor },
  { id: "other", label: "Other", Icon: Wrench },
];

const models: Record<string, string[]> = {
  iphone: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13", "iPhone 12", "iPhone 11"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23", "Galaxy A54", "Galaxy A34"],
  ipad: ["iPad Pro 12.9\"", "iPad Pro 11\"", "iPad Air", "iPad Mini", "iPad 10th Gen"],
  macbook: ["MacBook Pro 16\"", "MacBook Pro 14\"", "MacBook Air 15\"", "MacBook Air 13\""],
  laptop: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "Other"],
  other: ["Apple Watch", "AirPods", "Gaming Console", "iMac"],
};

const repairs = [
  { id: "screen", label: "Screen", price: 79, icon: "◻" },
  { id: "battery", label: "Battery", price: 49, icon: "⊕" },
  { id: "port", label: "Port", price: 45, icon: "⏚" },
  { id: "camera", label: "Camera", price: 69, icon: "◎" },
  { id: "water", label: "Water", price: 59, icon: "◈" },
  { id: "other", label: "Other", price: 39, icon: "✧" },
];

const PriceCheckWidget = () => {
  const [device, setDevice] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [repair, setRepair] = useState<string | null>(null);

  const selectedRepair = repairs.find(r => r.id === repair);

  return (
    <motion.div
      className="rounded-[24px] p-7 md:p-9 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(40px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Corner glow */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(204,41,54,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(204,41,54,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-signal-red animate-pulse" />
          <span className="font-mono text-[10px] text-signal-red tracking-[0.2em] uppercase">Instant Price Check</span>
        </div>

        {/* Step 1: Device */}
        <div className="grid grid-cols-3 gap-2.5">
          {devices.map((d) => {
            const Icon = d.Icon;
            return (
              <button
                key={d.id}
                onClick={() => { setDevice(d.id); setModel(null); setRepair(null); }}
                className={`group rounded-2xl p-3.5 text-center transition-all duration-300 border relative overflow-hidden ${
                  device === d.id
                    ? "border-signal-red text-steel"
                    : "border-steel/[0.06] text-steel/40 hover:border-steel/[0.12] hover:text-steel/60"
                }`}
                style={device === d.id ? { background: "linear-gradient(135deg, rgba(204,41,54,0.15) 0%, rgba(204,41,54,0.05) 100%)" } : { background: "rgba(255,255,255,0.02)" }}
              >
                {device === d.id && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ boxShadow: "inset 0 0 20px rgba(204,41,54,0.1)" }}
                    layoutId="device-selection"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon className="w-5 h-5 mx-auto mb-1.5 relative z-10" />
                <span className="font-body text-[11px] font-medium relative z-10">{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Step 2: Model */}
        <AnimatePresence>
          {device && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <select
                value={model || ""}
                onChange={(e) => { setModel(e.target.value); setRepair(null); }}
                className="w-full rounded-xl px-4 py-3.5 font-body text-[14px] text-steel border outline-none transition-all bg-graphite-control border-steel/[0.06] focus:border-signal-red focus:ring-2 focus:ring-signal-red/10"
                style={{ appearance: "none" }}
              >
                <option value="" className="bg-graphite-control">Select model...</option>
                {(models[device] || []).map((m) => (
                  <option key={m} value={m} className="bg-graphite-control">{m}</option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Repair */}
        <AnimatePresence>
          {model && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="grid grid-cols-3 gap-2.5"
            >
              {repairs.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRepair(r.id)}
                  className={`rounded-xl p-3 text-center transition-all duration-300 border ${
                    repair === r.id
                      ? "border-signal-red text-steel"
                      : "border-steel/[0.06] text-steel/40 hover:border-steel/[0.12]"
                  }`}
                  style={repair === r.id ? { background: "linear-gradient(135deg, rgba(204,41,54,0.15) 0%, rgba(204,41,54,0.05) 100%)" } : { background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="text-[16px] block mb-1">{r.icon}</span>
                  <span className="font-body text-[10px] font-medium">{r.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {selectedRepair && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-6 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-end gap-2 mb-1">
                <span className="font-mono text-[42px] text-signal-red font-medium leading-none">
                  £{selectedRepair.price}
                </span>
                <span className="font-mono text-[14px] text-steel/30 pb-1">from</span>
              </div>
              <div className="flex gap-4 mt-3">
                <span className="font-mono text-[12px] text-steel/40">⏱ 30–60 mins</span>
                <span className="font-mono text-[12px] text-steel/20">✓ 12-month warranty</span>
              </div>
              <button
                className="mt-5 w-full relative overflow-hidden group rounded-xl h-[48px] font-body font-semibold text-[14px] text-steel transition-all"
                style={{ background: "linear-gradient(135deg, #CC2936 0%, #a82230 100%)" }}
                data-cursor="cta"
              >
                <span className="relative z-10">Book This Repair →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PriceCheckWidget;
