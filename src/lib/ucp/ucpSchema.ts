import { z } from "zod";

// Date format: YYYY-MM-DD (RFC 3339 date)
const versionFormat = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Version must be YYYY-MM-DD format");

// Reverse-domain naming pattern (e.g., dev.ucp.shopping.checkout)
const reverseDomainKey = z
  .string()
  .regex(
    /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*){2,}$/,
    "Key must use reverse-domain naming (e.g., dev.ucp.shopping.checkout)",
  );

const transportEnum = z.enum(["rest", "mcp", "a2a", "embedded"]);

const serviceSchema = z.object({
  transport: transportEnum,
  endpoint: z.string().url().optional(),
  schema: z.string().url().optional(),
});

const capabilitySchema = z.object({
  version: z.string().optional(),
  spec: z.string().url().optional(),
  schema: z.string().url().optional(),
  extends: z.string().optional(),
});

const paymentHandlerSchema = z.object({
  id: z.string().min(1, "Payment handler must have an id"),
  version: z.string().optional(),
  spec: z.string().url().optional(),
  schema: z.string().url().optional(),
  config: z.record(z.unknown()).optional(),
});

const signingKeySchema = z
  .object({
    kid: z.string().min(1, "Signing key must have a kid"),
    kty: z.string().min(1, "Signing key must have a kty"),
    crv: z.string().optional(),
    x: z.string().optional(),
    y: z.string().optional(),
  })
  .passthrough();

const ucpMetadataSchema = z.object({
  version: versionFormat,
  services: z.record(reverseDomainKey, serviceSchema).optional(),
  capabilities: z.record(reverseDomainKey, capabilitySchema).optional(),
  payment_handlers: z.record(reverseDomainKey, paymentHandlerSchema).optional(),
});

export const ucpProfileSchema = z.object({
  ucp: ucpMetadataSchema,
  signing_keys: z.array(signingKeySchema).optional(),
});

export {
  versionFormat,
  reverseDomainKey,
  transportEnum,
  serviceSchema,
  capabilitySchema,
  paymentHandlerSchema,
  signingKeySchema,
};

// Sample valid UCP profile for the "Try Example" button
export const SAMPLE_UCP_PROFILE = {
  ucp: {
    version: "2025-01-01",
    services: {
      "dev.ucp.shopping.catalog": {
        transport: "rest",
        endpoint: "https://store.example.com/api/v1/catalog",
        schema: "https://ucp.dev/schemas/shopping/catalog/v1",
      },
      "dev.ucp.shopping.checkout": {
        transport: "rest",
        endpoint: "https://store.example.com/api/v1/checkout",
        schema: "https://ucp.dev/schemas/shopping/checkout/v1",
      },
      "dev.ucp.shopping.inventory": {
        transport: "mcp",
        endpoint: "https://store.example.com/mcp/inventory",
        schema: "https://ucp.dev/schemas/shopping/inventory/v1",
      },
    },
    capabilities: {
      "dev.ucp.shopping.search": {
        version: "2025-01-01",
        spec: "https://ucp.dev/specs/shopping/search/v1",
        schema: "https://ucp.dev/schemas/shopping/search/v1",
      },
      "dev.ucp.shopping.recommendations": {
        version: "2025-01-01",
        spec: "https://ucp.dev/specs/shopping/recommendations/v1",
      },
      "dev.ucp.shopping.returns": {
        version: "2025-01-01",
        spec: "https://ucp.dev/specs/shopping/returns/v1",
      },
    },
    payment_handlers: {
      "dev.ucp.payments.stripe": {
        id: "stripe-live-001",
        version: "2025-01-01",
        spec: "https://ucp.dev/specs/payments/stripe/v1",
        config: {
          currencies: ["USD", "EUR", "GBP"],
          methods: ["card", "apple_pay", "google_pay"],
        },
      },
    },
  },
  signing_keys: [
    {
      kid: "store-key-2025-01",
      kty: "EC",
      crv: "P-256",
      x: "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      y: "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    },
  ],
};
