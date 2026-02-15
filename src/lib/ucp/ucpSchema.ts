import { z } from "zod";

// ── Spec version constant ────────────────────────────────────────────
export const UCP_SPEC_DATE = "2026-02-16";

// ── Shared primitives ────────────────────────────────────────────────
// Date format: YYYY-MM-DD (RFC 3339 date)
const versionFormat = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Version must be YYYY-MM-DD format");

// Reverse-domain naming pattern (e.g., dev.ucp.shopping.checkout)
const reverseDomainKey = z
  .string()
  .regex(
    /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*){2,}$/,
    "Key must use reverse-domain naming (e.g., dev.ucp.shopping.checkout)",
  );

// ── Transport sub-schemas (new format) ───────────────────────────────
const restTransportSchema = z.object({
  endpoint: z.string().url(),
  schema: z.string().url().optional(),
});

const mcpTransportSchema = z.object({
  endpoint: z.string().url(),
  schema: z.string().url().optional(),
});

const a2aTransportSchema = z.object({
  agent_card: z.string().url().optional(),
  schema: z.string().url().optional(),
});

const embeddedTransportSchema = z.object({
  runtime: z.string().optional(),
  schema: z.string().url().optional(),
});

// ── New-format entry schemas ─────────────────────────────────────────
const serviceEntrySchema = z.object({
  version: versionFormat,
  spec: z.string().url(),
  rest: restTransportSchema.optional(),
  mcp: mcpTransportSchema.optional(),
  a2a: a2aTransportSchema.optional(),
  embedded: embeddedTransportSchema.optional(),
});

const capabilityEntrySchema = z.object({
  version: versionFormat,
  spec: z.string().url(),
  schema: z.string().url(),
  extends: z.union([z.string(), z.array(z.string())]).optional(),
  id: z.string().optional(),
  config: z.record(z.unknown()).optional(),
});

const paymentHandlerEntrySchema = z.object({
  handler_id: z.string().min(1, "Payment handler must have a handler_id"),
  version: versionFormat,
  spec: z.string().url(),
  schema: z.string().url().optional(),
  config: z.record(z.unknown()).optional(),
  config_schema: z.string().url().optional(),
  instrument_schemas: z.array(z.string().url()).optional(),
  risk_signals: z.record(z.unknown()).optional(),
});

// ── Capability-specific config schemas ───────────────────────────────

const identityLinkingConfigSchema = z.object({
  authorization_endpoint: z.string().url(),
  token_endpoint: z.string().url(),
  revocation_endpoint: z.string().url().optional(),
  issuer: z.string().optional(),
  scopes: z.array(z.string()).optional(),
});

const orderConfigSchema = z.object({
  webhook_url: z.string().url().optional(),
});

const fulfillmentConfigSchema = z.object({
  allows_multi_destination: z.boolean().optional(),
  allows_method_combinations: z.boolean().optional(),
  supports_multi_group: z.boolean().optional(),
});

const buyerConsentConfigSchema = z.object({
  analytics: z.boolean().optional(),
  preferences: z.boolean().optional(),
  marketing: z.boolean().optional(),
  sale_of_data: z.boolean().optional(),
});

// ── Signing key (unchanged) ──────────────────────────────────────────
const signingKeySchema = z
  .object({
    kid: z.string().min(1, "Signing key must have a kid"),
    kty: z.string().min(1, "Signing key must have a kty"),
    crv: z.string().optional(),
    x: z.string().optional(),
    y: z.string().optional(),
  })
  .passthrough();

// ── New-format metadata (values are arrays) ──────────────────────────
const ucpMetadataSchema = z.object({
  version: versionFormat,
  services: z.record(reverseDomainKey, z.array(serviceEntrySchema)).optional(),
  capabilities: z.record(reverseDomainKey, z.array(capabilityEntrySchema)).optional(),
  payment_handlers: z.record(reverseDomainKey, z.array(paymentHandlerEntrySchema)).optional(),
});

export const ucpProfileSchema = z.object({
  ucp: ucpMetadataSchema,
  signing_keys: z.array(signingKeySchema).optional(),
});

// ── Legacy schemas (for format detection / backward compat) ──────────
const transportEnum = z.enum(["rest", "mcp", "a2a", "embedded"]);

const legacyServiceSchema = z.object({
  transport: transportEnum,
  endpoint: z.string().url().optional(),
  schema: z.string().url().optional(),
});

