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
    <div className="h-full flex flex-col">
      {/* AI Greeting Bubble */}
      <div className="bg-background rounded-2xl p-4 shadow-lg border border-border mb-4 max-w-sm ml-auto">
        <p className="text-sm text-foreground">
          Hi there! I'm the VibeMind AI Assistant. I can answer any questions you have about our company.
        </p>
      </div>

      {/* Robot Illustration Area */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Decorative Elements */}
        <div className="absolute top-4 right-8 w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 text-yellow-500">💡</div>
        </div>
        <div className="absolute top-12 left-8 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-5 h-5 bg-primary rounded-full" />
        </div>
        <div className="absolute bottom-24 left-12 w-6 h-6 bg-primary/20 rounded-full" />

        {/* Robot Character */}
        <div className="relative">
          {/* Charts Background */}
          <div className="absolute -left-16 -top-8 w-24 h-20 bg-background/80 rounded-xl shadow-lg border border-border p-3">
            <div className="flex items-end gap-1 h-full">
              <div className="w-2 bg-primary/60 rounded-t h-1/3" />
              <div className="w-2 bg-primary/60 rounded-t h-2/3" />
              <div className="w-2 bg-primary rounded-t h-full" />
              <div className="w-2 bg-primary/60 rounded-t h-1/2" />
            </div>
          </div>

          {/* Globe */}
          <div className="absolute -left-8 top-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent opacity-60" />

          {/* Robot Body */}
          <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
              {/* Robot Face */}
              <div className="w-24 h-24 bg-background rounded-full shadow-lg flex items-center justify-center relative border-4 border-primary/20">
                {/* Headphones */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-8 bg-primary rounded-full" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-8 bg-primary rounded-full" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-primary rounded-full" />
                
                {/* Face */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-3 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </div>
                  <div className="w-6 h-3 bg-primary/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Bubble */}
          <div className="absolute -right-12 top-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>

          {/* Target Icon */}
          <div className="absolute -left-4 bottom-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2 mb-4">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            className="flex items-center gap-3 w-full p-3 rounded-xl bg-background hover:bg-muted/50 transition-colors text-left border border-border/50"
          >
            <question.icon className={`w-5 h-5 ${question.color}`} />
            <span className="text-sm text-foreground">{question.text}</span>
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2 bg-background rounded-full p-2 shadow-lg border border-border">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 w-10 h-10">
          <Send className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 text-primary">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIChatWindow;
