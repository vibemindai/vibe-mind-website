import { MessageSquare, Monitor, Settings, BarChart3 } from "lucide-react";

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
];

const ServiceCarousel = () => {
  return (
    <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-border">
      <div className="space-y-4">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className={`p-2.5 rounded-lg ${service.bgColor} flex-shrink-0`}>
              <service.icon className={`w-5 h-5 ${service.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
