import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Tablet, Laptop, Monitor, Watch, Headphones, Gamepad2, ArrowRight, ChevronDown, Clock, Shield, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";
import MobileCTA from "@/components/MobileCTA";

const customEase = [0.22, 1, 0.36, 1] as const;

const allDevices = [
  {
    slug: "iphone", name: "iPhone", icon: Smartphone,
    models: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini", "iPhone 12 Pro Max", "iPhone 12", "iPhone 11 Pro", "iPhone 11", "iPhone SE (3rd Gen)", "iPhone SE (2nd Gen)"],
    repairs: 8,
    repairTypes: [
      { name: "Screen Replacement", price: "£69", slug: "screen-replacement" },
      { name: "Battery Replacement", price: "£45", slug: "battery-replacement" },
      { name: "Charging Port Repair", price: "£35", slug: "charging-port" },
      { name: "Camera Repair", price: "£59", slug: "camera-repair" },
      { name: "Water Damage Recovery", price: "£49", slug: "water-damage" },
      { name: "Data Recovery", price: "£59", slug: "data-recovery" },
      { name: "Software & Diagnostics", price: "£29", slug: "software-diagnostics" },
      { name: "Full Restoration", price: "£99", slug: "full-restoration" },
    ],
    commonIssues: [
      { issue: "Cracked screen from drops", desc: "The most common iPhone repair. Modern iPhones use ceramic shield glass, but drops on hard surfaces still cause cracks. We replace the full display assembly for perfect results." },
      { issue: "Battery degradation after 2+ years", desc: "iPhone batteries lose capacity over time. Once Battery Health drops below 80%, you'll notice shorter battery life and potential unexpected shutdowns." },
      { issue: "Charging port lint buildup", desc: "Pocket lint compresses inside the Lightning or USB-C port over time, preventing the cable from fully seating. Often resolved with professional cleaning." },
      { issue: "Camera lens cracks from drops", desc: "The protruding camera module on modern iPhones is vulnerable to impact. A cracked lens affects photo quality and allows dust inside the camera housing." },
      { issue: "Water damage despite IP68 rating", desc: "IP68 water resistance degrades as the adhesive seals age. Temperature changes, drops, and normal wear compromise the seal over time." },
    ],
    compatibility: "We stock genuine and premium parts for all iPhone models from iPhone 8 onwards. Older models (iPhone 7 and earlier) are available on request with a 1-2 day parts lead time.",
    faq: [
      { q: "Can you repair any iPhone model?", a: "Yes — we repair all iPhone models from iPhone 6s onwards. We stock parts for iPhone 8 and newer, with older model parts available on 1-2 day order." },
      { q: "Will repairing my iPhone void the Apple warranty?", a: "If your iPhone is still under Apple warranty or AppleCare+, a third-party repair may affect your coverage for certain issues. We recommend checking your warranty status before proceeding." },
      { q: "Do you support Face ID and True Tone after screen replacement?", a: "We preserve Face ID functionality during screen replacements. True Tone can be restored on most models using our calibration equipment." },
      { q: "Can you repair water-damaged iPhones?", a: "Yes — water damage recovery is one of our specialities. Success rates depend on how quickly the device reaches us after exposure. Don't put it in rice." },
      { q: "How long do iPhone repairs take?", a: "Most iPhone repairs are completed within 30-60 minutes. Screen and battery replacements are typically the fastest." },
    ]
  },
  {
    slug: "samsung", name: "Samsung", icon: Smartphone,
    models: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S22 Ultra", "Galaxy S22", "Galaxy A54", "Galaxy A34", "Galaxy A14", "Galaxy Z Fold5", "Galaxy Z Fold4", "Galaxy Z Flip5", "Galaxy Z Flip4"],
    repairs: 7,
    repairTypes: [
      { name: "Screen Replacement", price: "£99", slug: "screen-replacement" },
      { name: "Battery Replacement", price: "£55", slug: "battery-replacement" },
      { name: "Charging Port Repair", price: "£35", slug: "charging-port" },
      { name: "Camera Repair", price: "£69", slug: "camera-repair" },
      { name: "Water Damage Recovery", price: "£49", slug: "water-damage" },
      { name: "Data Recovery", price: "£59", slug: "data-recovery" },
      { name: "Software & Diagnostics", price: "£29", slug: "software-diagnostics" },
    ],
    commonIssues: [
      { issue: "Cracked AMOLED display", desc: "Samsung's AMOLED screens are stunning but can be fragile. Even small impacts can cause internal display damage, showing as black spots, coloured lines, or touch dead zones." },
      { issue: "Battery swelling and degradation", desc: "Samsung batteries, like all lithium-ion cells, degrade over time. Swelling is a safety concern that requires immediate professional attention." },
      { issue: "Charging port failure", desc: "USB-C ports on Samsung devices can develop connection issues from debris, bent pins, or general wear." },
      { issue: "Camera module issues", desc: "The multi-camera systems on Galaxy S and Z series can experience lens cracks, autofocus failure, or module disconnection from drops." },
      { issue: "Screen burn-in on older AMOLED models", desc: "Static UI elements like the navigation bar can leave permanent ghost images on older AMOLED displays. Screen replacement is the only solution." },
    ],
    compatibility: "We carry parts for all Samsung Galaxy S series (S21 onwards), A series (A34 onwards), and Z series foldables. Older models available on 1-3 day order.",
    faq: [
      { q: "Can you repair Samsung foldable phones?", a: "Yes — we repair Galaxy Z Fold and Z Flip models. These require specialist tools and parts, so pricing and turnaround may differ from standard Samsung repairs." },
      { q: "Are Samsung screen replacements more expensive than iPhone?", a: "Samsung AMOLED screens are generally more expensive to manufacture, so replacement costs can be higher — especially for Ultra and foldable models." },
      { q: "Do you repair Samsung tablets?", a: "We primarily focus on Samsung phones, but can assess Samsung tablets on a case-by-case basis." },
    ]
  },
  {
    slug: "ipad", name: "iPad", icon: Tablet,
    models: ["iPad Pro 12.9\" (6th Gen)", "iPad Pro 12.9\" (5th Gen)", "iPad Pro 11\" (4th Gen)", "iPad Pro 11\" (3rd Gen)", "iPad Air (5th Gen)", "iPad Air (4th Gen)", "iPad Mini (6th Gen)", "iPad (10th Gen)", "iPad (9th Gen)", "iPad (8th Gen)"],
    repairs: 6,
    repairTypes: [
      { name: "Screen Replacement", price: "£149", slug: "screen-replacement" },
      { name: "Battery Replacement", price: "£89", slug: "battery-replacement" },
      { name: "Charging Port Repair", price: "£49", slug: "charging-port" },
      { name: "Camera Repair", price: "£79", slug: "camera-repair" },
      { name: "Data Recovery", price: "£69", slug: "data-recovery" },
      { name: "Software & Diagnostics", price: "£29", slug: "software-diagnostics" },
    ],
    commonIssues: [
      { issue: "Cracked screen from drops", desc: "iPads have larger glass surfaces making them more vulnerable to drop damage. The thin design means even moderate impacts can shatter the display." },
      { issue: "Battery not holding charge", desc: "iPad batteries are large but still degrade. Professional replacement restores the multi-day battery life iPads are known for." },
      { issue: "Charging port damage", desc: "USB-C and Lightning port damage on iPads often comes from charging while the device is being used at awkward angles." },
      { issue: "Home button / Touch ID failure", desc: "Older iPads with physical home buttons can experience button or Touch ID sensor failure requiring module replacement." },
      { issue: "Bent chassis from bag pressure", desc: "Thin iPads (especially iPad Pro) can develop slight bends from pressure in bags. This can affect screen function and internal connections." },
    ],
    compatibility: "We stock parts for all iPad Pro, Air, Mini, and standard iPad models from 2018 onwards.",
    faq: [
      { q: "Is the iPad screen more expensive to replace than a phone?", a: "Generally yes, due to the larger display size. iPad Pro screens with ProMotion and mini-LED are the most expensive." },
      { q: "Can you repair an iPad with a bent chassis?", a: "We can assess the extent of bending and repair if possible. In severe cases, the bend may have damaged internal components that also need attention." },
    ]
  },
  {
    slug: "macbook", name: "MacBook", icon: Laptop,
    models: ["MacBook Pro 16\" M3 Pro/Max", "MacBook Pro 14\" M3 Pro/Max", "MacBook Pro 16\" M2 Pro/Max", "MacBook Pro 14\" M2 Pro/Max", "MacBook Air 15\" M2", "MacBook Air 13\" M2", "MacBook Air 13\" M1", "MacBook Pro 13\" M2", "MacBook Pro 13\" M1", "Older Intel Models"],
    repairs: 7,
    repairTypes: [
      { name: "Screen Replacement", price: "£349", slug: "screen-replacement" },
      { name: "Battery Replacement", price: "£179", slug: "battery-replacement" },
      { name: "Keyboard & Trackpad", price: "£229", slug: "keyboard-repair" },
      { name: "Charging Port Repair", price: "£75", slug: "charging-port" },
      { name: "Water Damage Recovery", price: "£99", slug: "water-damage" },
      { name: "Data Recovery", price: "£99", slug: "data-recovery" },
      { name: "Software & Diagnostics", price: "£49", slug: "software-diagnostics" },
    ],
    commonIssues: [
      { issue: "Butterfly keyboard failure", desc: "2016-2019 MacBook Pro models with butterfly keyboards are notorious for key failure. We replace the full top-case assembly for a permanent fix." },
      { issue: "Battery swelling", desc: "MacBook batteries can swell with age, pushing up the trackpad and warping the case. This requires immediate attention." },
      { issue: "Screen coating delamination", desc: "Some MacBook models develop a cloudy or patchy anti-reflective coating. Screen replacement restores the pristine display." },
      { issue: "Liquid damage to logic board", desc: "Coffee, water, and other liquid spills are the most common MacBook emergency. Board-level micro-soldering can often save a damaged logic board." },
      { issue: "USB-C port damage", desc: "Forcing cables or using non-certified accessories can damage USB-C/Thunderbolt ports." },
    ],
    compatibility: "We service all MacBook Pro and MacBook Air models from 2015 onwards. M-series Apple Silicon and Intel models both supported.",
    faq: [
      { q: "Why are MacBook repairs more expensive?", a: "Apple integrates many components (keyboard, battery, trackpad) into a single top-case assembly. Repair often requires replacing the entire assembly, which costs more but ensures a perfect result." },
      { q: "Can you upgrade MacBook RAM or storage?", a: "On newer M-series MacBooks, RAM and storage are soldered to the logic board and cannot be upgraded. On older Intel models, some upgrades may be possible." },
    ]
  },
  {
    slug: "laptop", name: "Windows Laptop", icon: Laptop,
    models: ["HP Pavilion/Envy/Spectre/Omen", "Dell XPS/Inspiron/Latitude/Vostro", "Lenovo ThinkPad/IdeaPad/Yoga/Legion", "ASUS ZenBook/VivoBook/ROG", "Acer Swift/Aspire/Predator", "Microsoft Surface Pro/Laptop/Go", "Other Windows laptops"],
    repairs: 6,
    repairTypes: [
      { name: "Screen Replacement", price: "£99", slug: "screen-replacement" },
      { name: "Battery Replacement", price: "£85", slug: "battery-replacement" },
      { name: "Keyboard & Trackpad", price: "£89", slug: "keyboard-repair" },
      { name: "Charging Port Repair", price: "£49", slug: "charging-port" },
      { name: "Data Recovery", price: "£79", slug: "data-recovery" },
      { name: "Software & Diagnostics", price: "£39", slug: "software-diagnostics" },
    ],
    commonIssues: [
      { issue: "Broken hinges", desc: "Laptop hinges endure thousands of open/close cycles and can crack, loosen, or break entirely — especially on plastic-bodied laptops." },
      { issue: "Keyboard key failure", desc: "Individual keys can stop working from debris, liquid, or mechanism failure. We can replace individual keys or the full keyboard." },
      { issue: "Battery degradation and swelling", desc: "Windows laptop batteries degrade like all lithium-ion cells. Replacement restores portable battery life." },
      { issue: "Screen damage", desc: "Cracked, dead-pixel, or flickering screens are common from drops, pressure, or hinge-related stress on the display cable." },
      { issue: "Overheating and fan noise", desc: "Dust buildup in cooling fans and dried thermal paste cause overheating. Our thermal service restores proper cooling." },
    ],
    compatibility: "We repair all major Windows laptop brands. Parts availability depends on model — most common models have same-day parts, others may require 1-3 day ordering.",
    faq: [
      { q: "Can you repair any laptop brand?", a: "We repair HP, Dell, Lenovo, ASUS, Acer, Microsoft Surface, and most other brands. Very rare or specialist models may require parts ordering." },
      { q: "Can you upgrade my laptop?", a: "Many laptops allow RAM and SSD upgrades. We can assess your specific model and recommend the best upgrade path for improved performance." },
    ]
  },
  {
    slug: "imac", name: "iMac", icon: Monitor,
    models: ["iMac 24\" M3", "iMac 24\" M1", "iMac 27\" 5K (2019/2020)", "iMac 21.5\" (2017-2019)", "Older Intel Models"],
    repairs: 5,
    repairTypes: [
      { name: "Screen Replacement", price: "£399", slug: "screen-replacement" },
      { name: "Data Recovery", price: "£99", slug: "data-recovery" },
      { name: "Software & Diagnostics", price: "£49", slug: "software-diagnostics" },
      { name: "Water Damage Recovery", price: "£99", slug: "water-damage" },
      { name: "Full Restoration", price: "£179", slug: "full-restoration" },
    ],
    commonIssues: [
      { issue: "Hard drive failure on older models", desc: "Intel iMacs with spinning hard drives often fail after 5-7 years. SSD upgrades dramatically improve performance." },
      { issue: "Display issues", desc: "Vertical lines, dead zones, or backlight failure require professional display replacement." },
      { issue: "Overheating and throttling", desc: "Dust buildup restricts airflow, causing thermal throttling and fan noise. Internal cleaning restores performance." },
      { issue: "Slow performance", desc: "Older iMacs benefit significantly from SSD upgrades and RAM increases." },
    ],
    compatibility: "We service all iMac models from 2015 onwards.",
    faq: [
      { q: "Can you upgrade my iMac's hard drive to an SSD?", a: "On most Intel iMacs, yes. This is one of the most impactful upgrades available — boot times drop from minutes to seconds." },
    ]
  },
  {
    slug: "apple-watch", name: "Apple Watch", icon: Watch,
    models: ["Apple Watch Ultra 2", "Apple Watch Ultra", "Apple Watch Series 9", "Apple Watch Series 8", "Apple Watch Series 7", "Apple Watch SE (2nd Gen)", "Apple Watch SE (1st Gen)"],
    repairs: 4,
    repairTypes: [
      { name: "Screen Replacement", price: "£99", slug: "screen-replacement" },
      { name: "Battery Replacement", price: "£69", slug: "battery-replacement" },
      { name: "Water Damage Recovery", price: "£49", slug: "water-damage" },
      { name: "Software & Diagnostics", price: "£29", slug: "software-diagnostics" },
    ],
    commonIssues: [
      { issue: "Cracked screen from impacts", desc: "The Apple Watch screen is small but exposed. Impacts against door frames, gym equipment, and hard surfaces cause cracks." },
      { issue: "Battery degradation", desc: "Apple Watch batteries are small and cycle frequently. After 2 years, many users notice significantly reduced battery life." },
      { issue: "Digital Crown not responding", desc: "Debris or damage to the Digital Crown affects scrolling and pressing. Professional cleaning or replacement resolves this." },
      { issue: "Water damage despite water resistance", desc: "Swimming and showering with an Apple Watch can eventually compromise seals, especially on older models." },
    ],
    compatibility: "We stock parts for Apple Watch Series 4 onwards and Apple Watch Ultra.",
    faq: [],
  },
  {
    slug: "airpods", name: "AirPods", icon: Headphones,
    models: ["AirPods Pro (2nd Gen, USB-C)", "AirPods Pro (2nd Gen, Lightning)", "AirPods (3rd Gen)", "AirPods Max", "AirPods Pro (1st Gen)", "AirPods (2nd Gen)"],
    repairs: 3,
    repairTypes: [
      { name: "Battery Replacement", price: "£49", slug: "battery-replacement" },
      { name: "Charging Case Repair", price: "£39", slug: "charging-port" },
      { name: "Software & Diagnostics", price: "£19", slug: "software-diagnostics" },
    ],
    commonIssues: [
      { issue: "One AirPod significantly quieter or dead", desc: "Usually caused by a depleted battery in one AirPod or a blocked speaker mesh." },
      { issue: "Battery drain — both AirPods and case", desc: "AirPods batteries are tiny and degrade faster than phone batteries. After 2 years, total listening time drops significantly." },
      { issue: "Charging case not charging", desc: "Lightning or USB-C port damage on the case, or internal battery failure." },
      { issue: "Poor ANC or transparency mode", desc: "Microphone blockage or software issues can reduce noise cancellation effectiveness." },
    ],
    compatibility: "We service AirPods Pro (1st and 2nd Gen), AirPods (2nd and 3rd Gen), and AirPods Max.",
    faq: [],
  },
  {
    slug: "gaming-consoles", name: "Gaming Consoles", icon: Gamepad2,
    models: ["PlayStation 5", "PlayStation 5 Digital", "PlayStation 4 Pro", "PlayStation 4", "Xbox Series X", "Xbox Series S", "Nintendo Switch OLED", "Nintendo Switch", "Nintendo Switch Lite", "Steam Deck"],
    repairs: 5,
    repairTypes: [
      { name: "HDMI Port Repair", price: "£69", slug: "charging-port" },
      { name: "Disc Drive Repair", price: "£59", slug: "full-restoration" },
      { name: "Overheating / Thermal Service", price: "£49", slug: "software-diagnostics" },
      { name: "Controller Drift Fix", price: "£29", slug: "software-diagnostics" },
      { name: "Data Recovery", price: "£59", slug: "data-recovery" },
    ],
    commonIssues: [
      { issue: "HDMI port damage — no video output", desc: "Bending or forcing HDMI cables can damage the port's solder joints. Board-level micro-soldering repairs the connection." },
      { issue: "Overheating and loud fan noise", desc: "Dust buildup inside consoles restricts airflow. Thermal paste degradation reduces heat transfer. Our cleaning service restores quiet, cool operation." },
      { issue: "Disc drive not reading games", desc: "Laser lens degradation, motor failure, or ribbon cable issues prevent disc reading. Drive repair or replacement resolves the issue." },
      { issue: "Joy-Con / controller analogue stick drift", desc: "The notorious drift issue on Nintendo Switch and PS5 controllers. We replace the affected analogue stick module." },
      { issue: "SSD/storage upgrade needed", desc: "Running out of game storage is common. We can upgrade internal SSDs in PS5, Xbox Series X, and Steam Deck." },
    ],
    compatibility: "We repair current and last-generation consoles from Sony, Microsoft, and Nintendo, plus Steam Deck.",
    faq: [
      { q: "Can you fix Joy-Con drift?", a: "Yes — we replace the analogue stick module inside the Joy-Con. The repair takes about 30 minutes per controller." },
      { q: "Can you upgrade my PS5 SSD?", a: "Yes — we can install a compatible M.2 NVMe SSD in the PS5's expansion slot and migrate your data." },
    ]
  },
];

