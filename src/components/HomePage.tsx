import { Button } from "@/components/ui/button";
import HomeNavigation from "./HomeNavigation";
import ServiceCarousel from "./ServiceCarousel";
import AIChatWindow from "./AIChatWindow";

const HomePage = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <HomeNavigation />
      
      {/* Main Content */}
      <div className="h-full pt-16 lg:pt-20">
        <div className="h-full container mx-auto px-4 lg:px-8 py-8">
          <div className="h-full grid lg:grid-cols-2 gap-8">
            {/* Left Side - Hero + Services */}
            <div className="flex flex-col justify-center space-y-8 pr-0 lg:pr-8 border-r-0 lg:border-r border-border/30">
              {/* Hero Content */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  AI Solutions to
                  <br />
                  <span className="text-foreground">Empower Your Business</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-lg">
                  Welcome to VibeMind Solutions — Your partner for cutting-edge AI-powered digital experiences.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base">
                    Discover Our Services
                  </Button>
                  <Button variant="outline" className="rounded-full px-8 py-6 text-base border-border hover:bg-muted">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Services Carousel */}
              <ServiceCarousel />
            </div>

            {/* Right Side - AI Chat */}
            <div className="flex flex-col justify-center pl-0 lg:pl-8">
              <AIChatWindow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
