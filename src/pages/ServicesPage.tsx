import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import JugglingCapabilities from "@/components/services/JugglingCapabilities";
import FooterWrapper from "@/components/FooterWrapper";

const ServicesPage = () => {
  return (
    <FooterWrapper>
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
                  Click any capability to learn more about how we can help transform your business
                </p>
              </AnimatedSection>
            </div>

            {/* Juggling Capabilities */}
            <AnimatedSection delay={0.3}>
              <JugglingCapabilities />
            </AnimatedSection>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default ServicesPage;
