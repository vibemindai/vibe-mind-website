import { Link } from "react-router-dom";
import { ArrowLeft, Code2, RefreshCw, Sparkles, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesPage = () => {
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
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Transforming Ideas into
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Intelligent Solutions
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive AI-driven services to modernize, automate, and accelerate your digital transformation
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="border-border hover:border-primary/50 transition-all hover:shadow-xl group bg-background/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
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
      </main>
    </div>
  );
};

export default ServicesPage;
