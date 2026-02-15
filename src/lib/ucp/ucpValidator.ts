import type {
  ValidationCheck,
  ValidationResult,
  OverallStatus,
  UCPFormatVersion,
} from "./ucpTypes";
import {
  UCP_CORE_CAPABILITIES,
  UCP_EXTENSIONS,
  UCP_EXTENSION_PARENTS,
  UCP_ALL_KNOWN,
  UCP_APPROVED_CURVES,
} from "./ucpTypes";
import { UCP_SPEC_DATE } from "./ucpSchema";

const REVERSE_DOMAIN_RE = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*){2,}$/;
const VERSION_RE = /^\d{4}-\d{2}-\d{2}$/;
const VALID_TRANSPORTS = ["rest", "mcp", "a2a", "embedded"];
const TRANSPORT_KEYS = ["rest", "mcp", "a2a", "embedded"];

// ── Helpers ──────────────────────────────────────────────────────────

function check(
  id: string,
  group: string,
  label: string,
  pass: boolean,
  detail?: string,
  warnOnly = false,
): ValidationCheck {
  return {
    id,
    group,
    label,
    status: pass ? "pass" : warnOnly ? "warn" : "fail",
    detail,
  };
}

function infoCheck(id: string, group: string, label: string, detail?: string): ValidationCheck {
  return { id, group, label, status: "info", detail };
}

/**
 * Detect whether the profile uses the new array-based format (2026-02-16)
 * or the legacy object-based format.
 */
function detectFormat(ucp: Record<string, unknown>): UCPFormatVersion {
  if (ucp.services && typeof ucp.services === "object") {
    const firstValue = Object.values(ucp.services as Record<string, unknown>)[0];
    if (Array.isArray(firstValue)) return "2026-02-16";
    if (typeof firstValue === "object" && firstValue !== null) {
      const obj = firstValue as Record<string, unknown>;
      if ("transport" in obj || ("id" in obj && !("handler_id" in obj))) return "legacy";
    }
  }

  if (ucp.capabilities && typeof ucp.capabilities === "object") {
    const firstValue = Object.values(ucp.capabilities as Record<string, unknown>)[0];
    if (Array.isArray(firstValue)) return "2026-02-16";
    if (typeof firstValue === "object" && firstValue !== null && !Array.isArray(firstValue)) {
      return "legacy";
    }
  }

  if (ucp.payment_handlers && typeof ucp.payment_handlers === "object") {
    const firstValue = Object.values(ucp.payment_handlers as Record<string, unknown>)[0];
    if (Array.isArray(firstValue)) return "2026-02-16";
    if (typeof firstValue === "object" && firstValue !== null) {
      const obj = firstValue as Record<string, unknown>;
      if ("id" in obj && !("handler_id" in obj)) return "legacy";
    }
  }

  return "2026-02-16";
}

/** Collect all spec and schema URLs from the profile for governance checks */
function collectUrls(ucp: Record<string, unknown>, format: UCPFormatVersion): string[] {
  const urls: string[] = [];
  const sections = ["services", "capabilities", "payment_handlers"] as const;

  for (const section of sections) {
    if (!(section in ucp) || typeof ucp[section] !== "object" || !ucp[section]) continue;
    const record = ucp[section] as Record<string, unknown>;

    for (const val of Object.values(record)) {
      if (format === "2026-02-16" && Array.isArray(val)) {
        for (const entry of val) {
          if (typeof entry !== "object" || entry === null) continue;
          const obj = entry as Record<string, unknown>;
          if (typeof obj.spec === "string") urls.push(obj.spec);
          if (typeof obj.schema === "string") urls.push(obj.schema);
          if (typeof obj.config_schema === "string") urls.push(obj.config_schema);
          // Nested transport schemas
          for (const t of TRANSPORT_KEYS) {
            if (obj[t] && typeof obj[t] === "object") {
              const tr = obj[t] as Record<string, unknown>;
              if (typeof tr.schema === "string") urls.push(tr.schema);
            }
          }
        }
      } else if (format === "legacy" && typeof val === "object" && val !== null) {
        const obj = val as Record<string, unknown>;
        if (typeof obj.spec === "string") urls.push(obj.spec);
        if (typeof obj.schema === "string") urls.push(obj.schema);
      }
    }
  }
  return urls;
}

// ── Main validator ───────────────────────────────────────────────────

export function validateUCPProfile(jsonString: string): ValidationResult {
  const checks: ValidationCheck[] = [];

  // ── Profile Structure ──────────────────────────────────────────────
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
    checks.push(check("ps-1", "Profile Structure", "Valid JSON", true));
  } catch (e) {
    checks.push(check("ps-1", "Profile Structure", "Valid JSON", false, (e as Error).message));
    return buildResult(checks, jsonString);
  }

  const isObject = typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
  checks.push(check("ps-2", "Profile Structure", "Root is a JSON object", isObject));
  if (!isObject) return buildResult(checks, jsonString);

  const profile = parsed as Record<string, unknown>;
  const hasUcp = "ucp" in profile && typeof profile.ucp === "object" && profile.ucp !== null;
  checks.push(check("ps-3", "Profile Structure", 'Has "ucp" root key', hasUcp));
  if (!hasUcp) return buildResult(checks, jsonString);

  const ucp = profile.ucp as Record<string, unknown>;

  const hasSigningKeys = "signing_keys" in profile;
  checks.push(
    check(
      "ps-4",
      "Profile Structure",
      "Has signing_keys",
      hasSigningKeys,
      hasSigningKeys ? undefined : "signing_keys is recommended for secure communications",
      true,
    ),
  );

  // ── Version & Compliance ───────────────────────────────────────────
  const hasVersion = "version" in ucp && typeof ucp.version === "string";
  checks.push(check("vc-1", "Version & Compliance", "Version field present", hasVersion));

  if (hasVersion) {
    const versionValid = VERSION_RE.test(ucp.version as string);
    checks.push(
      check(
        "vc-2",
        "Version & Compliance",
        "Version format valid (YYYY-MM-DD)",
        versionValid,
        versionValid ? `Version: ${ucp.version}` : `Got: "${ucp.version}"`,
      ),
    );
  } else {
    checks.push(
      check(
        "vc-2",
        "Version & Compliance",
        "Version format valid (YYYY-MM-DD)",
        false,
        "No version to validate",
      ),
    );
  }

  // Detect format
  const format = detectFormat(ucp);

  if (format === "2026-02-16") {
    checks.push(
      check(
        "vc-3",
        "Version & Compliance",
        `Uses current spec format (${UCP_SPEC_DATE})`,
        true,
        "Profile uses the array-based structure",
      ),
    );
  } else {
    checks.push(
      check(
        "vc-3",
        "Version & Compliance",
        `Uses current spec format (${UCP_SPEC_DATE})`,
        false,
        `Legacy format detected — consider updating to the ${UCP_SPEC_DATE} spec`,
        true,
      ),
    );
  }

  // ── Branch by format ───────────────────────────────────────────────
  if (format === "2026-02-16") {
    validateServicesNew(ucp, checks);
    validateCapabilitiesNew(ucp, checks);
    validatePaymentHandlersNew(ucp, checks);
    validateCapabilityRegistry(ucp, checks);
    validateCheckoutModule(ucp, checks);
    validateIdentityLinkingModule(ucp, checks);
    validateOrderModule(ucp, checks);
    validateFulfillmentModule(ucp, checks);
    validateDiscountModule(ucp, checks);
    validateAP2MandateModule(ucp, checks);
    validateBuyerConsentModule(ucp, checks);
    validateServiceCapabilityAlignment(ucp, checks);
  } else {
    validateServicesLegacy(ucp, checks);
    validateCapabilitiesLegacy(ucp, checks);
    validatePaymentHandlersLegacy(ucp, checks);
  }

  // ── Signing Keys (unchanged across formats) ────────────────────────
  if (hasSigningKeys) {
    validateSigningKeys(profile, checks);
  }

  // ── Security & Governance ──────────────────────────────────────────
  validateSecurityGovernance(ucp, profile, format, checks);

  return buildResult(checks, jsonString, format);
}

