import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const Terms = () => (
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
            Terms of Service
          </motion.h1>
          <motion.p className="font-mono text-[11px] text-steel/25 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Last updated: March 2025</motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 relative">
        <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <div className="space-y-8">
            {[
              { title: "1. Service Agreement", content: "By booking a repair with MobiMedic or submitting an enquiry through our website, you agree to these terms of service. MobiMedic operates from Guilden Sutton, Chester, and provides device repair services for smartphones, tablets, laptops, and other consumer electronics." },
              { title: "2. Repairs & Diagnosis", content: "All repairs begin with a free diagnosis. We will inspect your device and provide a clear quote before any work begins. No repair work will be carried out without your explicit approval of the quoted price. If we cannot repair your device, no charge is made (No Fix, No Fee guarantee)." },
              { title: "3. Pricing", content: "Prices listed on our website are indicative and apply to standard repairs. In cases of severe, unusual, or additional damage discovered during diagnosis, the quoted price may differ from the listed price. The exact cost will always be confirmed with you before work begins." },
              { title: "4. Warranty", content: "All repairs carry a 12-month parts and labour warranty from the date of repair. The warranty covers failure of replaced parts and workmanship under normal use conditions. It does not cover new physical damage, liquid damage, software issues, or modifications by third parties. Full warranty terms are available on our Warranty Policy page." },
              { title: "5. Device Collection", content: "Once your repair is complete, we will notify you that your device is ready for collection. Devices must be collected within 30 days of notification. MobiMedic accepts no liability for devices not collected within 60 days of repair completion." },
              { title: "6. Data & Privacy", content: "MobiMedic takes no responsibility for data loss during repairs. While most repairs do not affect stored data, we recommend backing up your device before bringing it in. We handle all devices and data with strict confidentiality. See our Privacy Policy for full details." },
              { title: "7. Liability", content: "MobiMedic's liability is limited to the cost of the repair performed. We are not liable for any indirect, consequential, or incidental damages arising from a repair. We carry appropriate business insurance for device repairs." },
              { title: "8. Deposits & Cancellations", content: "Online bookings may require a £10 deposit to secure your time slot. This deposit is deducted from the final repair cost. Cancellations made more than 24 hours before the booking time are eligible for a full deposit refund. No-shows forfeit the deposit." },
              { title: "9. Third-Party Parts", content: "Where genuine manufacturer parts are not available or cost-prohibitive, we may use premium-grade third-party components. These parts meet or exceed OEM specifications and carry the same 12-month warranty as genuine parts." },
              { title: "10. Governing Law", content: "These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales." },
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

export default Terms;
