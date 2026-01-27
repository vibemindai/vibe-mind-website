import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppCTABanner = () => {
  const whatsappUrl =
    "https://wa.me/918921442486?text=Hi!%20I'd%20like%20to%20know%20more%20about%20VibeMind%20AI%20Solutions.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-6 md:p-8"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Chat with us on WhatsApp
            </h3>
            <p className="text-sm text-white/80">
              Quick responses, no waiting
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto"
        >
          <Button
            size="lg"
            className="w-full md:w-auto bg-white text-green-600 hover:bg-white/90 rounded-full px-6 tactile-button font-semibold"
          >
            Start Chat
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default WhatsAppCTABanner;