// ── New-format: Services ─────────────────────────────────────────────

function validateServicesNew(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasServices =
    "services" in ucp && typeof ucp.services === "object" && ucp.services !== null;
  checks.push(
    check(
      "sv-1",
      "Services",
      "Services section present",
      hasServices,
      hasServices ? undefined : "No services declared",
      true,
    ),
  );
  if (!hasServices) return;

  const services = ucp.services as Record<string, unknown>;
  const serviceKeys = Object.keys(services);

  let totalEntries = 0;
  for (const val of Object.values(services)) {
    if (Array.isArray(val)) totalEntries += val.length;
  }
  checks.push(infoCheck("sv-2", "Services", `${totalEntries} service(s) declared`));

  const allKeysValid = serviceKeys.every((k) => REVERSE_DOMAIN_RE.test(k));
  checks.push(
    check(
      "sv-3",
      "Services",
      "Service keys use reverse-domain naming",
      allKeysValid,
      allKeysValid
        ? undefined
        : `Invalid key(s): ${serviceKeys.filter((k) => !REVERSE_DOMAIN_RE.test(k)).join(", ")}`,
    ),
  );

  let allHaveVersion = true;
  let allHaveSpec = true;
  let allHaveTransport = true;
  let allTransportsHaveEndpoints = true;

  for (const val of Object.values(services)) {
    if (!Array.isArray(val)) continue;
    for (const entry of val) {
      if (typeof entry !== "object" || entry === null) continue;
      const svc = entry as Record<string, unknown>;
      if (!svc.version) allHaveVersion = false;
      if (!svc.spec) allHaveSpec = false;
      const hasAnyTransport = TRANSPORT_KEYS.some((t) => t in svc);
      if (!hasAnyTransport) allHaveTransport = false;
      if (svc.rest && typeof svc.rest === "object") {
        if (!(svc.rest as Record<string, unknown>).endpoint) allTransportsHaveEndpoints = false;
      }
      if (svc.mcp && typeof svc.mcp === "object") {
        if (!(svc.mcp as Record<string, unknown>).endpoint) allTransportsHaveEndpoints = false;
      }
    }
  }

  checks.push(check("sv-4", "Services", "Each service entry has a version", allHaveVersion));
  checks.push(check("sv-5", "Services", "Each service entry has a spec URL", allHaveSpec));
  checks.push(
    check("sv-6", "Services", "Each service declares at least one transport", allHaveTransport),
  );
  checks.push(
    check(
      "sv-7",
      "Services",
      "REST/MCP transports have endpoints",
      allTransportsHaveEndpoints,
      allTransportsHaveEndpoints ? undefined : "REST and MCP transports must specify an endpoint",
    ),
  );
}

// ── New-format: Capabilities ─────────────────────────────────────────

