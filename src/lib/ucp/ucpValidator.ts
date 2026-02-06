import type { ValidationCheck, ValidationResult, OverallStatus } from "./ucpTypes";

const REVERSE_DOMAIN_RE = /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*){2,}$/;
const VERSION_RE = /^\d{4}-\d{2}-\d{2}$/;
const VALID_TRANSPORTS = ["rest", "mcp", "a2a", "embedded"];

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

  // ── Services ───────────────────────────────────────────────────────
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

  if (hasServices) {
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
    for (const [, val] of Object.entries(services)) {
      if (typeof val !== "object" || val === null) continue;
      const svc = val as Record<string, unknown>;
      const transport = svc.transport;
      if (!VALID_TRANSPORTS.includes(transport as string)) {
        allTransportsValid = false;
      }
      if ((transport === "rest" || transport === "mcp") && !svc.endpoint) {
        allEndpointsPresent = false;
      }
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

  // ── Capabilities ───────────────────────────────────────────────────
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

  if (hasCaps) {
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
      const cap = val as Record<string, unknown>;
      if (!cap.version) allHaveVersion = false;
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

  // ── Payment Handlers ───────────────────────────────────────────────
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

  if (hasPayments) {
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
    for (const val of Object.values(handlers)) {
      if (typeof val !== "object" || val === null) continue;
      const handler = val as Record<string, unknown>;
      if (!handler.id) allHaveId = false;
    }
    checks.push(check("ph-4", "Payment Handlers", "Each handler has an id", allHaveId));
  }

  // ── Signing Keys ───────────────────────────────────────────────────
  if (hasSigningKeys) {
    const keys = profile.signing_keys;
    const isArray = Array.isArray(keys);
    checks.push(check("sk-1", "Signing Keys", "signing_keys is an array", isArray));

    if (isArray) {
      checks.push(infoCheck("sk-2", "Signing Keys", `${keys.length} signing key(s) declared`));

      let allHaveKid = true;
      let allHaveKty = true;
      let ecKeysValid = true;

      for (const key of keys) {
        if (typeof key !== "object" || key === null) continue;
        const k = key as Record<string, unknown>;
        if (!k.kid) allHaveKid = false;
        if (!k.kty) allHaveKty = false;
        if (k.kty === "EC") {
          if (!k.crv || !k.x || !k.y) ecKeysValid = false;
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
    }
  }

  return buildResult(checks, jsonString);
}

function buildResult(checks: ValidationCheck[], rawJson?: string): ValidationResult {
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

  return { overall, checks, passCount, failCount, warnCount, totalChecks, rawJson };
}
