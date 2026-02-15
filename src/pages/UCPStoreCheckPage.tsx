import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";
import { SEOHead } from "@/components/seo";
import UCPStoreCheckForm from "@/components/ucp/UCPStoreCheckForm";
import UCPValidationResults from "@/components/ucp/UCPValidationResults";
import UCPInfoSection from "@/components/ucp/UCPInfoSection";
import { useUCPCheck } from "@/hooks/useUCPCheck";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { UCP_SPEC_DATE } from "@/lib/ucp/ucpSchema";

const UCPStoreCheckPage = () => {
  const { loading, result, error, checkJson, checkUrl } = useUCPCheck();
  const { toast } = useToast();

  const handleCheckUrl = async (url: string) => {
    try {
      await checkUrl(url);
    } catch {
      toast({
        title: "Check failed",
        description: "Could not reach the store. Please verify the URL and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <FooterWrapper>
      <SEOHead
        title="UCP Store Check | Vibe Mind AI Solutions - Validate Your UCP Profile"
        description="Check if your ecommerce store has a valid UCP (Universal Commerce Protocol) profile. Validate your /.well-known/ucp file for AI-driven commerce compatibility."
        keywords={[
          "ucp store check",
          "universal commerce protocol",
          "ucp validator",
          "ucp profile check",
          "ai commerce",
          "well-known ucp",
          "ecommerce ai",
          "ucp validation tool",
          "google ucp",
          "ai shopping agent",
        ]}
        canonicalUrl="/tools/ucp-store-check"
      />
      <div className="min-h-screen bg-background">
        <UnifiedNavigation />

        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
              <AnimatedSection delay={0}>
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Free Tool</span>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-bold">
                  UCP Store
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Check
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-lg text-muted-foreground">
                  Validate your store's UCP profile for AI-driven commerce compatibility. Check a
                  live URL or paste your JSON to verify compliance.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on UCP Draft Spec — {UCP_SPEC_DATE}
                </p>
              </AnimatedSection>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Form */}
              <AnimatedSection delay={0.3} direction="up">
                <UCPStoreCheckForm
                  onCheckUrl={handleCheckUrl}
                  onCheckJson={checkJson}
                  loading={loading}
                />
              </AnimatedSection>

              {/* Error Display */}
              {error && (
                <AnimatedSection delay={0} direction="up">
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-500">Check Failed</p>
                      <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Results */}
              {result && (
                <AnimatedSection delay={0.1} direction="up">
                  <UCPValidationResults result={result} />
                </AnimatedSection>
              )}

              {/* Info Section */}
              <AnimatedSection delay={0.4} direction="up">
                <UCPInfoSection />
              </AnimatedSection>
            </div>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default UCPStoreCheckPage;