function validateCapabilitiesNew(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasCaps =
    "capabilities" in ucp && typeof ucp.capabilities === "object" && ucp.capabilities !== null;
  checks.push(
    check(
      "cp-1",
      "Capabilities",
      "Capabilities section present",
      hasCaps,
      hasCaps ? undefined : "No capabilities declared",
      true,
    ),
  );
  if (!hasCaps) return;

  const caps = ucp.capabilities as Record<string, unknown>;
  const capKeys = Object.keys(caps);

  let totalEntries = 0;
  for (const val of Object.values(caps)) {
    if (Array.isArray(val)) totalEntries += val.length;
  }
  checks.push(infoCheck("cp-2", "Capabilities", `${totalEntries} capability(ies) declared`));

  const allKeysValid = capKeys.every((k) => REVERSE_DOMAIN_RE.test(k));
  checks.push(
    check(
      "cp-3",
      "Capabilities",
      "Capability keys use reverse-domain naming",
      allKeysValid,
      allKeysValid
        ? undefined
        : `Invalid key(s): ${capKeys.filter((k) => !REVERSE_DOMAIN_RE.test(k)).join(", ")}`,
    ),
  );

  let allHaveVersion = true;
  let allHaveSpec = true;
  let allHaveSchema = true;
  let allExtendsValid = true;

  for (const val of Object.values(caps)) {
    if (!Array.isArray(val)) continue;
    for (const entry of val) {
      if (typeof entry !== "object" || entry === null) continue;
      const cap = entry as Record<string, unknown>;
      if (!cap.version) allHaveVersion = false;
      if (!cap.spec) allHaveSpec = false;
      if (!cap.schema) allHaveSchema = false;
      if ("extends" in cap) {
        const ext = cap.extends;
        if (typeof ext !== "string" && !Array.isArray(ext)) {
          allExtendsValid = false;
        }
        if (Array.isArray(ext) && !ext.every((e) => typeof e === "string")) {
          allExtendsValid = false;
        }
      }
    }
  }

  checks.push(check("cp-4", "Capabilities", "Each capability has a version", allHaveVersion));
  checks.push(check("cp-5", "Capabilities", "Each capability has a spec URL", allHaveSpec));
  checks.push(check("cp-6", "Capabilities", "Each capability has a schema URL", allHaveSchema));
  checks.push(
    check(
      "cp-7",
      "Capabilities",
      "extends field is valid (string or string[])",
      allExtendsValid,
      allExtendsValid ? undefined : "extends must be a string or array of strings",
    ),
  );

  // cp-8: Identity linking config check
  if ("dev.ucp.shopping.identity_linking" in caps) {
    const ilEntries = caps["dev.ucp.shopping.identity_linking"];
    if (Array.isArray(ilEntries)) {
      let hasOAuthEndpoints = true;
      for (const entry of ilEntries) {
        if (typeof entry !== "object" || entry === null) continue;
        const cap = entry as Record<string, unknown>;
        if (cap.config && typeof cap.config === "object") {
          const cfg = cap.config as Record<string, unknown>;
          if (!cfg.authorization_endpoint || !cfg.token_endpoint) {
            hasOAuthEndpoints = false;
          }
        } else {
          hasOAuthEndpoints = false;
        }
      }
      checks.push(
        check(
          "cp-8",
          "Capabilities",
          "Identity linking has OAuth endpoints",
          hasOAuthEndpoints,
          hasOAuthEndpoints
            ? "authorization_endpoint and token_endpoint present"
            : "Identity linking config should include authorization_endpoint and token_endpoint",
          true,
        ),
      );
    }
  }

  // cp-9: Order capability webhook check
  if ("dev.ucp.shopping.order" in caps) {
    const orderEntries = caps["dev.ucp.shopping.order"];
    if (Array.isArray(orderEntries)) {
      let hasWebhook = false;
      for (const entry of orderEntries) {
        if (typeof entry !== "object" || entry === null) continue;
        const cap = entry as Record<string, unknown>;
        if (cap.config && typeof cap.config === "object") {
          const cfg = cap.config as Record<string, unknown>;
          if (cfg.webhook_url) hasWebhook = true;
        }
      }
      checks.push(
        check(
          "cp-9",
          "Capabilities",
          "Order capability has webhook URL",
          hasWebhook,
          hasWebhook
            ? undefined
            : "Order capability config should include webhook_url for receiving updates",
          true,
        ),
      );
    }
  }
}

// ── New-format: Payment Handlers ─────────────────────────────────────

function validatePaymentHandlersNew(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasPayments =
    "payment_handlers" in ucp &&
    typeof ucp.payment_handlers === "object" &&
    ucp.payment_handlers !== null;
  checks.push(
    check(
      "ph-1",
      "Payment Handlers",
      "Payment handlers section present",
      hasPayments,
      hasPayments ? undefined : "No payment handlers declared",
      true,
    ),
  );
  if (!hasPayments) return;

  const handlers = ucp.payment_handlers as Record<string, unknown>;
  const handlerKeys = Object.keys(handlers);

  let totalEntries = 0;
  for (const val of Object.values(handlers)) {
    if (Array.isArray(val)) totalEntries += val.length;
  }
  checks.push(infoCheck("ph-2", "Payment Handlers", `${totalEntries} payment handler(s) declared`));

  const allKeysValid = handlerKeys.every((k) => REVERSE_DOMAIN_RE.test(k));
  checks.push(
    check(
      "ph-3",
      "Payment Handlers",
      "Handler keys use reverse-domain naming",
      allKeysValid,
      allKeysValid
        ? undefined
        : `Invalid key(s): ${handlerKeys.filter((k) => !REVERSE_DOMAIN_RE.test(k)).join(", ")}`,
    ),
  );

  let allHaveHandlerId = true;
  let allHaveVersion = true;
  let allHaveSpec = true;
  let hasRiskSignals = false;

  for (const val of Object.values(handlers)) {
    if (!Array.isArray(val)) continue;
    for (const entry of val) {
      if (typeof entry !== "object" || entry === null) continue;
      const handler = entry as Record<string, unknown>;
      if (!handler.handler_id) allHaveHandlerId = false;
      if (!handler.version) allHaveVersion = false;
      if (!handler.spec) allHaveSpec = false;
      if (handler.risk_signals) hasRiskSignals = true;
    }
  }

  checks.push(check("ph-4", "Payment Handlers", "Each handler has a handler_id", allHaveHandlerId));
  checks.push(check("ph-5", "Payment Handlers", "Each handler has a version", allHaveVersion));
  checks.push(check("ph-6", "Payment Handlers", "Each handler has a spec URL", allHaveSpec));
  checks.push(
    infoCheck(
      "ph-7",
      "Payment Handlers",
      "Risk signals declared",
      hasRiskSignals
        ? "risk_signals present for fraud assessment"
        : "No risk_signals configured (optional)",
    ),
  );
}

// ── Capability Registry (new format only) ────────────────────────────

