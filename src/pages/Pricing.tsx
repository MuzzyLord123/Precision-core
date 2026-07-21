import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MobileCTA from "@/components/MobileCTA";
import SectionReveal from "@/components/SectionReveal";
import { pricingData, type DeviceTab } from "@/lib/pricing";

const customEase = [0.22, 1, 0.36, 1] as const;

const tabs: { id: DeviceTab; label: string }[] = [
  { id: "iphone", label: "iPhone" },
  { id: "samsung", label: "Samsung" },
  { id: "ipad", label: "iPad" },
  { id: "macbook", label: "MacBook" },
  { id: "laptop", label: "Laptop" },
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<DeviceTab>("iphone");

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10">
            <motion.span className="font-mono text-[10px] tracking-[0.18em] uppercase block mb-4" style={{ color: "rgba(204,41,54,0.8)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Transparent Pricing</motion.span>
            <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] lg:text-[100px] leading-[0.92] text-steel mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: customEase }}>
              Every price.<br />Right here.
            </motion.h1>
            <motion.p className="font-body font-light text-[18px] text-steel/55 max-w-[480px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              No hidden fees. No surprises. The price you see is the price you pay.
            </motion.p>
          </div>
        </section>

        <SectionReveal className="py-16 md:py-24 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10">
            {/* Tab row */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`font-body text-[14px] font-medium px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 ${activeTab === t.id ? "bg-signal-red text-steel" : "text-light-secondary hover:bg-steel/10"}`}
                  style={activeTab !== t.id ? { backgroundColor: "rgba(0,0,0,0.04)" } : {}}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      {["Model", "Screen", "Battery", "Port", "Camera", "Other", ""].map(h => (
                        <th key={h} className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#6B6B78" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData[activeTab].map((row, i) => (
                      <motion.tr
                        key={row.model}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                        className="hover:bg-signal-red/[0.02] transition-colors"
                      >
                        <td className="px-5 py-4 font-body text-[14px] font-medium" style={{ color: "#080809" }}>{row.model}</td>
                        <td className="px-5 py-4 font-mono text-[14px] text-signal-red">{row.screen}</td>
                        <td className="px-5 py-4 font-mono text-[14px] text-signal-red">{row.battery}</td>
                        <td className="px-5 py-4 font-mono text-[14px] text-signal-red">{row.port}</td>
                        <td className="px-5 py-4 font-mono text-[14px] text-signal-red">{row.camera}</td>
                        <td className="px-5 py-4 font-mono text-[14px] text-signal-red">{row.other}</td>
                        <td className="px-5 py-4">
                          <Link to="/book" className="font-body text-[12px] text-signal-red border border-signal-red/30 rounded-lg px-3 py-1.5 hover:bg-signal-red hover:text-steel transition-all">Book →</Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="font-body font-light text-[13px] mt-6 max-w-2xl" style={{ color: "#6B6B78" }}>
              All prices include parts and labour. 12-month warranty on all repairs. Prices may vary for severe damage — confirmed during free diagnosis.
            </p>

            <div className="mt-12 text-center">
              <p className="font-body text-[16px] mb-4" style={{ color: "#080809" }}>Can't find your model?</p>
              <Link to="/contact" className="inline-flex items-center justify-center bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[52px] px-8 hover:bg-signal-red/90 transition-colors" data-cursor="cta">
                Get a Custom Quote →
              </Link>
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export default Pricing;
