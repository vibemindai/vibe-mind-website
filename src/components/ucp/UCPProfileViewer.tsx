import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UCPProfileViewerProps {
  json: string;
}

const UCPProfileViewer = ({ json }: UCPProfileViewerProps) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for insecure contexts
    }
  };

  return (
    <div className="glass-strong rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 md:px-6 py-3 hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">Raw JSON</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="relative border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span className="ml-1.5 text-xs">{copied ? "Copied" : "Copy"}</span>
          </Button>
          <pre className="p-4 md:p-6 overflow-x-auto text-xs leading-relaxed text-muted-foreground max-h-96">
            <code>{json}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default UCPProfileViewer;