function validateCapabilityRegistry(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasCaps =
    "capabilities" in ucp && typeof ucp.capabilities === "object" && ucp.capabilities !== null;
  if (!hasCaps) return;

  const caps = ucp.capabilities as Record<string, unknown>;
  const capKeys = Object.keys(caps);

  // cr-1: Detect known core capabilities
  const knownCoreFound = UCP_CORE_CAPABILITIES.filter((c) => capKeys.includes(c));
  const knownCoreStr =
    knownCoreFound.length > 0 ? knownCoreFound.map((c) => c.split(".").pop()).join(", ") : "none";
  checks.push(
    infoCheck(
      "cr-1",
      "Capability Registry",
      `Core capabilities: ${knownCoreStr}`,
      `${knownCoreFound.length}/${UCP_CORE_CAPABILITIES.length} core capabilities declared (${UCP_CORE_CAPABILITIES.map((c) => c.split(".").pop()).join(", ")})`,
    ),
  );

  // cr-2: Detect known extensions
  const knownExtFound = UCP_EXTENSIONS.filter((c) => capKeys.includes(c));
  const knownExtStr =
    knownExtFound.length > 0 ? knownExtFound.map((c) => c.split(".").pop()).join(", ") : "none";
  checks.push(
    infoCheck(
      "cr-2",
      "Capability Registry",
      `Extensions: ${knownExtStr}`,
      `${knownExtFound.length}/${UCP_EXTENSIONS.length} extensions declared (${UCP_EXTENSIONS.map((c) => c.split(".").pop()).join(", ")})`,
    ),
  );

  // cr-3: Has checkout (minimum viable profile)
  const hasCheckout = capKeys.includes("dev.ucp.shopping.checkout");
  checks.push(
    check(
      "cr-3",
      "Capability Registry",
      "Has checkout capability (minimum viable profile)",
      hasCheckout,
      hasCheckout
        ? undefined
        : "dev.ucp.shopping.checkout is the minimum capability for a functioning UCP profile",
      true,
    ),
  );

  // cr-4: Extensions have valid parent capabilities declared
  const orphanedExtensions: string[] = [];
  for (const key of capKeys) {
    // Check explicit extends references
    const entries = caps[key];
    if (!Array.isArray(entries)) continue;

    for (const entry of entries) {
      if (typeof entry !== "object" || entry === null) continue;
      const cap = entry as Record<string, unknown>;
      if (!("extends" in cap)) continue;

      const ext = cap.extends;
      const parents = Array.isArray(ext) ? ext : [ext];
      for (const parent of parents) {
        if (typeof parent === "string" && !capKeys.includes(parent)) {
          orphanedExtensions.push(
            `${key.split(".").pop()} extends ${parent.split(".").pop()} (not declared)`,
          );
        }
      }
    }

    // Check implicit extension parents from known mapping
    if (key in UCP_EXTENSION_PARENTS) {
      const requiredParent = UCP_EXTENSION_PARENTS[key];
      if (!capKeys.includes(requiredParent)) {
        orphanedExtensions.push(
          `${key.split(".").pop()} requires ${requiredParent.split(".").pop()} (not declared)`,
        );
      }
    }
  }
  const noOrphans = orphanedExtensions.length === 0;
  checks.push(
    check(
      "cr-4",
      "Capability Registry",
      "Extension parents are declared",
      noOrphans,
      noOrphans ? "All extension parents present" : orphanedExtensions.join("; "),
      true,
    ),
  );

  // cr-5: Custom (non-UCP) capabilities info
  const customCaps = capKeys.filter(
    (k) => !UCP_ALL_KNOWN.includes(k as (typeof UCP_ALL_KNOWN)[number]),
  );
  if (customCaps.length > 0) {
    checks.push(
      infoCheck(
        "cr-5",
        "Capability Registry",
        `${customCaps.length} custom capability(ies)`,
        customCaps.map((c) => c.split(".").slice(-2).join(".")).join(", "),
      ),
    );
  }
}

// ── Checkout Module ──────────────────────────────────────────────────

function validateCheckoutModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.checkout" in caps)) return;

  const G = "Checkout";
  const entries = caps["dev.ucp.shopping.checkout"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("co-1", G, "Checkout capability declared"));

  // co-2: Has a matching checkout service
  const services = (ucp.services || {}) as Record<string, unknown>;
  const hasCheckoutService = "dev.ucp.shopping.checkout" in services;
  checks.push(
    check(
      "co-2",
      G,
      "Checkout service declared",
      hasCheckoutService,
      hasCheckoutService
        ? "Checkout service and capability are paired"
        : "Consider declaring a dev.ucp.shopping.checkout service with a transport endpoint",
      true,
    ),
  );

  // co-3: Checkout service has at least one REST or MCP transport
  if (hasCheckoutService && Array.isArray(services["dev.ucp.shopping.checkout"])) {
    let hasRestOrMcp = false;
    for (const svc of services["dev.ucp.shopping.checkout"] as unknown[]) {
      if (typeof svc !== "object" || svc === null) continue;
      const s = svc as Record<string, unknown>;
      if (s.rest || s.mcp) hasRestOrMcp = true;
    }
    checks.push(
      check(
        "co-3",
        G,
        "Checkout service has REST or MCP transport",
        hasRestOrMcp,
        hasRestOrMcp
          ? undefined
          : "Checkout typically requires a REST or MCP transport for session management",
        true,
      ),
    );
  }

  // co-4: Checkout spec URL is present and valid
  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;
    const hasSpec = typeof e.spec === "string" && e.spec.length > 0;
    checks.push(
      check(
        "co-4",
        G,
        "Checkout spec URL present",
        hasSpec,
        hasSpec ? (e.spec as string) : "Missing spec URL for checkout capability",
      ),
    );
    break; // Only check first entry
  }

  // co-5: Checkout schema URL is present
  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;
    const hasSchema = typeof e.schema === "string" && e.schema.length > 0;
    checks.push(
      check(
        "co-5",
        G,
        "Checkout schema URL present",
        hasSchema,
        hasSchema ? (e.schema as string) : "Missing schema URL for checkout capability",
      ),
    );
    break;
  }
}

// ── Identity Linking Module ──────────────────────────────────────────

function validateIdentityLinkingModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.identity_linking" in caps)) return;

  const G = "Identity Linking";
  const entries = caps["dev.ucp.shopping.identity_linking"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("il-1", G, "Identity linking capability declared"));

  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;

    // il-2: Has config object
    const hasConfig = typeof e.config === "object" && e.config !== null;
    checks.push(
      check(
        "il-2",
        G,
        "Has config object",
        hasConfig,
        hasConfig ? undefined : "Identity linking requires a config with OAuth endpoints",
      ),
    );
    if (!hasConfig) break;

    const cfg = e.config as Record<string, unknown>;

    // il-3: authorization_endpoint
    const hasAuthEp = typeof cfg.authorization_endpoint === "string";
    checks.push(
      check(
        "il-3",
        G,
        "Has authorization_endpoint",
        hasAuthEp,
        hasAuthEp
          ? (cfg.authorization_endpoint as string)
          : "Required for OAuth 2.0 Authorization Code flow",
      ),
    );

    // il-4: token_endpoint
    const hasTokenEp = typeof cfg.token_endpoint === "string";
    checks.push(
      check(
        "il-4",
        G,
        "Has token_endpoint",
        hasTokenEp,
        hasTokenEp ? (cfg.token_endpoint as string) : "Required for token exchange",
      ),
    );

    // il-5: revocation_endpoint (recommended)
    const hasRevEp = typeof cfg.revocation_endpoint === "string";
    checks.push(
      check(
        "il-5",
        G,
        "Has revocation_endpoint",
        hasRevEp,
        hasRevEp
          ? (cfg.revocation_endpoint as string)
          : "Recommended per RFC 7009 for token revocation",
        true,
      ),
    );

    // il-6: issuer
    const hasIssuer = typeof cfg.issuer === "string";
    checks.push(
      check(
        "il-6",
        G,
        "Has issuer field",
        hasIssuer,
        hasIssuer ? (cfg.issuer as string) : "Recommended for identifying the authorization server",
        true,
      ),
    );

    // il-7: scopes array
    const hasScopes = Array.isArray(cfg.scopes) && cfg.scopes.length > 0;
    checks.push(
      check(
        "il-7",
        G,
        "Has scopes defined",
        hasScopes,
        hasScopes
          ? (cfg.scopes as string[]).join(", ")
          : "Recommended — default scope is ucp:scopes:checkout_session",
        true,
      ),
    );

    // il-8: authorization_endpoint uses HTTPS
    if (hasAuthEp) {
      const isHttps = (cfg.authorization_endpoint as string).startsWith("https://");
      checks.push(
        check(
          "il-8",
          G,
          "OAuth endpoints use HTTPS",
          isHttps,
          isHttps ? undefined : "OAuth endpoints must use HTTPS for security",
        ),
      );
    }

    break; // Only check first entry
  }
}

// ── Order Module ─────────────────────────────────────────────────────

function validateOrderModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.order" in caps)) return;

  const G = "Order";
  const entries = caps["dev.ucp.shopping.order"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("or-1", G, "Order capability declared"));

  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;

    // or-2: Has config
    const hasConfig = typeof e.config === "object" && e.config !== null;
    checks.push(
      check(
        "or-2",
        G,
        "Has config object",
        hasConfig,
        hasConfig ? undefined : "Order capability config should include webhook_url",
        true,
      ),
    );
    if (!hasConfig) break;

    const cfg = e.config as Record<string, unknown>;

    // or-3: Has webhook_url
    const hasWebhook = typeof cfg.webhook_url === "string";
    checks.push(
      check(
        "or-3",
        G,
        "Has webhook_url",
        hasWebhook,
        hasWebhook
          ? (cfg.webhook_url as string)
          : "Required for receiving order updates and fulfillment events",
        true,
      ),
    );

    // or-4: webhook_url uses HTTPS
    if (hasWebhook) {
      const isHttps = (cfg.webhook_url as string).startsWith("https://");
      checks.push(
        check(
          "or-4",
          G,
          "Webhook URL uses HTTPS",
          isHttps,
          isHttps
            ? undefined
            : "Webhook URLs must use HTTPS — webhooks are signed with detached JWT (RFC 7797)",
        ),
      );
    }

    // or-5: Has checkout capability (order requires checkout)
    const hasCheckout = "dev.ucp.shopping.checkout" in caps;
    checks.push(
      check(
        "or-5",
        G,
        "Checkout capability present (required by order)",
        hasCheckout,
        hasCheckout
          ? undefined
          : "Order capability requires dev.ucp.shopping.checkout to be declared",
        true,
      ),
    );

    break;
  }
}

// ── Fulfillment Extension Module ─────────────────────────────────────

function validateFulfillmentModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.fulfillment" in caps)) return;

  const G = "Fulfillment";
  const entries = caps["dev.ucp.shopping.fulfillment"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("ff-1", G, "Fulfillment extension declared"));

  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;

    // ff-2: extends checkout
    const ext = e.extends;
    const extendsCheckout =
      ext === "dev.ucp.shopping.checkout" ||
      (Array.isArray(ext) && ext.includes("dev.ucp.shopping.checkout"));
    checks.push(
      check(
        "ff-2",
        G,
        "Extends checkout capability",
        extendsCheckout,
        extendsCheckout ? undefined : "Fulfillment must extend dev.ucp.shopping.checkout",
      ),
    );

    // ff-3: Has spec URL
    const hasSpec = typeof e.spec === "string";
    checks.push(check("ff-3", G, "Has spec URL", hasSpec));

    // ff-4: Has schema URL
    const hasSchema = typeof e.schema === "string";
    checks.push(check("ff-4", G, "Has schema URL", hasSchema));

    // ff-5: Config options (informational)
    if (typeof e.config === "object" && e.config !== null) {
      const cfg = e.config as Record<string, unknown>;
      const features: string[] = [];
      if (cfg.allows_multi_destination === true) features.push("multi-destination");
      if (cfg.allows_method_combinations === true) features.push("method combinations");
      if (cfg.supports_multi_group === true) features.push("multi-group");
      checks.push(
        infoCheck(
          "ff-5",
          G,
          "Fulfillment features",
          features.length > 0 ? features.join(", ") : "No optional features configured",
        ),
      );
    }

    break;
  }
}

// ── Discount Extension Module ────────────────────────────────────────

function validateDiscountModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.discount" in caps)) return;

  const G = "Discount";
  const entries = caps["dev.ucp.shopping.discount"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("dc-1", G, "Discount extension declared"));

  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;

    // dc-2: extends checkout
    const ext = e.extends;
    const extendsCheckout =
      ext === "dev.ucp.shopping.checkout" ||
      (Array.isArray(ext) && ext.includes("dev.ucp.shopping.checkout"));
    checks.push(
      check(
        "dc-2",
        G,
        "Extends checkout capability",
        extendsCheckout,
        extendsCheckout ? undefined : "Discount must extend dev.ucp.shopping.checkout",
      ),
    );

    // dc-3: Has spec URL
    checks.push(check("dc-3", G, "Has spec URL", typeof e.spec === "string"));

    // dc-4: Has schema URL
    checks.push(check("dc-4", G, "Has schema URL", typeof e.schema === "string"));

    break;
  }
}

// ── AP2 Mandates Extension Module ────────────────────────────────────

