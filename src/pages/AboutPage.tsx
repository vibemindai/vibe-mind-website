import { Brain, Zap, Target } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import StatisticsSection from "@/components/about/StatisticsSection";
import FooterWrapper from "@/components/FooterWrapper";
import { SEOHead } from "@/components/seo";

const AboutPage = () => {
  const values = [
    {
      icon: Brain,
      title: "AI-Driven Innovation",
      description: "Leveraging cutting-edge AI to transform ideas into intelligent solutions"
    },
    {
      icon: Zap,
      title: "Rapid Delivery",
      description: "Fast turnaround without compromising quality or performance"
    },
    {
      icon: Target,
      title: "Future-Ready",
      description: "Building scalable systems designed for tomorrow's challenges"
    }
  ];

  return (
    <FooterWrapper>
      <SEOHead
        title="About Us | Vibe Mind AI Solutions - AI Innovation Company"
        description="Learn about Vibe Mind AI Solutions, a leading AI company in Kerala, India. We specialize in AI-driven innovation, rapid delivery, and future-ready solutions."
        keywords={[
          "about vibe mind ai",
          "ai company kerala",
          "ai innovation company",
          "vibe coding",
          "ai software company india",
          "tech startup kerala"
        ]}
        canonicalUrl="/about"
      />
      <div className="min-h-screen bg-background">
        <UnifiedNavigation />

        <main className="pt-24 pb-16">
          {/* Mission & Vision Section - TOP */}
          <MissionVisionSection />

          {/* Hero Content - CENTERED, NO IMAGE */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {/* About badge */}
              <AnimatedSection delay={0}>
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">About Us</span>
                </div>
              </AnimatedSection>

              {/* Headline */}
              <AnimatedSection delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Welcome to the Era of
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Vibe Coding
                  </span>
                </h1>
              </AnimatedSection>

              {/* Description paragraphs */}
              <AnimatedSection delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  At <span className="text-foreground font-semibold">Vibe Mind AI Solutions</span>, we don't just build software—we orchestrate
                  a symphony of AI and human creativity. Our philosophy, <span className="text-primary font-semibold">"Vibe Coding,"</span> represents
                  a revolutionary approach where intelligent automation and innovative thinking converge.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  From legacy system modernization to cutting-edge AI solutions, we serve clients across
                  <span className="text-foreground font-semibold"> India, Qatar, and the United States</span>, delivering
                  transformative digital experiences that drive real business value.
                </p>
              </AnimatedSection>
            </div>

            {/* Values Grid - Below text, centered */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {values.map((value, index) => (
                  <AnimatedSection key={index} delay={0.4 + index * 0.1} direction="up">
                    <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg group h-full">
                      <value.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-sm md:text-base mb-2">{value.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <StatisticsSection />
        </main>
      </div>
    </FooterWrapper>
  );
};

export default AboutPage;
