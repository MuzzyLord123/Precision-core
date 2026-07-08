import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const MobileCTA = () => {
  return (
    <>
      {/* Sticky bottom bar - mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-[9990] lg:hidden" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(8,8,9,0.95) 30%)", backdropFilter: "blur(20px)" }}>
        <div className="px-4 pb-4 pt-8 flex gap-3">
          <Link
            to="/book"
            className="flex-1 relative overflow-hidden font-body font-semibold text-[14px] rounded-xl h-[52px] flex items-center justify-center text-steel"
            style={{ background: "linear-gradient(135deg, #CC2936 0%, #a82230 100%)" }}
          >
            Book a Repair
          </Link>
          <a
            href="tel:+441234567890"
            className="font-body text-[14px] text-steel/50 border border-steel/10 rounded-xl h-[52px] px-5 flex items-center justify-center"
            style={{ backdropFilter: "blur(10px)" }}
          >
            Call
          </a>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/441234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-[9989] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5, type: "spring" }}
        data-cursor="link"
      >
        <MessageCircle className="w-6 h-6 text-steel" fill="white" strokeWidth={0} />
      </motion.a>
    </>
  );
};

export default MobileCTA;