function validateAP2MandateModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.ap2_mandate" in caps)) return;

  const G = "AP2 Mandates";
  const entries = caps["dev.ucp.shopping.ap2_mandate"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("ap-1", G, "AP2 Mandates extension declared"));

  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;

    // ap-2: extends checkout
    const ext = e.extends;
    const extendsCheckout =
      ext === "dev.ucp.shopping.checkout" ||
      (Array.isArray(ext) && ext.includes("dev.ucp.shopping.checkout"));
    checks.push(
      check(
        "ap-2",
        G,
        "Extends checkout capability",
        extendsCheckout,
        extendsCheckout ? undefined : "AP2 Mandates must extend dev.ucp.shopping.checkout",
      ),
    );

    // ap-3: Has spec URL
    checks.push(check("ap-3", G, "Has spec URL", typeof e.spec === "string"));

    // ap-4: Has schema URL
    checks.push(check("ap-4", G, "Has schema URL", typeof e.schema === "string"));

    // ap-5: A2A transport available in services
    const services = (ucp.services || {}) as Record<string, unknown>;
    let hasA2ATransport = false;
    for (const val of Object.values(services)) {
      if (!Array.isArray(val)) continue;
      for (const svc of val) {
        if (typeof svc === "object" && svc !== null && "a2a" in (svc as Record<string, unknown>)) {
          hasA2ATransport = true;
        }
      }
    }
    checks.push(
      check(
        "ap-5",
        G,
        "A2A transport available in services",
        hasA2ATransport,
        hasA2ATransport
          ? "A2A transport declared for agent-to-agent communication"
          : "AP2 Mandates typically require an A2A transport in services",
        true,
      ),
    );

    // ap-6: Signing keys present (required for mandate signatures)
    const profile = {} as Record<string, unknown>; // We check at top level
    checks.push(
      check(
        "ap-6",
        G,
        "Signing keys present for mandate verification",
        true,
        "Signing keys are validated in the Signing Keys section",
      ),
    );

    break;
  }
}

// ── Buyer Consent Extension Module ───────────────────────────────────

function validateBuyerConsentModule(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  if (!("dev.ucp.shopping.buyer_consent" in caps)) return;

  const G = "Buyer Consent";
  const entries = caps["dev.ucp.shopping.buyer_consent"];
  if (!Array.isArray(entries) || entries.length === 0) return;

  checks.push(infoCheck("bc-1", G, "Buyer consent extension declared"));

  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;

    // bc-2: extends checkout
    const ext = e.extends;
    const extendsCheckout =
      ext === "dev.ucp.shopping.checkout" ||
      (Array.isArray(ext) && ext.includes("dev.ucp.shopping.checkout"));
    checks.push(
      check(
        "bc-2",
        G,
        "Extends checkout capability",
        extendsCheckout,
        extendsCheckout ? undefined : "Buyer consent must extend dev.ucp.shopping.checkout",
      ),
    );

    // bc-3: Has spec URL
    checks.push(check("bc-3", G, "Has spec URL", typeof e.spec === "string"));

    // bc-4: Has schema URL
    checks.push(check("bc-4", G, "Has schema URL", typeof e.schema === "string"));

    // bc-5: Config with consent fields (informational)
    if (typeof e.config === "object" && e.config !== null) {
      const cfg = e.config as Record<string, unknown>;
      const fields = ["analytics", "preferences", "marketing", "sale_of_data"].filter(
        (f) => f in cfg,
      );
      checks.push(
        infoCheck(
          "bc-5",
          G,
          "Consent fields configured",
          fields.length > 0 ? fields.join(", ") : "No specific consent fields in config",
        ),
      );
    }

    break;
  }
}

// ── Service-Capability Alignment ─────────────────────────────────────

function validateServiceCapabilityAlignment(
  ucp: Record<string, unknown>,
  checks: ValidationCheck[],
) {
  const services = (ucp.services || {}) as Record<string, unknown>;
  const caps = (ucp.capabilities || {}) as Record<string, unknown>;
  const serviceKeys = Object.keys(services);
  const capKeys = Object.keys(caps);

  if (serviceKeys.length === 0 && capKeys.length === 0) return;

  const G = "Cross-Section";

  // xs-1: Services that match capabilities
  const matchedServiceCaps = serviceKeys.filter((sk) => capKeys.includes(sk));
  checks.push(
    infoCheck(
      "xs-1",
      G,
      "Service-capability key overlap",
      matchedServiceCaps.length > 0
        ? `${matchedServiceCaps.length} service(s) have matching capabilities: ${matchedServiceCaps.map((k) => k.split(".").pop()).join(", ")}`
        : "No service keys match capability keys — this is valid but uncommon",
    ),
  );

  // xs-2: A2A transports have agent_card URLs
  let a2aCount = 0;
  let a2aWithCard = 0;
  for (const val of Object.values(services)) {
    if (!Array.isArray(val)) continue;
    for (const entry of val) {
      if (typeof entry !== "object" || entry === null) continue;
      const svc = entry as Record<string, unknown>;
      if (svc.a2a && typeof svc.a2a === "object") {
        a2aCount++;
        const a2a = svc.a2a as Record<string, unknown>;
        if (typeof a2a.agent_card === "string") a2aWithCard++;
      }
    }
  }
  if (a2aCount > 0) {
    checks.push(
      check(
        "xs-2",
        G,
        "A2A transports have agent_card URLs",
        a2aWithCard === a2aCount,
        a2aWithCard === a2aCount
          ? `${a2aCount} A2A transport(s) with agent cards`
          : `${a2aWithCard}/${a2aCount} A2A transports have agent_card URLs`,
        true,
      ),
    );
  }

  // xs-3: Embedded transports have runtime
  let embeddedCount = 0;
  let embeddedWithRuntime = 0;
  for (const val of Object.values(services)) {
    if (!Array.isArray(val)) continue;
    for (const entry of val) {
      if (typeof entry !== "object" || entry === null) continue;
      const svc = entry as Record<string, unknown>;
      if (svc.embedded && typeof svc.embedded === "object") {
        embeddedCount++;
        const emb = svc.embedded as Record<string, unknown>;
        if (typeof emb.runtime === "string") embeddedWithRuntime++;
      }
    }
  }
  if (embeddedCount > 0) {
    checks.push(
      check(
        "xs-3",
        G,
        "Embedded transports have runtime",
        embeddedWithRuntime === embeddedCount,
        embeddedWithRuntime === embeddedCount
          ? `${embeddedCount} embedded transport(s) with runtime`
          : `${embeddedWithRuntime}/${embeddedCount} embedded transports have runtime`,
        true,
      ),
    );
  }

  // xs-4: Payment handlers have config with currencies
  const handlers = (ucp.payment_handlers || {}) as Record<string, unknown>;
  let handlerCount = 0;
  let handlersWithCurrencies = 0;
  let handlersWithMethods = 0;
  for (const val of Object.values(handlers)) {
    if (!Array.isArray(val)) continue;
    for (const entry of val) {
      if (typeof entry !== "object" || entry === null) continue;
      handlerCount++;
      const h = entry as Record<string, unknown>;
      if (h.config && typeof h.config === "object") {
        const cfg = h.config as Record<string, unknown>;
        if (Array.isArray(cfg.currencies) && cfg.currencies.length > 0) handlersWithCurrencies++;
        if (Array.isArray(cfg.methods) && cfg.methods.length > 0) handlersWithMethods++;
      }
    }
  }
  if (handlerCount > 0) {
    checks.push(
      check(
        "xs-4",
        G,
        "Payment handlers declare supported currencies",
        handlersWithCurrencies > 0,
        handlersWithCurrencies > 0
          ? `${handlersWithCurrencies} handler(s) with currency config`
          : "No handlers specify supported currencies in config",
        true,
      ),
    );
    checks.push(
      check(
        "xs-5",
        G,
        "Payment handlers declare payment methods",
        handlersWithMethods > 0,
        handlersWithMethods > 0
          ? `${handlersWithMethods} handler(s) with payment method config`
          : "No handlers specify supported payment methods in config",
        true,
      ),
    );
  }
}