const DevicesIndex = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="w-10 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(204,41,54,0.8)" }}>All Devices</span>
            </motion.div>
            <motion.h1 className="font-display font-extralight text-[48px] md:text-[80px] lg:text-[96px] leading-[0.9] text-steel mb-8 tracking-[-0.02em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: customEase }}>
              We repair everything.
            </motion.h1>
            <motion.p className="font-body font-light text-[18px] md:text-[20px] max-w-[560px] leading-[1.7]" style={{ color: "rgba(240,239,244,0.45)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              iPhones, Samsung, iPads, MacBooks, laptops, gaming consoles, watches, and more. If it's tech, we repair it.
            </motion.p>
          </div>
        </section>

        <SectionReveal className="py-24 md:py-36 grain relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10" ref={ref}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allDevices.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div key={d.slug} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05, duration: 0.6, ease: customEase }}>
                    <Link to={`/devices/${d.slug}`} className="group block rounded-[20px] p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-signal-red to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform" style={{ background: "rgba(204,41,54,0.06)", border: "1px solid rgba(204,41,54,0.1)" }}>
                        <Icon className="w-6 h-6 text-signal-red/60 group-hover:text-signal-red transition-colors" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-body text-[18px] font-medium text-steel mb-1">{d.name}</h3>
                      <span className="font-mono text-[12px] text-signal-red">{d.repairs} repair types</span>
                      <p className="font-mono text-[10px] text-steel/20 mt-2 mb-4">{d.models.length} models supported</p>
                      <div className="flex items-center gap-2 text-steel/25 group-hover:text-steel/60 transition-colors">
                        <span className="font-body text-[13px]">View Repairs</span>
                        <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

