import { Button } from "@/components/ui/button";
import HomeNavigation from "./HomeNavigation";
import ServiceCarousel from "./ServiceCarousel";
import AIChatWindow from "./AIChatWindow";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavigation />
      
      {/* Main Content */}
      <div className="pt-14 sm:pt-16 lg:pt-20">
        <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Side - Hero + Services */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 pr-0 lg:pr-8 border-r-0 lg:border-r border-border/30">
              {/* Hero Content */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                  AI Solutions to
                  <br />
                  <span className="text-foreground">Empower Your Business</span>
                </h1>
                
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
                  Welcome to VibeMind Solutions — Your partner for cutting-edge AI-powered digital experiences.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm">
                    Discover Our Services
                  </Button>
                  <Button variant="outline" className="rounded-full px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm border-border hover:bg-muted">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Services Carousel */}
              <ServiceCarousel />
            </div>

            {/* Right Side - AI Chat */}
            <div className="flex flex-col justify-center pl-0 lg:pl-8 mt-6 lg:mt-0">
              <AIChatWindow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
