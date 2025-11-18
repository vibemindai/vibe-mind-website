import { Code2, RefreshCw, Sparkles, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: "AI-Enabled Software Development",
      description: "Build and deploy modern applications using cutting-edge AI models and automation tools.",
      features: [
        "AI-driven code generation",
        "Smart workflow automation",
        "Predictive analytics integration",
        "Intelligent testing & deployment"
      ]
    },
    {
      icon: RefreshCw,
      title: "Legacy System Modernization",
      description: "Transform outdated systems into high-performance, future-ready platforms.",
      features: [
        "Rewrite with modern frameworks",
        "Monolith to microservices migration",
        "AI-assisted refactoring",
        "Fast turnaround delivery"
      ]
    },
    {
      icon: Sparkles,
      title: "Custom AI Solutions",
      description: "Tailor-made AI platforms and products designed for your business goals.",
      features: [
        "Chatbots & recommendation engines",
        "Custom LLM integrations & fine-tuning",
        "Computer vision & NLP applications",
        "Predictive analytics dashboards",
        "AI-powered automation"
      ]
    },
    {
      icon: Wrench,
      title: "AI SDKs & Developer Tools",
      description: "In-house frameworks empowering faster, smarter, and cleaner builds.",
      features: [
        "Vibe SDK - AI integration toolkit",
        "CodeMind Engine - AI development env",
        "Custom AI libraries",
        "Developer acceleration tools"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Transforming Ideas into
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Intelligent Solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive AI-driven services to modernize, automate, and accelerate your digital transformation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="border-border hover:border-primary/50 transition-smooth hover:shadow-glow group animate-scale-in bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth group-hover:scale-110">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
