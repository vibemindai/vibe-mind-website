import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UCPCheckItem from "./UCPCheckItem";
import UCPProfileViewer from "./UCPProfileViewer";
import type { ValidationResult } from "@/lib/ucp/ucpTypes";
import { UCP_SPEC_DATE } from "@/lib/ucp/ucpSchema";

const statusBanner = {
  detected: {
    icon: CheckCircle2,
    label: "UCP Detected",
    color: "text-green-500",
    bg: "bg-green-500/10 border-green-500/30",
    bar: "bg-green-500",
  },
  partial: {
    icon: AlertTriangle,
    label: "Partial UCP Profile",
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/30",
    bar: "bg-amber-500",
  },
  not_detected: {
    icon: XCircle,
    label: "UCP Not Detected",
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/30",
    bar: "bg-red-500",
  },
};

interface UCPValidationResultsProps {
  result: ValidationResult;
}

const UCPValidationResults = ({ result }: UCPValidationResultsProps) => {
  const banner = statusBanner[result.overall];
  const Icon = banner.icon;
  const pct =
    result.totalChecks > 0 ? Math.round((result.passCount / result.totalChecks) * 100) : 0;

  // Group checks by their group field
  const groups = result.checks.reduce<Record<string, typeof result.checks>>((acc, check) => {
    if (!acc[check.group]) acc[check.group] = [];
    acc[check.group].push(check);
    return acc;
  }, {});

  const groupOrder = [
    "Profile Structure",
    "Version & Compliance",
    "Services",
    "Capabilities",
    "Payment Handlers",
    "Capability Registry",
    "Checkout",
    "Identity Linking",
    "Order",
    "Fulfillment",
    "Discount",
    "AP2 Mandates",
    "Buyer Consent",
    "Cross-Section",
    "Signing Keys",
    "Security & Governance",
  ];

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`rounded-xl border p-4 md:p-6 ${banner.bg}`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`w-8 h-8 ${banner.color}`} />
          <div>
            <h3 className={`text-xl font-bold ${banner.color}`}>{banner.label}</h3>
            <p className="text-sm text-muted-foreground">
              {result.passCount}/{result.totalChecks} checks passed
              {result.warnCount > 0 &&
                ` (${result.warnCount} warning${result.warnCount > 1 ? "s" : ""})`}
            </p>
          </div>
        </div>
        <Progress value={pct} className="h-2" />

        {/* Format badge */}
        {result.detectedFormat && (
          <div className="flex items-center gap-2 mt-3">
            {result.detectedFormat === "legacy" ? (
              <div className="flex items-center gap-1.5 text-xs text-amber-500">
                <Info className="w-3.5 h-3.5" />
                <span>Legacy format detected — consider updating to the {UCP_SPEC_DATE} spec</span>
              </div>
            ) : (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Spec: {UCP_SPEC_DATE}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Grouped Checks */}
      <div className="glass-strong rounded-2xl p-4 md:p-6">
        <Accordion type="multiple" defaultValue={groupOrder}>
          {groupOrder.map((groupName) => {
            const checksInGroup = groups[groupName];
            if (!checksInGroup || checksInGroup.length === 0) return null;

            const groupFails = checksInGroup.filter((c) => c.status === "fail").length;
            const groupWarns = checksInGroup.filter((c) => c.status === "warn").length;

            return (
              <AccordionItem key={groupName} value={groupName}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{groupName}</span>
                    {groupFails > 0 && (
                      <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                        {groupFails} fail{groupFails > 1 ? "s" : ""}
                      </span>
                    )}
                    {groupWarns > 0 && (
                      <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                        {groupWarns} warn{groupWarns > 1 ? "s" : ""}
                      </span>
                    )}
                    {groupFails === 0 && groupWarns === 0 && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="divide-y divide-border/50">
                    {checksInGroup.map((c) => (
                      <UCPCheckItem key={c.id} check={c} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Raw JSON Viewer */}
      {result.rawJson && <UCPProfileViewer json={result.rawJson} />}
    </div>
  );
};

export default UCPValidationResults;
