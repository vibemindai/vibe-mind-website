// UCP Profile Types (mirrors UCP spec)

export interface UCPService {
  transport: "rest" | "mcp" | "a2a" | "embedded";
  endpoint?: string;
  schema?: string;
}

export interface UCPCapability {
  version?: string;
  spec?: string;
  schema?: string;
  extends?: string;
}

export interface UCPPaymentHandler {
  id: string;
  version?: string;
  spec?: string;
  schema?: string;
  config?: Record<string, unknown>;
}

export interface UCPSigningKey {
  kid: string;
  kty: string;
  crv?: string;
  x?: string;
  y?: string;
  [key: string]: unknown;
}

export interface UCPMetadata {
  version: string;
  services?: Record<string, UCPService>;
  capabilities?: Record<string, UCPCapability>;
  payment_handlers?: Record<string, UCPPaymentHandler>;
}

export interface UCPProfile {
  ucp: UCPMetadata;
  signing_keys?: UCPSigningKey[];
}

// Validation result types

export type CheckStatus = "pass" | "fail" | "warn" | "info";

export type OverallStatus = "detected" | "partial" | "not_detected";

export interface ValidationCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail?: string;
  group: string;
}

export interface ValidationResult {
  overall: OverallStatus;
  checks: ValidationCheck[];
  passCount: number;
  failCount: number;
  warnCount: number;
  totalChecks: number;
  rawJson?: string;
}
