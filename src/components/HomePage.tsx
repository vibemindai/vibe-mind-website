import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Cpu,
  Rocket,
  MessageSquare,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Clock,
} from "lucide-react";
import HomeNavigation from "./HomeNavigation";
import UnifiedNavigation from "./layout/UnifiedNavigation";
import AIChatWindow from "./AIChatWindow";
import MobileLanding from "./MobileLanding";
import FooterWrapper from "./FooterWrapper";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────
   Data unique to the Homepage — NOT used elsewhere
   ─────────────────────────────────────────── */

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description:
      "We dive deep into your workflows, bottlenecks, and goals to pinpoint exactly where AI can deliver the highest impact.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Build",
    description:
      "Our team crafts tailored AI solutions — from chatbots to analytics pipelines — using rapid, iterative development.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Scale",
    description:
      "We deploy, monitor, and continuously optimize your solution so it grows with your business.",
  },
];

const valueProps = [
  {
    icon: Zap,
    title: "Rapid Delivery",
    description: "From concept to production in weeks, not months.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 practices with data privacy at every layer.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Your own AI specialists, fully embedded in your project.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Continuous monitoring and expert support post-launch.",
  },
];

const testimonialQuote = {
  text: "VibeMind transformed our customer support with an AI chatbot that resolved 70% of tickets automatically. The impact was immediate.",
  author: "Operations Lead",
  company: "E-Commerce Client, India",
};

const HomePage = () => {
  const [isMobileChatExpanded, setIsMobileChatExpanded] = useState(false);
  const [desktopPrompt, setDesktopPrompt] = useState<string | undefined>();

  const handleLogoClick = () => {
    if (isMobileChatExpanded) {
      setIsMobileChatExpanded(false);
    }
  };

  const handleDesktopChatTrigger = useCallback((prompt: string) => {
    setDesktopPrompt(prompt);
  }, []);

  const handleDesktopPromptConsumed = useCallback(() => {
    setDesktopPrompt(undefined);
  }, []);

  return (
    <>
      {/* ========== MOBILE/TABLET LAYOUT — Preserved exactly as-is ========== */}
      <div className="lg:hidden min-h-screen bg-background">
        <HomeNavigation onLogoClick={handleLogoClick} isMobileChatExpanded={isMobileChatExpanded} />
        <div id="main-content" className="pt-14 sm:pt-16">
          {isMobileChatExpanded ? (
            <MobileLanding
              isExpanded={isMobileChatExpanded}
              setIsExpanded={setIsMobileChatExpanded}
            />
          ) : (
            <FooterWrapper>
              <MobileLanding
                isExpanded={isMobileChatExpanded}
                setIsExpanded={setIsMobileChatExpanded}
              />
            </FooterWrapper>
          )}
        </div>
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="hidden lg:block">
        <FooterWrapper>
          <div className="min-h-screen bg-background">
            <UnifiedNavigation />

            <main className="pt-24">
              {/* ── Section 1: Hero with AI Chat ── */}
              <section className="relative pb-16">
                {/* Subtle radial glow behind the hero */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
                  <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
                </div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                  <div className="grid grid-cols-12 gap-8 items-start">
                    {/* Left: Hero Content */}
                    <div className="col-span-5 pt-8">
                      <AnimatedSection delay={0}>
                        <div className="space-y-6">
                          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                            AI-Powered Solutions
                          </span>
                          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                            AI Solutions to{" "}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              Empower Your Business
                            </span>
                          </h1>
                          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                            We build intelligent software that transforms how businesses operate —
                            from conversational AI to enterprise analytics, delivered with speed and
                            precision.
                          </p>
                          <div className="flex gap-4 pt-2">
                            <Link
                              to="/services"
                              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                              Explore Services
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <Link
                              to="/contact"
                              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                            >
                              Get in Touch
                            </Link>
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>

                    {/* Right: AI Chat Window — wrapped in a proper card */}
                    <div className="col-span-7">
                      <AnimatedSection delay={0.1} direction="right">
                        <div className="rounded-2xl bg-card border border-border shadow-lg p-3 overflow-hidden">
                          <div className="h-[calc(100vh-14rem)] max-h-[460px] min-h-[380px]">
                            <AIChatWindow
                              initialPrompt={desktopPrompt}
                              onPromptConsumed={handleDesktopPromptConsumed}
                            />
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 2: How We Work — tinted background band ── */}
              <section className="bg-muted/20 py-20">
                <div className="container mx-auto px-4 lg:px-8">
                  <AnimatedSection delay={0}>
                    <div className="text-center max-w-2xl mx-auto mb-14">
                      <h2 className="text-3xl font-bold mb-4">
                        How We{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Work
                        </span>
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        A streamlined process designed to get AI working for your business — fast.
                      </p>
                    </div>
                  </AnimatedSection>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-20 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />

                    {processSteps.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="relative group"
                      >
                        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                          {/* Step number + icon circle */}
                          <div className="relative z-10 mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/40 transition-all duration-300">
                              <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                              {step.step}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Section 3: Why VibeMind — white band with elevated cards ── */}
              <section className="py-20">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="grid grid-cols-12 gap-12 items-center">
                    {/* Left: Value props */}
                    <div className="col-span-7">
                      <AnimatedSection delay={0}>
                        <h2 className="text-3xl font-bold mb-3">
                          Why{" "}
                          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            VibeMind?
                          </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                          We combine AI expertise with a relentless focus on business outcomes.
                          Here's what sets us apart.
                        </p>
                      </AnimatedSection>

                      <div className="grid grid-cols-2 gap-5">
                        {valueProps.map((prop, index) => (
                          <motion.div
                            key={prop.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 * index, duration: 0.4 }}
                            className="group p-5 rounded-xl bg-card/50 border border-border/50 shadow-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <prop.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                                  {prop.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {prop.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Testimonial card */}
                    <div className="col-span-5">
                      <AnimatedSection delay={0.1} direction="right">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 relative shadow-md backdrop-blur-sm">
                          {/* Quote mark */}
                          <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
                            <MessageSquare className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <p className="text-foreground leading-relaxed mt-3 mb-6 italic">
                            "{testimonialQuote.text}"
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{testimonialQuote.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {testimonialQuote.company}
                              </p>
                            </div>
                          </div>

                          {/* Quick facts */}
                          <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-xs text-muted-foreground">
                                70% auto-resolution
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-xs text-muted-foreground">4-week delivery</span>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 4: CTA — tinted background band ── */}
              <section className="bg-muted/20 py-16">
                <div className="container mx-auto px-4 lg:px-8">
                  <AnimatedSection delay={0}>
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20">
                      {/* Background decoration */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent blur-3xl" />
                      </div>

                      <div className="relative py-16 px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                          Let's Build Something{" "}
                          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Intelligent
                          </span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                          Whether you need a chatbot, analytics dashboard, or full-scale AI platform
                          — we're ready to bring your vision to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-lg"
                          >
                            Start a Project
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                          <Link
                            to="/services"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors text-lg"
                          >
                            Browse Services
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </section>
            </main>
          </div>
        </FooterWrapper>
      </div>
    </>
  );
};

export default HomePage;
