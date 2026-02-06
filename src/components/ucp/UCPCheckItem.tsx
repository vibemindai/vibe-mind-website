import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import type { ValidationCheck } from "@/lib/ucp/ucpTypes";

const statusConfig = {
  pass: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  fail: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
  warn: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
};

interface UCPCheckItemProps {
  check: ValidationCheck;
}

const UCPCheckItem = ({ check }: UCPCheckItemProps) => {
  const config = statusConfig[check.status];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 py-2">
      <div className={`mt-0.5 rounded-full p-1 ${config.bg}`}>
        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{check.label}</p>
        {check.detail && (
          <p className="text-xs text-muted-foreground mt-0.5 break-words">{check.detail}</p>
        )}
      </div>
    </div>
  );
};

export default UCPCheckItem;
