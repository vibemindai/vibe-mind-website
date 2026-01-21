import { Button } from "@/components/ui/button";
import HomeNavigation from "./HomeNavigation";
import ServiceCarousel from "./ServiceCarousel";
import AIChatWindow from "./AIChatWindow";

const HomePage = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <HomeNavigation />
      
      {/* Main Content */}
      <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] pt-16 lg:pt-20">
        <div className="h-full container mx-auto px-4 lg:px-8 py-4 lg:py-6">
          <div className="h-full grid lg:grid-cols-2 gap-6">
            {/* Left Side - Hero + Services */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6 pr-0 lg:pr-8 border-r-0 lg:border-r border-border/30 overflow-hidden">
              {/* Hero Content */}
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                  AI Solutions to
                  <br />
                  <span className="text-foreground">Empower Your Business</span>
                </h1>
                
                <p className="text-base text-muted-foreground max-w-lg">
                  Welcome to VibeMind Solutions — Your partner for cutting-edge AI-powered digital experiences.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-5 text-sm">
                    Discover Our Services
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-5 text-sm border-border hover:bg-muted">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Services Carousel */}
              <ServiceCarousel />
            </div>

            {/* Right Side - AI Chat */}
            <div className="flex flex-col justify-center pl-0 lg:pl-8 overflow-hidden">
              <AIChatWindow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
