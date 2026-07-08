import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Battery, Zap, Camera, Droplets, HardDrive, Keyboard, Monitor, Sparkles, Clock, Shield, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const repairTypes = [
  {
    slug: "screen-replacement", icon: Smartphone, title: "Screen Replacement",
    desc: "Cracked, shattered, or unresponsive displays restored to factory perfection. We use genuine OLED, LCD, and premium aftermarket panels — never cheap knockoffs.",
    longDesc: "A cracked screen isn't just cosmetic — it compromises touch sensitivity, water resistance, and structural integrity. Our screen replacements restore every aspect of your display: true-to-life colour accuracy, responsive multi-touch, oleophobic coating, and the original brightness range. We calibrate every replacement panel to match factory specifications.",
    devices: ["iPhone", "Samsung", "iPad", "Laptops"],
    price: "£49", turnaround: "30–60 mins",
    signs: ["Cracked, chipped, or shattered glass", "Unresponsive or erratic touch input", "Lines, dead pixels, or discoloration on display", "Ghost touch — screen activating on its own", "Display flickering or going black intermittently", "Visible gap between glass and frame"],
    process: ["Diagnostic assessment of display and digitiser", "Safe removal of damaged display assembly", "Internal inspection for secondary damage", "Installation of genuine/premium replacement panel", "Touch calibration and True Tone restoration", "Brightness, colour, and multi-touch verification", "Oleophobic coating check and full device test"],
    parts: { genuine: "Original manufacturer panels sourced from authorised suppliers. Identical to factory — same colour accuracy, brightness, and touch response.", premium: "High-quality aftermarket panels from certified suppliers. Excellent colour and touch response at a lower price point. Backed by the same 12-month warranty." },
    pricing: [
      { model: "iPhone 15 Pro Max", price: "£229", time: "45 mins" },
      { model: "iPhone 15 Pro", price: "£209", time: "45 mins" },
      { model: "iPhone 15", price: "£179", time: "40 mins" },
      { model: "iPhone 14 Pro Max", price: "£189", time: "40 mins" },
      { model: "iPhone 14", price: "£149", time: "35 mins" },
      { model: "iPhone 13", price: "£129", time: "30 mins" },
      { model: "Samsung S24 Ultra", price: "£259", time: "50 mins" },
      { model: "Samsung S24", price: "£199", time: "45 mins" },
      { model: "iPad Pro 12.9\"", price: "£329", time: "90 mins" },
    ],
    faq: [
      { q: "Will my screen look the same as the original?", a: "Yes. We use panels that match factory colour accuracy, brightness, and resolution. Genuine panels are indistinguishable from the original." },
      { q: "Will I lose True Tone after the repair?", a: "For most iPhones, we can preserve or restore True Tone during the repair process using specialised calibration equipment." },
      { q: "Is the replacement screen waterproof?", a: "We reapply adhesive seals during installation, but the water resistance rating may not match factory spec. We recommend treating the device with care around water." },
      { q: "How long does a screen replacement take?", a: "Most screen replacements are completed within 30–60 minutes depending on the device. Walk-in same-day service is available." },
      { q: "Do you replace just the glass or the full display?", a: "We replace the full display assembly (glass + digitiser + LCD/OLED) to ensure the highest quality and reliability." },
      { q: "What if my phone has other damage too?", a: "We'll identify any additional issues during the free diagnosis and let you know before proceeding. No surprises." },
      { q: "Can I watch the repair?", a: "For precision and security, repairs are carried out in our clean workspace. We keep you updated throughout." },
      { q: "What warranty covers the new screen?", a: "Every screen replacement carries our full 12-month parts and labour warranty." },
    ]
  },
  {
    slug: "battery-replacement", icon: Battery, title: "Battery Replacement",
    desc: "Degraded, swollen, or fast-draining batteries replaced with premium cells. Restore your device to all-day battery life.",
    longDesc: "Lithium-ion batteries degrade over time — it's chemistry, not a fault. After 500+ charge cycles, capacity drops noticeably. Our battery replacements use OEM-equivalent cells that restore your device to its original endurance. We also run a full calibration cycle to ensure accurate battery percentage readings.",
    devices: ["iPhone", "Samsung", "MacBook", "Laptops"],
    price: "£39", turnaround: "20–45 mins",
    signs: ["Battery drains unusually fast", "Device shuts down at 20-30% charge", "Battery health below 80% (iPhone Settings)", "Swollen or bulging battery case", "Device overheating during normal use", "Slow charging despite good cable"],
    process: ["Battery health diagnostic and assessment", "Safe device disassembly", "Careful removal of adhesive-secured battery", "Installation of premium replacement cell", "Battery calibration cycle", "Charge speed and temperature monitoring", "Final health check and performance report"],
    parts: { genuine: "Original manufacturer cells with matching mAh capacity. Identical charge cycles and thermal performance.", premium: "Certified third-party cells meeting or exceeding OEM specs. Same capacity, same safety certifications." },
    pricing: [
      { model: "iPhone 15 Pro Max", price: "£89", time: "25 mins" },
      { model: "iPhone 15 Pro", price: "£85", time: "25 mins" },
      { model: "iPhone 14", price: "£69", time: "20 mins" },
      { model: "iPhone 13", price: "£59", time: "20 mins" },
      { model: "Samsung S24 Ultra", price: "£95", time: "35 mins" },
      { model: "MacBook Pro 16\"", price: "£249", time: "90 mins" },
      { model: "MacBook Air 13\"", price: "£179", time: "60 mins" },
    ],
    faq: [
      { q: "How do I know if my battery needs replacing?", a: "On iPhone, go to Settings → Battery → Battery Health. Below 80% maximum capacity indicates replacement is beneficial. Or if your device dies unexpectedly, drains fast, or feels swollen." },
      { q: "Will I lose my data?", a: "No. Battery replacement doesn't affect your data at all." },
      { q: "How long will the new battery last?", a: "A new battery should provide 2-3 years of healthy use under normal conditions, similar to when the device was new." },
      { q: "Is a swollen battery dangerous?", a: "Yes — a swollen battery can rupture. If you notice swelling, stop using the device and bring it in immediately." },
      { q: "Do you calibrate the new battery?", a: "Yes. We run a full charge-discharge calibration cycle to ensure accurate percentage readings from day one." },
      { q: "What warranty covers the battery?", a: "Full 12-month warranty on all battery replacements." },
    ]
  },
  {
    slug: "charging-port", icon: Zap, title: "Charging Port Repair",
    desc: "Not charging, loose connections, bent pins — we repair Lightning, USB-C, and MagSafe ports to restore reliable power delivery.",
    longDesc: "Charging port issues are among the most common repairs we handle. Pocket lint, bent pins, and worn connectors all prevent reliable charging. We clean, repair, or replace the entire charging assembly depending on the severity — always restoring full fast-charging capability.",
    devices: ["All devices"],
    price: "£35", turnaround: "20–40 mins",
    signs: ["Device won't charge at all", "Loose or wobbly cable connection", "Only charges at certain angles", "Intermittent charging — connects and disconnects", "Slow charging despite new cable", "Visible debris or corrosion in port"],
    process: ["Port inspection under magnification", "Ultrasonic cleaning of port cavity", "Pin straightening or replacement", "Full charging assembly replacement if needed", "Fast-charge verification with multiple cables", "Data transfer test (USB-C devices)"],
    parts: { genuine: "OEM charging assemblies with original flex cables and microphone modules.", premium: "Certified replacement assemblies with equivalent pin quality and durability." },
    pricing: [
      { model: "iPhone 15 Pro Max", price: "£65", time: "30 mins" },
      { model: "iPhone 14", price: "£49", time: "25 mins" },
      { model: "Samsung S24 Ultra", price: "£65", time: "35 mins" },
      { model: "iPad Pro", price: "£79", time: "45 mins" },
      { model: "MacBook Pro", price: "£89", time: "60 mins" },
    ],
    faq: [
      { q: "Could it just be lint in the port?", a: "Often, yes. We clean first before considering replacement — and cleaning is included free with any diagnosis." },
      { q: "Will fast charging still work?", a: "Absolutely. We test and verify fast-charge capability after every repair." },
      { q: "My phone charges but data transfer doesn't work — can you fix that?", a: "Yes. The charging port handles both power and data. We'll repair or replace the assembly to restore full functionality." },
      { q: "How do I prevent port damage?", a: "Avoid forcing cables, keep the port clean, and don't charge in dusty environments. Wireless charging can reduce port wear." },
    ]
  },
  {
    slug: "camera-repair", icon: Camera, title: "Camera Repair",
    desc: "Front or rear camera module replacement. Cracked lenses, autofocus failure, OIS issues, and blurry images — all resolved.",
    longDesc: "Modern smartphone cameras are precision optical instruments. A cracked lens, misaligned module, or failed autofocus motor can ruin every photo. We replace complete camera modules — including lens, sensor, and OIS mechanism — restoring your device to its full photographic capability.",
    devices: ["iPhone", "Samsung", "iPad"],
    price: "£59", turnaround: "30–60 mins",
    signs: ["Cracked or scratched camera lens", "Blurry photos despite clean lens", "Camera app shows black screen", "Autofocus hunting or failing to lock", "OIS stabilisation not working (shaky video)", "Front camera distorted or tinted"],
    process: ["Camera module diagnostic assessment", "Safe removal of damaged module and lens", "Internal lens housing cleaning", "Installation of genuine replacement camera", "Autofocus and OIS calibration", "Photo and video quality verification", "Front and rear camera testing"],
    parts: { genuine: "Original manufacturer camera modules with matched sensor and lens specifications.", premium: "Certified replacement modules meeting OEM optical standards." },
    pricing: [
      { model: "iPhone 15 Pro Max", price: "£149", time: "45 mins" },
      { model: "iPhone 15 Pro", price: "£139", time: "45 mins" },
      { model: "iPhone 14", price: "£99", time: "35 mins" },
      { model: "Samsung S24 Ultra", price: "£159", time: "50 mins" },
      { model: "iPad Pro", price: "£149", time: "60 mins" },
    ],
    faq: [
      { q: "Can you replace just the lens glass without the camera module?", a: "In most cases, we replace the full module to ensure perfect alignment and image quality. Lens-only repairs can compromise performance." },
      { q: "Will ProRes/ProRAW still work after repair?", a: "Yes. Replacing the camera module doesn't affect software features — all camera modes remain fully functional." },
      { q: "My camera has a purple tint — what's wrong?", a: "This usually indicates a cracked infrared filter inside the lens assembly. A module replacement will resolve it completely." },
      { q: "How long does a camera repair take?", a: "Most camera repairs are completed within 30-60 minutes." },
    ]
  },
  {
    slug: "water-damage", icon: Droplets, title: "Water Damage Recovery",
    desc: "Ultrasonic cleaning, board-level micro-soldering, corrosion removal, and component drying. Emergency service available.",
    longDesc: "Water damage requires immediate professional attention. Even 'water-resistant' devices can fail when seals are compromised. Our recovery process combines ultrasonic cleaning, isopropyl flushing, corrosion removal, and board-level component testing. We've recovered devices that other shops said were beyond repair.",
    devices: ["All devices"],
    price: "£49", turnaround: "2–24 hours",
    signs: ["Device dropped in water, tea, coffee, or any liquid", "Liquid detected warning on screen", "Speakers sound muffled or distorted", "Screen shows water marks or discoloration", "Device won't turn on after liquid exposure", "Erratic behaviour — random restarts, ghost touch"],
    process: ["Immediate power-down and disassembly", "Component-level damage assessment", "Ultrasonic bath cleaning (all internals)", "Board-level corrosion removal under microscope", "Isopropyl alcohol flush and decontamination", "Component testing and replacement if needed", "Extended controlled drying cycle", "Full functionality testing and reassembly"],
    parts: { genuine: "Any components damaged beyond cleaning are replaced with OEM-spec parts.", premium: "Board-level micro-soldering for component-level repairs where possible." },
    pricing: [
      { model: "iPhone (any model)", price: "From £49", time: "2–6 hours" },
      { model: "Samsung (any model)", price: "From £49", time: "2–6 hours" },
      { model: "iPad", price: "From £69", time: "4–12 hours" },
      { model: "MacBook", price: "From £99", time: "12–24 hours" },
      { model: "Laptop", price: "From £89", time: "12–24 hours" },
    ],
    faq: [
      { q: "What should I do immediately after water damage?", a: "Turn the device OFF immediately. Do NOT try to charge it. Do NOT put it in rice (this is a myth). Bring it to us as quickly as possible — time is critical." },
      { q: "Does putting my phone in rice work?", a: "No. Rice does not effectively draw moisture from inside a sealed device. It can introduce starch particles into ports. Professional ultrasonic cleaning is the correct solution." },
      { q: "Can you recover data from a water-damaged phone?", a: "In many cases, yes. Even if the device won't turn on, we can often recover data from the storage chip using specialist equipment." },
      { q: "My phone is rated IP68 waterproof — why did it fail?", a: "IP ratings degrade over time as adhesive seals age. Drops, temperature changes, and wear all compromise water resistance. No phone is truly waterproof forever." },
      { q: "What's the success rate for water damage recovery?", a: "We successfully recover approximately 75-80% of water-damaged devices. The key factor is how quickly the device reaches us after exposure." },
    ]
  },
  {
    slug: "data-recovery", icon: HardDrive, title: "Data Recovery",
    desc: "Deleted files, failed drives, damaged devices. Professional-grade recovery from any storage medium, any situation.",
    longDesc: "Losing data can feel devastating — photos, messages, documents, business files. Our data recovery service uses professional tools and techniques to extract data from damaged devices, failed drives, corrupted storage, and even devices that won't turn on. We handle everything from accidental deletion to catastrophic hardware failure.",
    devices: ["iPhone", "Samsung", "Laptops", "MacBook"],
    price: "£59", turnaround: "1–48 hours",
    signs: ["Accidentally deleted important files", "Device won't turn on but data is needed", "Failed hard drive — clicking or not spinning", "Corrupted SSD — device won't boot", "Factory reset performed accidentally", "Broken device with irreplaceable photos"],
    process: ["Initial device and storage assessment", "Create a recovery strategy based on damage type", "Connect to professional recovery workstation", "Extract data using forensic-grade tools", "Verify integrity of all recovered files", "Secure transfer to customer's chosen medium", "Secure erasure of recovery workstation"],
    parts: { genuine: "No parts replaced — this is a service-based repair.", premium: "We can supply external drives or USB media for data transfer if needed." },
    pricing: [
      { model: "iPhone (any)", price: "From £59", time: "2–12 hours" },
      { model: "Samsung (any)", price: "From £59", time: "2–12 hours" },
      { model: "Laptop HDD", price: "From £79", time: "4–24 hours" },
      { model: "Laptop SSD", price: "From £89", time: "4–24 hours" },
      { model: "MacBook", price: "From £99", time: "4–48 hours" },
    ],
    faq: [
      { q: "Can you recover photos from a phone that won't turn on?", a: "In many cases, yes. We can access storage chips directly using specialist equipment, even if the device is non-functional." },
      { q: "Is recovered data confidential?", a: "Absolutely. We handle all data with strict confidentiality. Recovery workstations are securely erased after each job." },
      { q: "Can you recover from a factory reset?", a: "Sometimes. Success depends on the device type and how much new data has been written since the reset. Bring it in as soon as possible." },
      { q: "What media do you return the data on?", a: "We can transfer to your own external drive, a new USB drive (available for purchase), or cloud storage if you prefer." },
    ]
  },
  {
    slug: "keyboard-repair", icon: Keyboard, title: "Keyboard & Trackpad",
    desc: "Key replacement, full keyboard swap, trackpad recalibration, butterfly/scissor mechanism repairs for all MacBook and laptop models.",
    longDesc: "Keyboard issues are one of the most frustrating problems with laptops. Whether it's the notorious butterfly mechanism, stuck scissor keys, or unresponsive trackpads, we have the tools and expertise to restore full typing comfort. We stock keyboards for all major MacBook and laptop models.",
    devices: ["MacBook", "Laptops"],
    price: "£69", turnaround: "1–3 hours",
    signs: ["Keys not responding to presses", "Sticky or stuck keys", "Double-typing or repeating characters", "Trackpad not clicking or responding", "Trackpad cursor jumping erratically", "Backlight not working on keyboard"],
    process: ["Keyboard and trackpad diagnostic", "Identify faulty keys, mechanisms, or flex cables", "Remove keyboard assembly (MacBook: full top-case)", "Install replacement keyboard or individual keys", "Trackpad calibration and force-touch testing", "Backlight verification", "Full typing test across all keys"],
    parts: { genuine: "OEM keyboard assemblies and top-case replacements.", premium: "Certified third-party keyboards with matched key travel and layout." },
    pricing: [
      { model: "MacBook Pro 16\"", price: "£299", time: "3 hours" },
      { model: "MacBook Pro 14\"", price: "£279", time: "2.5 hours" },
      { model: "MacBook Air", price: "£229", time: "2 hours" },
      { model: "HP/Dell/Lenovo", price: "£99–£199", time: "1–2 hours" },
    ],
    faq: [
      { q: "Why are MacBook keyboard repairs more expensive?", a: "Apple integrates the keyboard into the top-case assembly. Replacement often requires the entire top-case, which includes the keyboard, trackpad, battery, and palmrest." },
      { q: "Can you fix individual keys?", a: "On many laptops, yes. Individual key caps and mechanisms can be replaced. On some MacBook models, the full keyboard must be replaced due to Apple's design." },
      { q: "My trackpad clicks but doesn't register — can you fix that?", a: "Yes. This is typically a flex cable or Force Touch sensor issue, both of which we can repair." },
    ]
  },
  {
    slug: "software-diagnostics", icon: Monitor, title: "Software & Diagnostics",
    desc: "iOS/Android system repairs, virus/malware removal, factory reset, OS reinstall, performance optimisation, and full health diagnostics.",
    longDesc: "Not every problem requires a physical repair. Software corruption, malware infections, failed updates, and bloated systems can all make devices feel broken. Our software service diagnoses the root cause and resolves it — whether that's a clean OS reinstall, malware removal, or performance tuning.",
    devices: ["All devices"],
    price: "£29", turnaround: "30–90 mins",
    signs: ["Device running noticeably slower than usual", "Frequent app crashes or system freezes", "Suspicious pop-ups or redirects (malware)", "Unable to update to latest OS version", "Boot loop — device restarts repeatedly", "Storage full despite deleting files"],
    process: ["Full system diagnostic scan", "Identify software issues, conflicts, or malware", "Backup critical data (if accessible)", "Remove malware, adware, and unwanted software", "Repair or clean-install operating system", "Restore data and settings", "Optimise performance and verify stability"],
    parts: { genuine: "Software-only service — no physical parts required.", premium: "Licensed software tools for deep diagnostics and recovery." },
    pricing: [
      { model: "iPhone/iPad", price: "£29", time: "30 mins" },
      { model: "Samsung/Android", price: "£29", time: "30 mins" },
      { model: "MacBook", price: "£49", time: "60 mins" },
      { model: "Windows Laptop", price: "£39", time: "45 mins" },
    ],
    faq: [
      { q: "Will I lose my data?", a: "We always attempt to preserve your data. If a full reinstall is needed, we'll back up your files first and restore them afterwards." },
      { q: "Can you remove viruses from my Mac?", a: "Yes. Despite the myth that Macs don't get viruses, macOS malware exists. We remove it completely and install protection." },
      { q: "My phone is stuck in a boot loop — can you fix it?", a: "Usually, yes. Boot loops are typically caused by corrupted system files or failed updates. We can force-recovery and reinstall the OS." },
    ]
  },
  {
    slug: "full-restoration", icon: Sparkles, title: "Full Device Restoration",
    desc: "Complete professional restoration — battery, screen assessment, port cleaning, internal dusting, thermal paste, and a full health report.",
    longDesc: "Our premium restoration service is for devices that need comprehensive attention. We disassemble, clean, test, and restore every component. New battery, deep-cleaned ports and speakers, fresh thermal paste (laptops), and a detailed health report. Your device will feel factory-new.",
    devices: ["Premium service — all devices"],
    price: "£99", turnaround: "2–4 hours",
    signs: ["Device feeling sluggish overall", "Multiple minor issues accumulating", "Want the device to feel new again", "Preparing device for resale or gifting", "Haven't serviced the device in 3+ years", "Fan noise, overheating, or slow performance"],
    process: ["Complete device disassembly", "Ultrasonic cleaning of all internal components", "Battery health assessment and replacement if needed", "Screen inspection, cleaning, and minor scratch removal", "Port, speaker, and microphone deep cleaning", "Thermal paste replacement (laptops/desktops)", "Full reassembly with new adhesives and seals", "Comprehensive health report with before/after metrics"],
    parts: { genuine: "New battery included. Any additional parts at standard pricing.", premium: "Premium thermal compounds and adhesives used throughout." },
    pricing: [
      { model: "iPhone (any)", price: "From £99", time: "2 hours" },
      { model: "Samsung (any)", price: "From £99", time: "2 hours" },
      { model: "iPad", price: "From £129", time: "3 hours" },
      { model: "MacBook", price: "From £179", time: "4 hours" },
      { model: "Windows Laptop", price: "From £149", time: "3 hours" },
    ],
    faq: [
      { q: "Is this worth it for an older device?", a: "Absolutely. A full restoration can add 2-3 years of comfortable use to a device that might otherwise need replacing. It's significantly cheaper than buying new." },
      { q: "Does this include a new battery?", a: "Yes. A new battery is included as standard in every full restoration." },
      { q: "What's included in the health report?", a: "Battery health metrics, storage health, display condition, port functionality, speaker/mic quality, and any recommendations for future maintenance." },
      { q: "Can I choose which parts to replace?", a: "Absolutely. After diagnosis, we'll present our findings and you choose what to include. No pressure, no upselling." },
    ]
  },
];

