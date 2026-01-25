import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-background" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                VibeMind <span className="text-muted-foreground font-normal">Solutions</span>
              </span>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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

          <div className="max-w-md mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <AnimatedSection delay={0.3} direction="up">
                <Card className="border-border shadow-xl">
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <a 
                        href="mailto:info@vibemindsolutions.ai" 
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Mail className="w-5 h-5 text-primary" />
                      </a>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a 
                          href="mailto:info@vibemindsolutions.ai" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          info@vibemindsolutions.ai
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <a 
                        href="tel:+918281442486" 
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Phone className="w-5 h-5 text-primary" />
                      </a>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <a 
                            href="tel:+918281442486" 
                            className="hover:text-primary transition-colors block"
                          >
                            India: +91 82 81 442 486
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4} direction="up">
                <Card className="border-border shadow-xl bg-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Quick Response
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
