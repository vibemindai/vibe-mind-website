import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import CallbackRequestForm from "@/components/contact/CallbackRequestForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import WhatsAppCTABanner from "@/components/contact/WhatsAppCTABanner";
import FooterWrapper from "@/components/FooterWrapper";
import { SEOHead } from "@/components/seo";

const ContactPage = () => {
  return (
    <FooterWrapper>
      <SEOHead
        title="Contact Us | Vibe Mind AI Solutions - Get in Touch"
        description="Contact Vibe Mind AI Solutions for AI development, software modernization, and intelligent automation. Call +91-8921442486 or email us for a consultation."
        keywords={[
          "contact vibe mind ai",
          "ai company contact",
          "ai consultation",
          "ai development inquiry",
          "software development contact kerala",
          "chatbot development quote",
          "ai bot consultation",
          "custom chatbot inquiry",
          "enterprise ai consultation",
          "chatbot pricing",
          "ai assistant quote"
        ]}
        canonicalUrl="/contact"
      />
      <div className="min-h-screen bg-background">
        <UnifiedNavigation />

        {/* Content */}
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
              <AnimatedSection delay={0}>
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Get in Touch</span>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Let's Build Intelligent
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Software Together
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-lg text-muted-foreground">
                  Ready to transform your ideas with AI? We're here to help.
                </p>
              </AnimatedSection>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Left - Callback Form */}
                <AnimatedSection delay={0.3} direction="left">
                  <CallbackRequestForm />
                </AnimatedSection>

                {/* Right - Contact Info Cards */}
                <AnimatedSection delay={0.4} direction="right">
                  <ContactInfoCards />
                </AnimatedSection>
              </div>

              {/* WhatsApp CTA Banner */}
              <AnimatedSection delay={0.5} direction="up">
                <WhatsAppCTABanner />
              </AnimatedSection>
            </div>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default ContactPage;