const DeviceDetail = ({ slug }: { slug: string }) => {
  const device = allDevices.find(d => d.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!device) return (
    <div className="min-h-screen flex items-center justify-center grain" style={{ backgroundColor: "#080809" }}>
      <div className="text-center">
        <h1 className="font-display font-extralight text-[48px] text-steel mb-4">Device not found.</h1>
        <Link to="/devices" className="font-body text-signal-red text-[14px]">← Back to all devices</Link>
      </div>
    </div>
  );

  const Icon = device.icon;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 grain vignette circuit-bg" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(204,41,54,0.05) 0%, transparent 50%)" }} />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/devices" className="inline-flex items-center gap-2 font-mono text-[11px] text-signal-red/50 hover:text-signal-red transition-colors mb-8">
              <ArrowRight className="w-3 h-3 rotate-180" />
              All Devices
            </Link>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(204,41,54,0.1)", border: "1px solid rgba(204,41,54,0.15)" }}>
                <Icon className="w-6 h-6 text-signal-red" strokeWidth={1.5} />
              </div>
              <h1 className="font-display font-extralight text-[44px] md:text-[72px] lg:text-[84px] leading-[0.92] text-steel tracking-[-0.02em]">{device.name} Repairs</h1>
            </div>
            <p className="font-body font-light text-[18px] md:text-[20px] leading-[1.7] max-w-[600px] mb-8" style={{ color: "rgba(240,239,244,0.45)" }}>
              Expert repairs for all {device.name} models. Same day service. 12-month warranty. Genuine parts.
            </p>

            {/* Model chips */}
            <div className="flex flex-wrap gap-2">
              {device.models.slice(0, 8).map(m => (
                <span key={m} className="font-mono text-[10px] px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,239,244,0.35)", background: "rgba(255,255,255,0.02)" }}>{m}</span>
              ))}
              {device.models.length > 8 && (
                <span className="font-mono text-[10px] px-3 py-1.5 rounded-full text-signal-red/60" style={{ border: "1px solid rgba(204,41,54,0.15)", background: "rgba(204,41,54,0.04)" }}>+{device.models.length - 8} more</span>
              )}
            </div>
          </div>
        </section>

        {/* Available repairs */}
        <SectionReveal className="py-20 md:py-28 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Available Repairs</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] mb-12 leading-[1]" style={{ color: "#080809" }}>What we can fix.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {device.repairTypes.map((r, i) => (
                <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5, ease: customEase }}>
                  <Link to={`/repairs/${r.slug}`} className="group block rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-signal-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <h3 className="font-body text-[15px] font-semibold mb-2" style={{ color: "#080809" }}>{r.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[14px] text-signal-red">From {r.price}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-signal-red/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Common issues */}
        <SectionReveal className="py-20 md:py-28 grain relative" style={{ backgroundColor: "#080809" }}>
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Common Issues</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] text-steel mb-12 leading-[1]">Common {device.name} problems.</h2>
            <div className="space-y-4">
              {device.commonIssues.map((issue, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease: customEase }} className="rounded-xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h3 className="font-body text-[15px] font-semibold text-steel mb-2">{issue.issue}</h3>
                  <p className="font-body text-[14px] font-light text-steel/40 leading-[1.7]">{issue.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Compatibility */}
        <SectionReveal className="py-20 md:py-28 relative">
          <div style={{ backgroundColor: "#F5F4F6" }} className="absolute inset-0" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-signal-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">Parts & Compatibility</span>
            </div>
            <h2 className="font-display font-extralight text-[36px] md:text-[56px] mb-8 leading-[1]" style={{ color: "#080809" }}>Parts availability.</h2>
            <p className="font-body text-[16px] font-light leading-[1.8] mb-8" style={{ color: "#6B6B78" }}>{device.compatibility}</p>

            <div className="rounded-[20px] p-8" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: "#6B6B78" }}>Supported Models</h3>
              <div className="flex flex-wrap gap-2">
                {device.models.map(m => (
                  <span key={m} className="font-mono text-[11px] px-3 py-1.5 rounded-lg" style={{ backgroundColor: "rgba(204,41,54,0.04)", color: "#6B6B78", border: "1px solid rgba(204,41,54,0.08)" }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* FAQ */}
        {device.faq.length > 0 && (
          <SectionReveal className="py-20 md:py-28 grain relative" style={{ backgroundColor: "#080809" }}>
            <div className="container mx-auto px-6 relative z-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-signal-red" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-red/70">{device.name} FAQ</span>
              </div>
              <h2 className="font-display font-extralight text-[36px] md:text-[56px] text-steel mb-12 leading-[1]">Common questions.</h2>
              <div className="space-y-3">
                {device.faq.map((f, i) => (
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
        )}

        {/* CTA */}
        <section className="py-24 md:py-36 relative" style={{ backgroundColor: "#080809" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(204,41,54,0.04) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="font-display font-extralight text-[40px] md:text-[64px] text-steel mb-4 tracking-[-0.02em]">Book your {device.name} repair.</h2>
            <p className="font-body font-light text-[16px] text-steel/40 mb-10">Walk in or book online in under 2 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="group relative overflow-hidden bg-signal-red text-steel font-body font-semibold text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center" style={{ boxShadow: "0 8px 32px rgba(204,41,54,0.25)" }} data-cursor="cta">
                <span className="relative z-10">Book a Repair</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link to="/pricing" className="border border-steel/10 text-steel/50 font-body text-[15px] rounded-[14px] h-[56px] px-10 flex items-center justify-center hover:border-steel/20 hover:text-steel/70 transition-all">See Prices</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export { DevicesIndex, DeviceDetail, allDevices };
