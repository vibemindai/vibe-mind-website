import { useNavigate, useLocation } from "react-router-dom";
import { capabilities } from "@/data/aiCapabilities";
import CapabilityBubble from "./CapabilityBubble";

const JugglingCapabilities = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCapabilityClick = (title: string) => {
    // Navigate with chat param to trigger global chat modal
    const params = new URLSearchParams(location.search);
    params.set("chat", title);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-4">
        {capabilities.map((capability, index) => (
          <CapabilityBubble
            key={`${capability.title}-${index}`}
            capability={capability}
            index={index}
            onClick={handleCapabilityClick}
          />
        ))}
      </div>
    </div>
  );
};

export default JugglingCapabilities;