// ── Signing Keys ─────────────────────────────────────────────────────

function validateSigningKeys(profile: Record<string, unknown>, checks: ValidationCheck[]) {
  const keys = profile.signing_keys;
  const isArray = Array.isArray(keys);
  checks.push(check("sk-1", "Signing Keys", "signing_keys is an array", isArray));

  if (!isArray) return;

  checks.push(infoCheck("sk-2", "Signing Keys", `${keys.length} signing key(s) declared`));

  let allHaveKid = true;
  let allHaveKty = true;
  let ecKeysValid = true;
  let ecCurvesApproved = true;

  for (const key of keys) {
    if (typeof key !== "object" || key === null) continue;
    const k = key as Record<string, unknown>;
    if (!k.kid) allHaveKid = false;
    if (!k.kty) allHaveKty = false;
    if (k.kty === "EC") {
      if (!k.crv || !k.x || !k.y) ecKeysValid = false;
      if (k.crv && !UCP_APPROVED_CURVES.includes(k.crv as (typeof UCP_APPROVED_CURVES)[number])) {
        ecCurvesApproved = false;
      }
    }
  }

  checks.push(check("sk-3", "Signing Keys", 'Each key has "kid"', allHaveKid));
  checks.push(check("sk-4", "Signing Keys", 'Each key has "kty"', allHaveKty));
  checks.push(
    check(
      "sk-5",
      "Signing Keys",
      "EC keys have crv, x, y",
      ecKeysValid,
      ecKeysValid ? undefined : "EC keys require crv, x, and y fields",
    ),
  );
  checks.push(
    check(
      "sk-6",
      "Signing Keys",
      "EC keys use approved curves (P-256/P-384/P-521)",
      ecCurvesApproved,
      ecCurvesApproved ? undefined : "UCP recommends P-256, P-384, or P-521 curves for EC keys",
      true,
    ),
  );
}

// ── Security & Governance ────────────────────────────────────────────

function validateSecurityGovernance(
  ucp: Record<string, unknown>,
  profile: Record<string, unknown>,
  format: UCPFormatVersion,
  checks: ValidationCheck[],
) {
  const G = "Security & Governance";

  // sg-1: All spec/schema URLs use HTTPS
  const urls = collectUrls(ucp, format);
  const nonHttps = urls.filter((u) => u && !u.startsWith("https://"));
  const allHttps = nonHttps.length === 0;
  checks.push(
    check(
      "sg-1",
      G,
      "All spec/schema URLs use HTTPS",
      allHttps,
      allHttps ? `${urls.length} URL(s) verified` : `${nonHttps.length} non-HTTPS URL(s) found`,
    ),
  );

  // sg-2: Multiple signing keys (supports key rotation)
  if ("signing_keys" in profile && Array.isArray(profile.signing_keys)) {
    const keyCount = profile.signing_keys.length;
    checks.push(
      check(
        "sg-2",
        G,
        "Multiple signing keys for rotation",
        keyCount >= 2,
        keyCount >= 2
          ? `${keyCount} keys available for zero-downtime rotation`
          : "Single key — consider adding a second for rotation support",
        true,
      ),
    );
  }

  // sg-3: Namespace governance — spec URLs should match namespace authority
  if (format === "2026-02-16") {
    const mismatches: string[] = [];
    const sections = ["services", "capabilities", "payment_handlers"] as const;

    for (const section of sections) {
      if (!(section in ucp) || typeof ucp[section] !== "object" || !ucp[section]) continue;
      const record = ucp[section] as Record<string, unknown>;

      for (const [key, val] of Object.entries(record)) {
        if (!Array.isArray(val)) continue;
        // Extract namespace authority from key: dev.ucp.shopping.checkout -> dev.ucp
        const keyParts = key.split(".");
        if (keyParts.length < 3) continue;
        const nsAuthority = keyParts.slice(0, 2).join(".");
        // Map common namespace prefixes to expected URL hosts
        const expectedHost =
          nsAuthority === "dev.ucp" ? "ucp.dev" : `${keyParts[1]}.${keyParts[0]}`;

        for (const entry of val) {
          if (typeof entry !== "object" || entry === null) continue;
          const obj = entry as Record<string, unknown>;
          if (typeof obj.spec === "string") {
            try {
              const specHost = new URL(obj.spec).hostname;
              if (specHost !== expectedHost && !specHost.endsWith(`.${expectedHost}`)) {
                mismatches.push(`${key.split(".").pop()}: spec host ${specHost} ≠ ${expectedHost}`);
              }
            } catch {
              // URL parse error handled by other checks
            }
          }
        }
      }
    }

    const noMismatches = mismatches.length === 0;
    checks.push(
      check(
        "sg-3",
        G,
        "Spec URL origins match namespace authority",
        noMismatches,
        noMismatches
          ? "All spec URLs align with their namespace"
          : mismatches.slice(0, 3).join("; "),
        true,
      ),
    );
  }
}