const legacyCapabilitySchema = z.object({
  version: z.string().optional(),
  spec: z.string().url().optional(),
  schema: z.string().url().optional(),
  extends: z.string().optional(),
});

const legacyPaymentHandlerSchema = z.object({
  id: z.string().min(1, "Payment handler must have an id"),
  version: z.string().optional(),
  spec: z.string().url().optional(),
  schema: z.string().url().optional(),
  config: z.record(z.unknown()).optional(),
});

export {
  versionFormat,
  reverseDomainKey,
  transportEnum,
  restTransportSchema,
  mcpTransportSchema,
  a2aTransportSchema,
  embeddedTransportSchema,
  serviceEntrySchema,
  capabilityEntrySchema,
  paymentHandlerEntrySchema,
  identityLinkingConfigSchema,
  orderConfigSchema,
  fulfillmentConfigSchema,
  buyerConsentConfigSchema,
  signingKeySchema,
  legacyServiceSchema,
  legacyCapabilitySchema,
  legacyPaymentHandlerSchema,
};

// ── Sample valid UCP profile (new array-based format) ────────────────
// Includes core capabilities, extensions, and full payment handler config
export const SAMPLE_UCP_PROFILE = {
  ucp: {
    version: "2026-02-16",
    services: {
      "dev.ucp.shopping.catalog": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/catalog/v2",
          rest: {
            endpoint: "https://store.example.com/api/v2/catalog",
            schema: "https://ucp.dev/schemas/shopping/catalog/v2",
          },
        },
      ],
      "dev.ucp.shopping.checkout": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/checkout/v2",
          rest: {
            endpoint: "https://store.example.com/api/v2/checkout",
          },
        },
      ],
      "dev.ucp.shopping.inventory": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/inventory/v2",
          mcp: {
            endpoint: "https://store.example.com/mcp/inventory",
            schema: "https://ucp.dev/schemas/shopping/inventory/v2",
          },
        },
      ],
    },
    capabilities: {
      "dev.ucp.shopping.checkout": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/checkout/v2",
          schema: "https://ucp.dev/schemas/shopping/checkout/v2",
        },
      ],
      "dev.ucp.shopping.identity_linking": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/identity_linking/v2",
          schema: "https://ucp.dev/schemas/shopping/identity_linking/v2",
          config: {
            authorization_endpoint: "https://store.example.com/oauth/authorize",
            token_endpoint: "https://store.example.com/oauth/token",
            revocation_endpoint: "https://store.example.com/oauth/revoke",
            issuer: "https://store.example.com",
            scopes: ["ucp:scopes:checkout_session"],
          },
        },
      ],
      "dev.ucp.shopping.order": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/order/v2",
          schema: "https://ucp.dev/schemas/shopping/order/v2",
          config: {
            webhook_url: "https://store.example.com/webhooks/ucp/orders",
          },
        },
      ],
      "dev.ucp.shopping.fulfillment": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/fulfillment/v2",
          schema: "https://ucp.dev/schemas/shopping/fulfillment/v2",
          extends: "dev.ucp.shopping.checkout",
          config: {
            allows_multi_destination: true,
            allows_method_combinations: false,
          },
        },
      ],
      "dev.ucp.shopping.discount": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/discount/v2",
          schema: "https://ucp.dev/schemas/shopping/discount/v2",
          extends: "dev.ucp.shopping.checkout",
        },
      ],
      "dev.ucp.shopping.buyer_consent": [
        {
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/shopping/buyer_consent/v2",
          schema: "https://ucp.dev/schemas/shopping/buyer_consent/v2",
          extends: "dev.ucp.shopping.checkout",
        },
      ],
    },
    payment_handlers: {
      "dev.ucp.payments.stripe": [
        {
          handler_id: "stripe-live-001",
          version: "2026-02-16",
          spec: "https://ucp.dev/specs/payments/stripe/v2",
          config: {
            currencies: ["USD", "EUR", "GBP"],
            methods: ["card", "apple_pay", "google_pay"],
          },
          risk_signals: {
            session_id: true,
            score: true,
          },
        },
      ],
    },
  },
  signing_keys: [
    {
      kid: "store-key-2026-01",
      kty: "EC",
      crv: "P-256",
      x: "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      y: "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    },
  ],
};