const RepairsIndex = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: customEase }}>
              <div className="w-10 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(204,41,54,0.8)" }}>Expert Repair Services</span>
            </motion.div>
            <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] lg:text-[96px] leading-[0.9] text-steel mb-8 tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: customEase }}>
              Every repair type<br className="hidden md:block" />we offer.
            </motion.h1>
            <motion.p className="font-body font-light text-[18px] md:text-[20px] max-w-[600px] leading-[1.7] mb-10" style={{ color: "rgba(240,239,244,0.45)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
              From cracked screens to complete device restorations. Every repair uses genuine parts, every price is transparent, and every job is backed by our 12-month warranty.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              {[
                { icon: Clock, text: "Same day service" },
                { icon: Shield, text: "12-month warranty" },
                { icon: CheckCircle2, text: "No fix, no fee" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 font-mono text-[10px] tracking-wide px-4 py-2 rounded-full" style={{ color: "rgba(240,239,244,0.35)", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  <Icon className="w-3.5 h-3.5 text-signal-red/60" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Repair cards grid */}
        <SectionReveal className="py-24 md:py-36 relative overflow-hidden">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #080809 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="container mx-auto px-6 relative z-10" ref={ref}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairTypes.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.slug} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: customEase, delay: i * 0.06 }}>
                    <Link to={`/repairs/${r.slug}`} className="group block rounded-[20px] p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.04)" }}>
                      <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-signal-red to-transparent rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse, rgba(204,41,54,0.08) 0%, transparent 70%)" }} />
                      
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(204,41,54,0.06)" }}>
                        <Icon className="w-5 h-5 text-signal-red" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-body text-[18px] font-semibold mb-2" style={{ color: "#080809" }}>{r.title}</h3>
                      <p className="font-body text-[14px] font-light leading-[1.7] mb-4" style={{ color: "#6B6B78" }}>{r.desc}</p>
                      <p className="font-mono text-[10px] tracking-wide mb-5" style={{ color: "#9B9BA8" }}>{r.devices.join(" · ")}</p>
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[13px] text-signal-red px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(204,41,54,0.06)" }}>From {r.price}</span>
                          <span className="font-mono text-[11px]" style={{ color: "#9B9BA8" }}>⏱ {r.turnaround}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-signal-red opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Bottom CTA */}
        <section className="py-24 md:py-36 grain vignette relative" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(204,41,54,0.03) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-4 tracking-[-0.02em]">Not sure what you need?</h2>
            <p className="font-body font-light text-[16px] text-steel/40 mb-10 max-w-md mx-auto">Bring your device in for a free diagnosis. We'll tell you exactly what's wrong and how much it costs — before we touch anything.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="group relative overflow-hidden bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center transition-all" style={{ boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }} data-cursor="cta">
                <span className="relative z-10">Book a Free Diagnosis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link to="/pricing" className="border border-steel/10 text-steel/50 font-body text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center hover:border-steel/20 hover:text-steel/70 transition-all">See All Prices</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

// Repair detail page — comprehensive editorial
const RepairDetail = ({ slug }: { slug: string }) => {
  const repair = repairTypes.find(r => r.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!repair) return (
    <div className="min-h-screen flex items-center justify-center grain" style={{ backgroundColor: "#080809" }}>
      <div className="text-center">
        <h1 className="font-display font-extralight text-[48px] text-steel mb-4">Repair not found.</h1>
        <Link to="/repairs" className="font-body text-signal-red text-[14px]">← Back to all repairs</Link>
      </div>
    </div>
  );

  const Icon = repair.icon;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(204,41,54,0.05) 0%, transparent 50%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/repairs" className="inline-flex items-center gap-2 font-mono text-[11px] text-signal-red/50 hover:text-signal-red transition-colors mb-8">
              <ArrowRight className="w-3 h-3 rotate-180" />
              All Repairs
            </Link>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(204,41,54,0.1)", border: "1px solid rgba(204,41,54,0.15)" }}>
                <Icon className="w-6 h-6 text-signal-red" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-display font-extralight text-[44px] md:text-[72px] lg:text-[84px] leading-[0.92] text-steel tracking-[-0.02em]">{repair.title}</h1>
              </div>
            </div>
            <p className="font-body font-light text-[18px] md:text-[20px] leading-[1.7] max-w-[640px] mb-8" style={{ color: "rgba(240,239,244,0.45)" }}>{repair.desc}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {repair.devices.map(d => (
                <span key={d} className="font-mono text-[11px] px-4 py-2 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,239,244,0.4)", background: "rgba(255,255,255,0.02)" }}>{d}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-signal-red/60" />
                <span className="font-mono text-[12px] text-steel/40">{repair.turnaround}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-signal-red/60" />
                <span className="font-mono text-[12px] text-steel/40">12-month warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-signal-red/60" />
                <span className="font-mono text-[12px] text-steel/40">No fix, no fee</span>
              </div>
            </div>
          </div>
        </section>

        {/* What is this repair */}
        <SectionReveal className="py-20 md:py-28 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">About This Repair</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] mb-8 leading-[1]" style={{ color: "#080809" }}>What's involved.</h2>
            <p className="font-body font-light text-[16px] md:text-[18px] leading-[1.8]" style={{ color: "#6B6B78" }}>{repair.longDesc}</p>
          </div>
        </SectionReveal>

        {/* Signs you need this */}
        <SectionReveal className="py-20 md:py-28 grain relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Diagnosis Guide</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] text-steel mb-12 leading-[1]">Signs you need this repair.</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {repair.signs.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5, ease: customEase }} className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(204,41,54,0.1)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-signal-red" />
                  </div>
                  <span className="font-body text-[15px] font-light text-steel/60">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Our process */}
        <SectionReveal className="py-20 md:py-28 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Step By Step</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] mb-12 leading-[1]" style={{ color: "#080809" }}>Our repair process.</h2>
            <div className="space-y-0">
              {repair.process.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease: customEase }} className="flex items-start gap-6 py-6 relative" style={i < repair.process.length - 1 ? { borderBottom: "1px solid rgba(0,0,0,0.06)" } : {}}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(204,41,54,0.06)" }}>
                      <span className="font-mono text-[12px] text-signal-red font-medium">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    {i < repair.process.length - 1 && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-full" style={{ background: "linear-gradient(180deg, rgba(204,41,54,0.15) 0%, transparent 100%)" }} />
                    )}
                  </div>
                  <span className="font-body text-[15px] md:text-[16px] font-light pt-2.5" style={{ color: "#080809" }}>{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Parts we use */}
        <SectionReveal className="py-20 md:py-28 grain relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Quality Guarantee</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] text-steel mb-12 leading-[1]">Parts we use.</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-[20px] p-7 md:p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #CC2936, transparent)" }} />
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-signal-red block mb-4">Genuine Parts</span>
                <p className="font-body text-[14px] font-light text-steel/50 leading-[1.7]">{repair.parts.genuine}</p>
              </div>
              <div className="rounded-[20px] p-7 md:p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-steel/30 block mb-4">Premium Grade</span>
                <p className="font-body text-[14px] font-light text-steel/50 leading-[1.7]">{repair.parts.premium}</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Pricing table */}
        <SectionReveal className="py-20 md:py-28 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Transparent Pricing</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] mb-12 leading-[1]" style={{ color: "#080809" }}>Pricing by model.</h2>
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    <th className="px-6 py-4 text-left font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#6B6B78" }}>Model</th>
                    <th className="px-6 py-4 text-left font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#6B6B78" }}>Price</th>
                    <th className="px-6 py-4 text-left font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#6B6B78" }}>Time</th>
                    <th className="px-6 py-4 text-right font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#6B6B78" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {repair.pricing.map((row, i) => (
                    <tr key={i} className="hover:bg-signal-red/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                      <td className="px-6 py-4 font-body text-[14px] font-medium" style={{ color: "#080809" }}>{row.model}</td>
                      <td className="px-6 py-4 font-mono text-[15px] text-signal-red font-medium">{row.price}</td>
                      <td className="px-6 py-4 font-mono text-[12px]" style={{ color: "#6B6B78" }}>⏱ {row.time}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/book" className="font-body text-[12px] text-signal-red border border-signal-red/25 rounded-lg px-3 py-1.5 hover:bg-signal-red hover:text-steel transition-all">Book →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-body font-light text-[13px] mt-6" style={{ color: "#6B6B78" }}>
              All prices include parts and labour. 12-month warranty on all repairs. Prices confirmed during free diagnosis.
            </p>
          </div>
        </SectionReveal>

        {/* FAQ */}
        <SectionReveal className="py-20 md:py-28 grain relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">FAQ</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] text-steel mb-12 leading-[1]">Common questions.</h2>
            <div className="space-y-3">
              {repair.faq.map((f, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", background: openFaq === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-5 flex justify-between items-center gap-4">
                    <span className="font-body text-[15px] font-medium text-steel/70">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-signal-red/50 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: customEase }}>
                        <div className="px-6 pb-5">
                          <p className="font-body text-[14px] font-light text-steel/40 leading-[1.7]">{f.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* CTA */}
        <section className="py-24 md:py-36 relative overflow-hidden" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-4 tracking-[-0.02em]">Book your {repair.title.toLowerCase()}.</h2>
            <p className="font-body font-light text-[16px] text-steel/40 mb-10">Walk in or book online in under 2 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="group relative overflow-hidden bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center" style={{ boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }} data-cursor="cta">
                <span className="relative z-10">Book This Repair</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link to="/pricing" className="border border-steel/10 text-steel/50 font-body text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center hover:border-steel/20 hover:text-steel/70 transition-all">See All Prices</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export { RepairsIndex, RepairDetail, repairTypes };
