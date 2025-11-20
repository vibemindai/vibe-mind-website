import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Vibe Mind AI transformed our legacy system into a modern, AI-powered platform in record time. Their expertise in AI integration is unmatched.",
      author: "Rajesh Kumar",
      position: "CTO",
      company: "TechCorp India",
      location: "Mumbai, India"
    },
    {
      quote: "The team's Vibe Coding approach delivered a custom AI solution that exceeded our expectations. Fast, efficient, and incredibly innovative.",
      author: "Sarah Al-Mansoori",
      position: "Innovation Director",
      company: "Digital Solutions Qatar",
      location: "Doha, Qatar"
    },
    {
      quote: "Working with Vibe Mind AI was a game-changer. They built an intelligent automation system that reduced our processing time by 70%.",
      author: "Michael Chen",
      position: "VP of Engineering",
      company: "CloudTech Solutions",
      location: "San Francisco, USA"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">Client Success</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by Leaders
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clients Across Countries
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-border hover:border-primary/50 transition-smooth hover:shadow-elegant animate-scale-in bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6 space-y-4">
                <Quote className="w-10 h-10 text-primary/20" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  <div className="text-sm text-primary">{testimonial.company}</div>
                  <div className="text-xs text-muted-foreground mt-1">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Reach */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 sm:px-8 py-4 rounded-full bg-card border border-border shadow-elegant">
            <div>
              <div className="text-2xl font-bold text-primary">🇮🇳</div>
              <div className="text-xs text-muted-foreground mt-1">India</div>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold text-primary">🇶🇦</div>
              <div className="text-xs text-muted-foreground mt-1">Qatar</div>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold text-primary">🇺🇸</div>
              <div className="text-xs text-muted-foreground mt-1">USA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
