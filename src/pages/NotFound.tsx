import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowRight, Search, Bot } from "lucide-react";
import { SEOHead } from "@/components/seo";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <FooterWrapper>
      <SEOHead
        title="Page Not Found | Vibe Mind AI Solutions"
        description="The page you're looking for doesn't exist. Return to Vibe Mind AI Solutions homepage for AI development, chatbots, and intelligent automation services."
        canonicalUrl="/404"
        noIndex={true}
      />
      <div className="min-h-screen bg-background">
        <UnifiedNavigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Animated robot icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8"
            >
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/20">
                <Bot className="w-16 h-16 text-primary" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                />
              </div>
            </motion.div>

            {/* 404 heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                404
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-2"
            >
              This page seems to have wandered off
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8 max-w-md"
            >
              Even our AI couldn't find what you're looking for. Let's get you back on track.
            </motion.p>

            {/* Navigation links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                <Search className="w-4 h-4" />
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default NotFound;
