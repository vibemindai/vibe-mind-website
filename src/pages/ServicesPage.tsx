import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import JugglingCapabilities from "@/components/services/JugglingCapabilities";
import FooterWrapper from "@/components/FooterWrapper";
import { SEOHead } from "@/components/seo";
import { serviceCategories } from "@/data/serviceCategories";
import { getIcon, getCapabilitiesByCategory } from "@/data/aiCapabilities";

const ServicesPage = () => {
  return (
    <FooterWrapper>
      <SEOHead
        title="AI Services & Solutions | Vibe Mind AI"
        description="Explore our comprehensive AI services including conversational AI, machine learning, computer vision, data analytics, generative AI, automation, and enterprise solutions."
        canonicalUrl="/services"
        keywords={[
          "AI services",
          "machine learning services",
          "AI solutions",
          "Vibe Mind AI",
          "conversational AI",
          "computer vision",
          "generative AI",
          "ai chatbot services",
          "bot development services",
          "conversational ai platform",
          "enterprise bot solutions",
          "ai assistant development",
          "chatbot consulting",
          "voice bot development",
          "ai agent development",
          "rag chatbot development",
          "knowledge base chatbot",
          "support bot automation",
          "lead generation chatbot",
          "ecommerce chatbot",
          "healthcare chatbot",
          "banking chatbot solutions",
          "langchain development",
          "openai integration",
          "claude api integration",
          "vector database chatbot",
          "semantic search bot"
        ]}
      />

      <div className="min-h-screen bg-background relative">
        <UnifiedNavigation />

        {/* Content */}
        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <AnimatedSection delay={0}>
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Our Capabilities</span>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-bold">
                  AI-Powered
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Solutions & Services
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-lg text-muted-foreground">
                  Explore our comprehensive range of AI services designed to transform your business
                </p>
              </AnimatedSection>
            </div>

            {/* Category Cards */}
            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {serviceCategories.map((category, index) => {
                  const CategoryIcon = getIcon(category.icon);
                  const serviceCount = getCapabilitiesByCategory(category.categoryKey).length;

                  return (
                    <motion.div
                      key={category.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={`/services/${category.slug}`}
                        className="group block h-full"
                      >
                        <div className="h-full p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                          <div className="flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <CategoryIcon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {category.name}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                  {serviceCount} services
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                              {category.metaDescription}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Explore services <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* All Services Section */}
            <AnimatedSection delay={0.4}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">All AI Capabilities</h2>
                <p className="text-muted-foreground">
                  Click any capability to learn more
                </p>
              </div>
            </AnimatedSection>

            {/* Juggling Capabilities */}
            <AnimatedSection delay={0.5}>
              <JugglingCapabilities />
            </AnimatedSection>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default ServicesPage;
