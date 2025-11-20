import { ExternalLink, Heart, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Products = () => {
  const products = [
    {
      icon: Heart,
      name: "JyotAI.in",
      tagline: "AI-Powered Spiritual Insights",
      description: "Personalized spiritual guidance platform combining ancient wisdom with modern AI technology. Get insights, predictions, and personalized recommendations based on Vedic astrology and AI analysis.",
      features: ["Vedic AI Integration", "Personalized Readings", "Daily Insights"],
      // link: "https://jyotai.in",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Users,
      name: "Community App",
      tagline: "Intelligent Social Collaboration",
      description: "Next-generation community platform fostering digital collaboration with AI-driven engagement models. Smart content curation, intelligent matching, and automated community management.",
      features: ["AI-Driven Engagement", "Smart Matching", "Automated Moderation"],
      link: "#",
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section id="products" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">Our Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Innovation in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Flagship products showcasing the power of AI-first development and Vibe Coding philosophy
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="border-border hover:border-primary/50 transition-smooth hover:shadow-elegant group animate-scale-in overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${product.gradient}`} />
              
              <CardHeader className="pt-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                  <product.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-base font-medium text-primary">
                  {product.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {product.link !== "#" && (
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary/10 transition-smooth"
                    asChild
                  >
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
