import { useState } from "react";
import { Button } from "@/components/ui/button";
import HomeNavigation from "./HomeNavigation";
import ServiceCarousel from "./ServiceCarousel";
import AIChatWindow from "./AIChatWindow";
import ScrollDownButton from "./ScrollDownButton";

const HomePage = () => {
  const [showHeroSection, setShowHeroSection] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HomeNavigation />

      {/* Main Content */}
      <div className="pt-14 sm:pt-16 lg:pt-20">
        {/* Mobile Layout: Chat first, full screen */}
        <div className={`lg:hidden ${!showHeroSection ? 'h-screen overflow-hidden fixed inset-0 pt-14' : ''}`}>
          {/* Chat Section - Full viewport on mobile */}
          <div className={`${!showHeroSection ? 'h-full flex flex-col' : 'min-h-[calc(100vh-3.5rem)]'} container mx-auto px-4 sm:px-6 py-4 sm:py-6`}>
            <div className={`${!showHeroSection ? 'flex-1 overflow-y-auto' : ''}`}>
              <AIChatWindow />
            </div>
          </div>

          {/* Floating scroll button - only show if hero not visible */}
          {!showHeroSection && (
            <ScrollDownButton
              targetId="hero-section"
              className="lg:hidden"
              onReveal={() => setShowHeroSection(true)}
            />
          )}
        </div>

        {/* Hero + Services Section - Separate, shown only when revealed on mobile */}
        {showHeroSection && (
          <div id="hero-section" className="lg:hidden min-h-screen container mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
              {/* Hero Content */}
              <div className="space-y-4 sm:space-y-5">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
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
          </div>
        )}

        {/* Desktop Layout: Two-column grid (unchanged) */}
        <div className="hidden lg:block h-[calc(100vh-5rem)] overflow-hidden">
          <div className="h-full container mx-auto px-8 py-8">
            <div className="h-full grid grid-cols-2 gap-8">
              {/* Left Side - Hero + Services */}
              <div className="flex flex-col justify-center space-y-6 pr-8 border-r border-border/30">
                {/* Hero Content */}
                <div className="space-y-4">
                  <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
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
              <div className="flex flex-col justify-center pl-8">
                <AIChatWindow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
