import { useState, useCallback } from "react";
import HomeNavigation from "./HomeNavigation";
import ServicesList from "./ServicesList";
import AIChatWindow from "./AIChatWindow";
import MobileLanding from "./MobileLanding";
import FooterWrapper from "./FooterWrapper";

const HomePage = () => {
  const [isMobileChatExpanded, setIsMobileChatExpanded] = useState(false);
  const [desktopPrompt, setDesktopPrompt] = useState<string | undefined>();

  const handleLogoClick = () => {
    if (isMobileChatExpanded) {
      setIsMobileChatExpanded(false);
    }
  };

  const handleDesktopChatTrigger = useCallback((prompt: string) => {
    setDesktopPrompt(prompt);
  }, []);

  const handleDesktopPromptConsumed = useCallback(() => {
    setDesktopPrompt(undefined);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HomeNavigation onLogoClick={handleLogoClick} isMobileChatExpanded={isMobileChatExpanded} />

      {/* Main Content */}
      <div className="pt-14 sm:pt-16 lg:pt-20">
        {/* Mobile/Tablet Layout: Two-screen experience with footer */}
        <div className="lg:hidden">
          {isMobileChatExpanded ? (
            // Expanded chat - no footer, full screen experience
            <MobileLanding
              isExpanded={isMobileChatExpanded}
              setIsExpanded={setIsMobileChatExpanded}
            />
          ) : (
            // Landing state - wrap with footer
            <FooterWrapper>
              <MobileLanding
                isExpanded={isMobileChatExpanded}
                setIsExpanded={setIsMobileChatExpanded}
              />
            </FooterWrapper>
          )}
        </div>

        {/* Desktop Layout: Two-column grid */}
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
                </div>

                {/* Services List */}
                <ServicesList onChatTrigger={handleDesktopChatTrigger} />
              </div>

              {/* Right Side - AI Chat */}
              <div className="flex flex-col justify-center pl-8">
                <AIChatWindow
                  initialPrompt={desktopPrompt}
                  onPromptConsumed={handleDesktopPromptConsumed}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
