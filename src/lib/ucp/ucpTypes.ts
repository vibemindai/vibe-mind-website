// UCP Profile Types — updated for Draft Spec 2026-02-16

// ── Format versioning ────────────────────────────────────────────────
export type UCPFormatVersion = "legacy" | "2026-02-16";

// ── Known UCP capabilities & extensions ──────────────────────────────

/** Core capabilities defined in the UCP spec */
export const UCP_CORE_CAPABILITIES = [
  "dev.ucp.shopping.checkout",
  "dev.ucp.shopping.identity_linking",
  "dev.ucp.shopping.order",
] as const;

/** Extensions defined in the UCP spec (all extend checkout) */
export const UCP_EXTENSIONS = [
  "dev.ucp.shopping.fulfillment",
  "dev.ucp.shopping.discount",
  "dev.ucp.shopping.ap2_mandate",
  "dev.ucp.shopping.buyer_consent",
] as const;

/** Maps each extension to its required parent capability */
export const UCP_EXTENSION_PARENTS: Record<string, string> = {
  "dev.ucp.shopping.fulfillment": "dev.ucp.shopping.checkout",
  "dev.ucp.shopping.discount": "dev.ucp.shopping.checkout",
  "dev.ucp.shopping.ap2_mandate": "dev.ucp.shopping.checkout",
  "dev.ucp.shopping.buyer_consent": "dev.ucp.shopping.checkout",
};

/** All known UCP capability/extension names */
export const UCP_ALL_KNOWN = [...UCP_CORE_CAPABILITIES, ...UCP_EXTENSIONS] as const;

/** Approved EC curves for signing keys */
export const UCP_APPROVED_CURVES = ["P-256", "P-384", "P-521"] as const;

// ── Transport sub-interfaces (new format) ────────────────────────────
export interface UCPRestTransport {
  endpoint: string;
  schema?: string;
}

export interface UCPMcpTransport {
  endpoint: string;
  schema?: string;
}

export interface UCPA2ATransport {
  agent_card?: string;
  schema?: string;
}

export interface UCPEmbeddedTransport {
  runtime?: string;
  schema?: string;
}

// ── New-format entry types ───────────────────────────────────────────
export interface UCPServiceEntry {
  version: string;
  spec: string;
  rest?: UCPRestTransport;
  mcp?: UCPMcpTransport;
  a2a?: UCPA2ATransport;
  embedded?: UCPEmbeddedTransport;
}

export interface UCPCapabilityEntry {
  version: string;
  spec: string;
  schema: string;
  extends?: string | string[];
  id?: string;
  config?: Record<string, unknown>;
}

export interface UCPPaymentHandlerEntry {
  handler_id: string;
  version: string;
  spec: string;
  schema?: string;
  config?: Record<string, unknown>;
  config_schema?: string;
  instrument_schemas?: string[];
  risk_signals?: Record<string, unknown>;
}

// ── Capability-specific config interfaces ────────────────────────────

export interface UCPIdentityLinkingConfig {
  authorization_endpoint: string;
  token_endpoint: string;
  revocation_endpoint?: string;
  issuer?: string;
  scopes?: string[];
}

export interface UCPOrderConfig {
  webhook_url?: string;
}

export interface UCPBuyerConsentConfig {
  analytics?: boolean;
  preferences?: boolean;
  marketing?: boolean;
  sale_of_data?: boolean;
}

export interface UCPFulfillmentConfig {
  allows_multi_destination?: boolean;
  allows_method_combinations?: boolean;
  supports_multi_group?: boolean;
}

// ── Signing key (unchanged) ──────────────────────────────────────────
export interface UCPSigningKey {
  kid: string;
  kty: string;
  crv?: string;
  x?: string;
  y?: string;
  [key: string]: unknown;
}

// ── Metadata — values are arrays in new format ───────────────────────
export interface UCPMetadata {
  version: string;
  services?: Record<string, UCPServiceEntry[]>;
  capabilities?: Record<string, UCPCapabilityEntry[]>;
  payment_handlers?: Record<string, UCPPaymentHandlerEntry[]>;
}

export interface UCPProfile {
  ucp: UCPMetadata;
  signing_keys?: UCPSigningKey[];
}

// ── Legacy type aliases (deprecated — kept for backward compat) ──────
/** @deprecated Use UCPServiceEntry */
export interface UCPService {
  transport: "rest" | "mcp" | "a2a" | "embedded";
  endpoint?: string;
  schema?: string;
}

/** @deprecated Use UCPCapabilityEntry */
export interface UCPCapability {
  version?: string;
  spec?: string;
  schema?: string;
  extends?: string;
}

/** @deprecated Use UCPPaymentHandlerEntry */
export interface UCPPaymentHandler {
  id: string;
  version?: string;
  spec?: string;
  schema?: string;
  config?: Record<string, unknown>;
}

// ── Validation result types ──────────────────────────────────────────

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
  detectedFormat?: UCPFormatVersion;
}
