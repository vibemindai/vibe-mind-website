import { MessageCircle, Lightbulb, FileText, Users } from "lucide-react";

interface OrbitIconProps {
  Icon: typeof MessageCircle;
  color: string;
  bgColor: string;
}

const OrbitIcon = ({ Icon, color, bgColor }: OrbitIconProps) => {
  return (
    <div className="orbit-icon">
      <div
        className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full ${bgColor} flex items-center justify-center shadow-lg border border-white/20`}
      >
        <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 ${color}`} />
      </div>
    </div>
  );
};

// SVG Orbit Path (no arrows, tilted for 3D effect)
const OrbitPath = () => {
  const rx = 120;
  const ry = 65;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="-140 -80 280 160"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Gradient for the orbit path */}
        <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
        </linearGradient>
      </defs>

      {/* Main orbit ellipse - visible path with tilt for 3D perspective */}
      <ellipse
        cx="0"
        cy="0"
        rx={rx}
        ry={ry}
        fill="none"
        stroke="url(#orbitGradient)"
        strokeWidth="2"
        strokeDasharray="8 4"
        className="opacity-80"
        style={{ transform: "rotate(-15deg)", transformOrigin: "center" }}
      />
    </svg>
  );
};

// Data particles component
const DataParticles = () => {
  const particles = [
    { top: "15%", left: "20%", delay: "0s", size: "w-1 h-1" },
    { top: "25%", right: "15%", delay: "0.5s", size: "w-1.5 h-1.5" },
    { top: "70%", left: "15%", delay: "1s", size: "w-1 h-1" },
    { top: "75%", right: "20%", delay: "1.5s", size: "w-1 h-1" },
    { top: "45%", left: "8%", delay: "2s", size: "w-0.5 h-0.5" },
    { top: "50%", right: "10%", delay: "2.5s", size: "w-1 h-1" },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`data-particle ${p.size}`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
};

// Antenna with signal waves
const Antenna = () => {
  return (
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* Antenna stick */}
      <div className="w-0.5 h-2 sm:h-2.5 lg:h-3 bg-gradient-to-t from-primary to-primary/50 rounded-full" />
      {/* Antenna tip with glow */}
      <div className="relative">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
        {/* Signal waves */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="antenna-wave" style={{ animationDelay: "0s" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="antenna-wave" style={{ animationDelay: "0.7s" }} />
        </div>
      </div>
    </div>
  );
};

const OrbitRobotIllustration = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Container with responsive sizes */}
      <div className="w-40 h-40 sm:w-[200px] sm:h-[200px] lg:w-64 lg:h-64 relative">
        {/* Data particles floating around */}
        <DataParticles />

        {/* Visible orbit path */}
        <div className="absolute inset-0 flex items-center justify-center">
          <OrbitPath />
        </div>

        {/* Orbiting icons - rotate container to match tilted orbit path */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "rotate(-15deg)" }}
        >
          <div className="orbit-path-container w-full h-full">
            <OrbitIcon Icon={MessageCircle} color="text-primary" bgColor="bg-primary/20" />
            <OrbitIcon Icon={Lightbulb} color="text-yellow-500" bgColor="bg-yellow-500/20" />
            <OrbitIcon Icon={FileText} color="text-emerald-500" bgColor="bg-emerald-500/20" />
            <OrbitIcon Icon={Users} color="text-purple-500" bgColor="bg-purple-500/20" />
          </div>
        </div>

        {/* Central robot face */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Neural glow background */}
          <div className="neural-glow w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />

          {/* Outer glow ring with holographic effect */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center animate-pulse-soft holographic">
            {/* Inner face */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg glow-primary relative">
              {/* Face container */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-card flex flex-col items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 border-2 border-primary/30 relative overflow-hidden">
                {/* Antenna */}
                <Antenna />

                {/* Scanning line effect */}
                <div className="scan-line" />

                {/* Eyes with enhanced glow */}
                <div className="flex gap-1.5 sm:gap-2 lg:gap-3 relative z-10">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-primary rounded-full eye-thinking" />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-primary rounded-full eye-thinking"
                    style={{ animationDelay: "0.1s" }}
                  />
                </div>

                {/* Mouth bar with animated glow */}
                <div className="w-3 h-1 sm:w-4 sm:h-1.5 lg:w-5 lg:h-2 bg-primary/50 rounded-full relative z-10">
                  <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements (stars) with enhanced animation */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-primary/40 rounded-full animate-dot-pulse" />
        <div
          className="absolute bottom-4 left-2 sm:bottom-5 sm:left-3 lg:bottom-6 lg:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-accent/40 rounded-full animate-dot-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/4 left-1 sm:left-2 lg:left-3 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-yellow-400/40 rounded-full animate-dot-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
};

export default OrbitRobotIllustration;
