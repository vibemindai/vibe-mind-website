import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const Contact = () => {

  return (
    <section 
      id="contact" 
      className="py-24 bg-background"
      aria-label="Contact Vibe Mind AI - Get in touch with the best AI company in Kerala"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Let's Build Intelligent
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Software Together
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your ideas with AI? We're here to help.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Contact Info */}
          <div className="space-y-6 animate-scale-in">
            <Card className="border-border shadow-elegant">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <a 
                    href="mailto:info@vibemindsolutions.ai" 
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-smooth cursor-pointer"
                    aria-label="Email Vibe Mind AI Solutions"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                  </a>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a 
                      href="mailto:info@vibemindsolutions.ai" 
                      className="text-muted-foreground hover:text-primary transition-smooth"
                      aria-label="Send email to info@vibemindsolutions.ai"
                    >
                      info@vibemindsolutions.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <a 
                    href="tel:+918281442486" 
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-smooth cursor-pointer"
                    aria-label="Call Vibe Mind AI Solutions"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </a>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <a 
                        href="tel:+918281442486" 
                        className="hover:text-primary transition-smooth"
                        aria-label="Call our India office at +91 82 81 442 486"
                      >
                        India: +91 82 81 442 486
                      </a>
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Locations</h3>
                    <div className="space-y-1 text-muted-foreground text-sm">
                      <div>Mumbai, India</div>
                      <div>Doha, Qatar</div>
                      <div>San Francisco, USA</div>
                    </div>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            <Card className="border-border shadow-elegant bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                  Quick Response
                </h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
