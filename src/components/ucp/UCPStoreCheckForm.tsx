import { useState, useRef } from "react";
import { Globe, Code, Upload, Loader2, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_UCP_PROFILE } from "@/lib/ucp/ucpSchema";

interface UCPStoreCheckFormProps {
  onCheckUrl: (url: string) => Promise<void>;
  onCheckJson: (json: string) => void;
  loading: boolean;
}

const UCPStoreCheckForm = ({ onCheckUrl, onCheckJson, loading }: UCPStoreCheckFormProps) => {
  const [url, setUrl] = useState("");
  const [jsonText, setJsonText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    try {
      new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid store URL.",
        variant: "destructive",
      });
      return;
    }

    await onCheckUrl(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  };

  const handleJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonText.trim()) return;
    onCheckJson(jsonText.trim());
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Max file size is 1MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setJsonText(text);
    };
    reader.readAsText(file);

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleTryExample = () => {
    const exampleJson = JSON.stringify(SAMPLE_UCP_PROFILE, null, 2);
    setJsonText(exampleJson);
    onCheckJson(exampleJson);
  };

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <Tabs defaultValue="url">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="url" className="gap-2">
            <Globe className="w-4 h-4" />
            Check URL
          </TabsTrigger>
          <TabsTrigger value="json" className="gap-2">
            <Code className="w-4 h-4" />
            Validate JSON
          </TabsTrigger>
        </TabsList>

        {/* Check URL Tab */}
        <TabsContent value="url">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Store URL</label>
              <Input
                type="text"
                placeholder="https://store.example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                We'll fetch{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">/.well-known/ucp</code> from
                this domain
              </p>
            </div>
            <Button
              type="submit"
              disabled={!url.trim() || loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground tactile-button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Globe className="w-4 h-4 mr-2" />
              )}
              {loading ? "Checking..." : "Check Store"}
            </Button>
          </form>
        </TabsContent>

        {/* Validate JSON Tab */}
        <TabsContent value="json">
          <form onSubmit={handleJsonSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                UCP Profile JSON
              </label>
              <Textarea
                placeholder='{"ucp": {"version": "2025-01-01", ...}}'
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                disabled={loading}
                className="min-h-[200px] font-mono text-xs leading-relaxed"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!jsonText.trim() || loading}
                className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground tactile-button"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Code className="w-4 h-4 mr-2" />
                )}
                Validate
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="h-11"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleTryExample}
                disabled={loading}
                className="h-11"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Try Example
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UCPStoreCheckForm;