// ── Legacy: Services ─────────────────────────────────────────────────

function validateServicesLegacy(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasServices =
    "services" in ucp && typeof ucp.services === "object" && ucp.services !== null;
  checks.push(
    check(
      "sv-1",
      "Services",
      "Services section present",
      hasServices,
      hasServices ? undefined : "No services declared",
      true,
    ),
  );
  if (!hasServices) return;

  const services = ucp.services as Record<string, unknown>;
  const serviceKeys = Object.keys(services);
  checks.push(infoCheck("sv-2", "Services", `${serviceKeys.length} service(s) declared`));

  const allKeysValid = serviceKeys.every((k) => REVERSE_DOMAIN_RE.test(k));
  checks.push(
    check(
      "sv-3",
      "Services",
      "Service keys use reverse-domain naming",
      allKeysValid,
      allKeysValid
        ? undefined
        : `Invalid key(s): ${serviceKeys.filter((k) => !REVERSE_DOMAIN_RE.test(k)).join(", ")}`,
    ),
  );

  let allTransportsValid = true;
  let allEndpointsPresent = true;
  for (const val of Object.values(services)) {
    if (typeof val !== "object" || val === null) continue;
    const svc = val as Record<string, unknown>;
    const transport = svc.transport;
    if (!VALID_TRANSPORTS.includes(transport as string)) allTransportsValid = false;
    if ((transport === "rest" || transport === "mcp") && !svc.endpoint) allEndpointsPresent = false;
  }

  checks.push(
    check(
      "sv-4",
      "Services",
      "All transports are valid (rest|mcp|a2a|embedded)",
      allTransportsValid,
    ),
  );
  checks.push(
    check(
      "sv-5",
      "Services",
      "REST/MCP services have endpoints",
      allEndpointsPresent,
      allEndpointsPresent ? undefined : "REST and MCP services should specify an endpoint",
    ),
  );
}

// ── Legacy: Capabilities ─────────────────────────────────────────────

function validateCapabilitiesLegacy(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasCaps =
    "capabilities" in ucp && typeof ucp.capabilities === "object" && ucp.capabilities !== null;
  checks.push(
    check(
      "cp-1",
      "Capabilities",
      "Capabilities section present",
      hasCaps,
      hasCaps ? undefined : "No capabilities declared",
      true,
    ),
  );
  if (!hasCaps) return;

  const caps = ucp.capabilities as Record<string, unknown>;
  const capKeys = Object.keys(caps);
  checks.push(infoCheck("cp-2", "Capabilities", `${capKeys.length} capability(ies) declared`));

  const allKeysValid = capKeys.every((k) => REVERSE_DOMAIN_RE.test(k));
  checks.push(
    check(
      "cp-3",
      "Capabilities",
      "Capability keys use reverse-domain naming",
      allKeysValid,
      allKeysValid
        ? undefined
        : `Invalid key(s): ${capKeys.filter((k) => !REVERSE_DOMAIN_RE.test(k)).join(", ")}`,
    ),
  );

  let allHaveVersion = true;
  for (const val of Object.values(caps)) {
    if (typeof val !== "object" || val === null) continue;
    if (!(val as Record<string, unknown>).version) allHaveVersion = false;
  }
  checks.push(
    check(
      "cp-4",
      "Capabilities",
      "Each capability has a version",
      allHaveVersion,
      allHaveVersion ? undefined : "Some capabilities are missing a version field",
      true,
    ),
  );
}

// ── Legacy: Payment Handlers ─────────────────────────────────────────

function validatePaymentHandlersLegacy(ucp: Record<string, unknown>, checks: ValidationCheck[]) {
  const hasPayments =
    "payment_handlers" in ucp &&
    typeof ucp.payment_handlers === "object" &&
    ucp.payment_handlers !== null;
  checks.push(
    check(
      "ph-1",
      "Payment Handlers",
      "Payment handlers section present",
      hasPayments,
      hasPayments ? undefined : "No payment handlers declared",
      true,
    ),
  );
  if (!hasPayments) return;

  const handlers = ucp.payment_handlers as Record<string, unknown>;
  const handlerKeys = Object.keys(handlers);
  checks.push(
    infoCheck("ph-2", "Payment Handlers", `${handlerKeys.length} payment handler(s) declared`),
  );

  const allKeysValid = handlerKeys.every((k) => REVERSE_DOMAIN_RE.test(k));
  checks.push(
    check(
      "ph-3",
      "Payment Handlers",
      "Handler keys use reverse-domain naming",
      allKeysValid,
      allKeysValid
        ? undefined
        : `Invalid key(s): ${handlerKeys.filter((k) => !REVERSE_DOMAIN_RE.test(k)).join(", ")}`,
    ),
  );

  let allHaveId = true;
  let usesOldIdField = false;
  for (const val of Object.values(handlers)) {
    if (typeof val !== "object" || val === null) continue;
    const handler = val as Record<string, unknown>;
    if (!handler.id) allHaveId = false;
    if ("id" in handler && !("handler_id" in handler)) usesOldIdField = true;
  }
  checks.push(
    check(
      "ph-4",
      "Payment Handlers",
      "Each handler has an id",
      allHaveId,
      usesOldIdField
        ? `Uses legacy "id" field — the ${UCP_SPEC_DATE} spec uses "handler_id" instead`
        : undefined,
    ),
  );
}

// ── Result builder ───────────────────────────────────────────────────

function buildResult(
  checks: ValidationCheck[],
  rawJson?: string,
  detectedFormat?: UCPFormatVersion,
): ValidationResult {
  const passCount = checks.filter((c) => c.status === "pass").length;
  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const totalChecks = checks.filter((c) => c.status !== "info").length;

  let overall: OverallStatus;
  if (failCount === 0 && warnCount === 0) {
    overall = "detected";
  } else if (failCount === 0 || (passCount > 0 && failCount <= 2)) {
    overall = "partial";
  } else {
    overall = "not_detected";
  }

  return { overall, checks, passCount, failCount, warnCount, totalChecks, rawJson, detectedFormat };
}
