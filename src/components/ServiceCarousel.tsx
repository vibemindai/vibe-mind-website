import { useState } from "react";
import { MessageSquare, Monitor, Settings, BarChart3, Brain, Zap, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Chatbot Development",
    description: "We develop advanced AI-powered chatbot solutions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Monitor,
    title: "Interactive Tech Solutions",
    description: "Immersive AI-tech for engaging events & digital platforms.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Settings,
    title: "Custom AI Integration",
    description: "Seamless AI solutions tailored to your needs.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Unlock actionable insights through AI-driven data analysis.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Brain,
    title: "LLM Solutions",
    description: "Custom large language model integrations & fine-tuning.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Streamline workflows with intelligent automation systems.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const ITEMS_PER_SLIDE = 4;

const ServiceCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(services.length / ITEMS_PER_SLIDE);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentServices = services.slice(
    currentSlide * ITEMS_PER_SLIDE,
    (currentSlide + 1) * ITEMS_PER_SLIDE
  );

  return (
    <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 shadow-elegant border border-border">
      <div className="space-y-2">
        {currentServices.map((service, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className={`p-2 rounded-lg ${service.bgColor} flex-shrink-0`}>
              <service.icon className={`w-4 h-4 ${service.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Carousel Navigation */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <button 
          onClick={prevSlide}
          className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex gap-1.5">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide}
          className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCarousel;
