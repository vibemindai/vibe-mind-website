import { useState } from "react";
import { Send, MessageCircle, Briefcase, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedQuestions = [
  { icon: MessageCircle, text: "Who are VibeMind Solutions?", color: "text-emerald-500" },
  { icon: Briefcase, text: "What services do you offer?", color: "text-amber-500" },
  { icon: MapPin, text: "Where is your company located?", color: "text-red-500" },
  { icon: Sparkles, text: "Why choose VibeMind Solutions?", color: "text-yellow-500" },
];

const AIChatWindow = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-full max-h-[600px] lg:max-h-none">
      {/* AI Greeting Bubble */}
      <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-border mb-3 sm:mb-4 max-w-xs sm:max-w-sm ml-auto">
        <p className="text-xs sm:text-sm text-foreground">
          Hi there! I'm the VibeMind AI Assistant. I can answer any questions you have about our company.
        </p>
      </div>

      {/* Robot Illustration Area - Hidden on mobile, visible on tablet+ */}
      <div className="hidden sm:flex flex-1 items-center justify-center relative min-h-[200px] lg:min-h-[250px]">
        {/* Decorative Elements */}
        <div className="absolute top-2 lg:top-4 right-4 lg:right-8 w-8 lg:w-10 h-8 lg:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
          <div className="w-4 lg:w-6 h-4 lg:h-6 text-yellow-500">💡</div>
        </div>
        <div className="absolute top-8 lg:top-12 left-4 lg:left-8 w-6 lg:w-8 h-6 lg:h-8 bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-3 lg:w-5 h-3 lg:h-5 bg-primary rounded-full" />
        </div>
        <div className="absolute bottom-16 lg:bottom-24 left-8 lg:left-12 w-4 lg:w-6 h-4 lg:h-6 bg-primary/20 rounded-full" />

        {/* Robot Character */}
        <div className="relative">
          {/* Charts Background */}
          <div className="absolute -left-12 lg:-left-16 -top-6 lg:-top-8 w-18 lg:w-24 h-14 lg:h-20 bg-card rounded-lg lg:rounded-xl shadow-lg border border-border p-2 lg:p-3">
            <div className="flex items-end gap-0.5 lg:gap-1 h-full">
              <div className="w-1.5 lg:w-2 bg-primary/60 rounded-t h-1/3" />
              <div className="w-1.5 lg:w-2 bg-primary/60 rounded-t h-2/3" />
              <div className="w-1.5 lg:w-2 bg-primary rounded-t h-full" />
              <div className="w-1.5 lg:w-2 bg-primary/60 rounded-t h-1/2" />
            </div>
          </div>

          {/* Globe */}
          <div className="absolute -left-6 lg:-left-8 top-2 lg:top-4 w-7 lg:w-10 h-7 lg:h-10 rounded-full bg-gradient-to-br from-primary to-accent opacity-60" />

          {/* Robot Body */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <div className="w-22 h-22 sm:w-26 sm:h-26 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
              {/* Robot Face */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-card rounded-full shadow-lg flex items-center justify-center relative border-2 lg:border-4 border-primary/20">
                {/* Headphones */}
                <div className="absolute -left-2 lg:-left-3 top-1/2 -translate-y-1/2 w-2.5 lg:w-4 h-5 lg:h-8 bg-primary rounded-full" />
                <div className="absolute -right-2 lg:-right-3 top-1/2 -translate-y-1/2 w-2.5 lg:w-4 h-5 lg:h-8 bg-primary rounded-full" />
                <div className="absolute -top-1 lg:-top-2 left-1/2 -translate-x-1/2 w-14 lg:w-20 h-2 lg:h-3 bg-primary rounded-full" />
                
                {/* Face */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-2 lg:gap-3 mb-1 lg:mb-2">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full animate-pulse" />
                  </div>
                  <div className="w-4 lg:w-6 h-2 lg:h-3 bg-primary/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Bubble */}
          <div className="absolute -right-8 lg:-right-12 top-0 w-6 lg:w-8 h-6 lg:h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 text-primary" />
          </div>

          {/* Target Icon */}
          <div className="absolute -left-2 lg:-left-4 bottom-2 lg:bottom-4 w-8 lg:w-12 h-8 lg:h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 lg:w-6 h-4 lg:h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-amber-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            className="flex items-center gap-2 sm:gap-3 w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-card hover:bg-muted/50 transition-colors text-left border border-border/50"
          >
            <question.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${question.color} flex-shrink-0`} />
            <span className="text-xs sm:text-sm text-foreground truncate">{question.text}</span>
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-card rounded-full p-1.5 sm:p-2 shadow-lg border border-border">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm"
        />
        <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 w-8 h-8 sm:w-10 sm:h-10">
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIChatWindow;
