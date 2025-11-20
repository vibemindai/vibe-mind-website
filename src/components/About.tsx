import { Brain, Zap, Target } from "lucide-react";
import aiBrain from "@/assets/ai-brain.jpg";

const About = () => {
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
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              Welcome to the Era of
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vibe Coding
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              At <span className="text-foreground font-semibold">Vibe Mind AI Solutions</span>, we don't just build software—we orchestrate 
              a symphony of AI and human creativity. Our philosophy, <span className="text-primary font-semibold">"Vibe Coding,"</span> represents 
              a revolutionary approach where intelligent automation and innovative thinking converge.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              From legacy system modernization to cutting-edge AI solutions, we serve clients across 
              <span className="text-foreground font-semibold"> India, Qatar, and the United States</span>, delivering 
              transformative digital experiences that drive real business value.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-smooth hover:shadow-glow group"
                >
                  <value.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm mb-2">{value.title}</h3>
                  <p className="text-xs text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-scale-in mt-8 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={aiBrain} 
                alt="AI Technology" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-card border border-border rounded-xl p-4 sm:p-6 shadow-elegant backdrop-blur-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">4+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">AI Models</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
