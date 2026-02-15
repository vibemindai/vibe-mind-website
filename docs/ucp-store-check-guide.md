# How to Use the UCP Store Check Tool

**URL:** [https://vibemindsolutions.ai/tools/ucp-store-check](https://vibemindsolutions.ai/tools/ucp-store-check)

The UCP Store Check tool by Vibe Mind AI Solutions lets you validate whether an ecommerce store has a properly configured **UCP (Universal Commerce Protocol)** profile. It checks your store's `/.well-known/ucp` file for AI-driven commerce compatibility and reports detailed validation results.

> **Spec version:** This tool validates against the **UCP Draft Spec — 2026-02-16**. Legacy (pre-2026) profiles are still supported with appropriate warnings.

---

## Table of Contents

1. [What is UCP?](#1-what-is-ucp)
2. [Prerequisites](#2-prerequisites)
3. [Accessing the Tool](#3-accessing-the-tool)
4. [Method 1 — Check a Live Store URL](#4-method-1--check-a-live-store-url)
5. [Method 2 — Validate JSON Directly](#5-method-2--validate-json-directly)
6. [Method 3 — Upload a JSON File](#6-method-3--upload-a-json-file)
7. [Method 4 — Try the Example Profile](#7-method-4--try-the-example-profile)
8. [Understanding Validation Results](#8-understanding-validation-results)
9. [Validation Categories Explained](#9-validation-categories-explained)
10. [Sample UCP Profile](#10-sample-ucp-profile)
11. [Common Issues & Troubleshooting](#11-common-issues--troubleshooting)
12. [References](#12-references)

---

## 1. What is UCP?

**UCP (Universal Commerce Protocol)** is Google's open-source standard for AI-driven commerce (Draft Spec 2026-02-16). It provides a unified way for ecommerce stores to expose their capabilities to AI agents, enabling:

- Automated product discovery and search
- AI-driven checkout and payment processing
- Identity linking and order management
- Agent-to-agent (A2A) commerce without human intervention
- Integration with multiple AI platforms through a single standard

### Core Capabilities

The spec defines three core capabilities:

| Capability | Key | Description |
|---|---|---|
| **Checkout** | `dev.ucp.shopping.checkout` | Session-based checkout flow with lifecycle states. The minimum viable capability. |
| **Identity Linking** | `dev.ucp.shopping.identity_linking` | OAuth 2.0 Authorization Code flow for linking buyer accounts |
| **Order** | `dev.ucp.shopping.order` | Webhook-based order tracking with fulfillment events and adjustments |

### Extensions

All current extensions extend the Checkout capability:

| Extension | Key | Description |
|---|---|---|
| **Fulfillment** | `dev.ucp.shopping.fulfillment` | Shipping methods, pickup, multi-destination, fulfillment groups |
| **Discount** | `dev.ucp.shopping.discount` | Discount codes, automatic discounts, JSONPath allocation |
| **AP2 Mandates** | `dev.ucp.shopping.ap2_mandate` | Cryptographic authorization for autonomous AI agent transactions |
| **Buyer Consent** | `dev.ucp.shopping.buyer_consent` | Consent fields for analytics, marketing, preferences, data sale |

Similar to how `robots.txt` tells search engines how to crawl a site, the `/.well-known/ucp` file tells AI agents what commerce capabilities a store supports. It is a JSON file published at a well-known URL path containing the store's UCP profile.

---

## 2. Prerequisites

Before using the tool, make sure you have one of the following:

- **A live store URL** — Your ecommerce store must be publicly accessible and serve a JSON file at `https://your-store.com/.well-known/ucp`
- **A UCP profile JSON** — The JSON content you want to validate (copied to clipboard or saved as a `.json` file)

No account or sign-up is required. The tool is completely free to use.

---

## 3. Accessing the Tool

1. Open your web browser.
2. Navigate to **[https://vibemindsolutions.ai/tools/ucp-store-check](https://vibemindsolutions.ai/tools/ucp-store-check)**.
3. The page will load with two tabs: **Check URL** and **Validate JSON**.

---

## 4. Method 1 — Check a Live Store URL

Use this method to check if a live ecommerce store has a valid UCP profile hosted at `/.well-known/ucp`.

### Steps

1. On the tool page, make sure the **"Check URL"** tab is selected (it is selected by default).
2. In the **"Store URL"** input field, enter your store's base URL.
   - Example: `https://store.example.com`
   - You can omit `https://` — it will be added automatically.
3. Click the **"Check Store"** button.
4. The tool will send a request to fetch `/.well-known/ucp` from your domain.
5. Wait for the results to appear below the form.

### What Happens Behind the Scenes

- The tool constructs the URL: `https://your-store.com/.well-known/ucp`
- It fetches the JSON file from that endpoint via the Vibe Mind API
- The returned JSON is then validated against the UCP specification
- Results are displayed with pass/fail/warning status for each check

---

## 5. Method 2 — Validate JSON Directly

Use this method if you have your UCP profile JSON and want to validate it before deploying.

### Steps

1. Click the **"Validate JSON"** tab to switch to JSON input mode.
2. Paste your UCP profile JSON into the **"UCP Profile JSON"** text area.
   - The placeholder shows the expected format: `{"ucp": {"version": "2026-02-16", ...}}`
3. Click the **"Validate"** button.
4. Validation results will appear instantly below the form.

### Notes

- The JSON must be valid (properly formatted with correct syntax).
- If the JSON is malformed, the first check ("Valid JSON") will fail and a parse error message will be shown.

---

## 6. Method 3 — Upload a JSON File

Use this method if your UCP profile is saved as a `.json` file on your computer.

### Steps

1. Click the **"Validate JSON"** tab.
2. Click the **"Upload"** button (next to the Validate button).
3. A file picker will open — select your `.json` file.
   - **Maximum file size:** 1 MB
   - Only `.json` files are accepted
4. The file contents will be loaded into the text area automatically.
5. Click the **"Validate"** button to run the validation.

---

## 7. Method 4 — Try the Example Profile

Not sure what a valid UCP profile looks like? Use the built-in example to see a passing validation.

### Steps

1. Click the **"Validate JSON"** tab.
2. Click the **"Try Example"** button.
3. A sample UCP profile will be loaded into the text area and validated automatically.
4. Review the results to understand what a fully compliant profile looks like.

The example profile includes all three core capabilities (checkout, identity linking, order), three extensions (fulfillment, discount, buyer consent), and a payment handler with risk signals.

---

## 8. Understanding Validation Results

After running a check, the results section appears with three possible overall statuses:

| Status | Indicator | Meaning |
|---|---|---|
| **UCP Detected** | Green banner | All checks passed with no failures or warnings. Your profile is fully compliant. |
| **Partial UCP Profile** | Amber/yellow banner | Some checks passed but there are warnings or a small number of failures. The profile needs attention. |
| **UCP Not Detected** | Red banner | Multiple critical checks failed. The profile is not compliant or was not found. |

### Results Breakdown

- **Progress Bar** — Shows the percentage of checks that passed (e.g., "14/16 checks passed").
- **Format Badge** — Indicates whether the profile uses the current spec format (`Spec: 2026-02-16`) or shows a legacy format warning.
- **Grouped Checks** — Checks are organized into expandable accordion sections by category (up to 15 categories, depending on which modules are declared). Each section shows badge counts for failures and warnings.
- **Individual Checks** — Each check displays:
  - A colored status icon (green = pass, red = fail, amber = warning, blue = info)
  - A label describing what was checked
  - Optional detail text with additional context
- **Raw JSON Viewer** — A collapsible section at the bottom lets you inspect the raw JSON with a copy-to-clipboard button.

---

## 9. Validation Categories Explained

The tool performs up to **77 checks across 15 categories**. The exact number depends on which capabilities your profile declares — per-module groups only appear when the corresponding capability is present. The tool automatically detects whether your profile uses the current (2026-02-16) or legacy format and applies the appropriate checks.

### 9.1 Profile Structure

Validates the fundamental structure of your JSON file.

| Check | Requirement |
|---|---|
| Valid JSON | The input must be parseable JSON |
| Root is a JSON object | The top level must be a `{}` object, not an array or primitive |
| Has `"ucp"` root key | The object must contain a `"ucp"` key with an object value |
| Has `signing_keys` | The profile should include a `signing_keys` array (warning if missing) |

### 9.2 Version & Compliance

Validates the UCP version declaration and format compliance.

| Check | Requirement |
|---|---|
| Version field present | `ucp.version` must exist and be a string |
| Version format valid | Must follow the `YYYY-MM-DD` date format (e.g., `"2026-02-16"`) |
| Uses current spec format | Profile should use the array-based 2026-02-16 structure (warning for legacy) |

### 9.3 Services

Validates the declared commerce services. In the **2026-02-16 format**, each service key maps to an array of service entries with nested transport objects.

**Current format (2026-02-16):**

| Check | Severity |
|---|---|
| Services section present | warn |
| Service count (info) | info |
| Service keys use reverse-domain naming | fail |
| Each entry has a version | fail |
| Each entry has a spec URL | fail |
| At least one transport (`rest`, `mcp`, `a2a`, `embedded`) | fail |
| REST/MCP transports have endpoints | fail |

**Legacy format:** validates flat `transport` enum and `endpoint` fields.

### 9.4 Capabilities

Validates the declared store capabilities. In the **2026-02-16 format**, each key maps to an array of entries with required `version`, `spec`, and `schema`.

**Current format (2026-02-16):**

| Check | Severity |
|---|---|
| Capabilities section present | warn |
| Capability count (info) | info |
| Capability keys use reverse-domain naming | fail |
| Each capability has a version | fail |
| Each capability has a spec URL | fail |
| Each capability has a schema URL | fail |
| extends field valid (string or string[]) | fail |
| Identity linking has OAuth endpoints (if declared) | warn |
| Order capability has webhook URL (if declared) | warn |

**Legacy format:** checks version field only (warn if missing).

### 9.5 Payment Handlers

Validates the declared payment integrations. In the **2026-02-16 format**, handlers use `handler_id` and `version`/`spec` are required.

**Current format (2026-02-16):**

| Check | Severity |
|---|---|
| Payment handlers section present | warn |
| Handler count (info) | info |
| Handler keys use reverse-domain naming | fail |
| Each handler has a handler_id | fail |
| Each handler has a version | fail |
| Each handler has a spec URL | fail |
| Risk signals declared (info) | info |

**Legacy format:** checks for `id` field (warns about rename to `handler_id`).

### 9.6 Capability Registry

Validates the use of known UCP capabilities and extension relationships (new format only).

| Check | Severity |
|---|---|
| Core capabilities detected (checkout, identity_linking, order) | info |
| Extensions detected (fulfillment, discount, ap2_mandate, buyer_consent) | info |
| Has checkout capability (minimum viable profile) | warn |
| Extension parents are declared (no orphaned extensions) | warn |
| Custom capabilities (info) | info |

### 9.7 Checkout (per-module)

These checks appear only when `dev.ucp.shopping.checkout` is declared. Checkout is the minimum viable capability.

| Check | Severity |
|---|---|
| Checkout capability declared | info |
| Checkout service declared (service-capability pairing) | warn |
| Checkout service has REST or MCP transport | warn |
| Checkout spec URL present | fail |
| Checkout schema URL present | fail |

### 9.8 Identity Linking (per-module)

These checks appear only when `dev.ucp.shopping.identity_linking` is declared.

| Check | Severity |
|---|---|
| Identity linking capability declared | info |
| Has config object | fail |
| Has `authorization_endpoint` | fail |
| Has `token_endpoint` | fail |
| Has `revocation_endpoint` (RFC 7009) | warn |
| Has `issuer` field | warn |
| Has `scopes` defined | warn |
| OAuth endpoints use HTTPS | fail |

### 9.9 Order (per-module)

These checks appear only when `dev.ucp.shopping.order` is declared.

| Check | Severity |
|---|---|
| Order capability declared | info |
| Has config object | warn |
| Has `webhook_url` | warn |
| Webhook URL uses HTTPS | fail |
| Checkout capability present (required by order) | warn |

### 9.10 Fulfillment (per-module)

These checks appear only when `dev.ucp.shopping.fulfillment` is declared.

| Check | Severity |
|---|---|
| Fulfillment extension declared | info |
| Extends checkout capability | fail |
| Has spec URL | fail |
| Has schema URL | fail |
| Fulfillment features (multi-destination, method combinations, multi-group) | info |

### 9.11 Discount (per-module)

These checks appear only when `dev.ucp.shopping.discount` is declared.

| Check | Severity |
|---|---|
| Discount extension declared | info |
| Extends checkout capability | fail |
| Has spec URL | fail |
| Has schema URL | fail |

### 9.12 AP2 Mandates (per-module)

These checks appear only when `dev.ucp.shopping.ap2_mandate` is declared.

| Check | Severity |
|---|---|
| AP2 Mandates extension declared | info |
| Extends checkout capability | fail |
| Has spec URL | fail |
| Has schema URL | fail |
| A2A transport available in services | warn |
| Signing keys present for mandate verification | pass |

### 9.13 Buyer Consent (per-module)

These checks appear only when `dev.ucp.shopping.buyer_consent` is declared.

| Check | Severity |
|---|---|
| Buyer consent extension declared | info |
| Extends checkout capability | fail |
| Has spec URL | fail |
| Has schema URL | fail |
| Consent fields configured (analytics, preferences, marketing, sale_of_data) | info |

### 9.14 Cross-Section Alignment

Validates consistency across services, capabilities, and payment handlers (new format only, conditional checks).

| Check | Severity |
|---|---|
| Service-capability key overlap | info |
| A2A transports have `agent_card` URLs (if A2A used) | warn |
| Embedded transports have `runtime` (if embedded used) | warn |
| Payment handlers declare supported currencies (if handlers present) | warn |
| Payment handlers declare payment methods (if handlers present) | warn |

### 9.15 Signing Keys

Validates cryptographic signing keys for secure communication.

| Check | Requirement |
|---|---|
| `signing_keys` is an array | Must be a JSON array |
| Key count | Informational — reports how many keys are declared |
| Each key has `"kid"` | Every key must have a Key ID (`kid`) |
| Each key has `"kty"` | Every key must have a Key Type (`kty`) |
| EC keys have `crv`, `x`, `y` | Elliptic Curve keys require curve name and coordinates |
| EC keys use approved curves | P-256, P-384, or P-521 recommended (warning) |

### 9.16 Security & Governance

Validates security best practices and namespace governance.

| Check | Severity |
|---|---|
| All spec/schema URLs use HTTPS | fail |
| Multiple signing keys for rotation | warn |
| Spec URL origins match namespace authority | warn |

---

## 10. Sample UCP Profile

Below is a complete, valid UCP profile using the **2026-02-16 format** with core capabilities, extensions, and payment handlers. It passes all checks. Use it as a template:

```json
{
  "ucp": {
    "version": "2026-02-16",
    "services": {
      "dev.ucp.shopping.catalog": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/catalog/v2",
          "rest": {
            "endpoint": "https://store.example.com/api/v2/catalog",
            "schema": "https://ucp.dev/schemas/shopping/catalog/v2"
          }
        }
      ],
      "dev.ucp.shopping.checkout": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/checkout/v2",
          "rest": {
            "endpoint": "https://store.example.com/api/v2/checkout"
          }
        }
      ]
    },
    "capabilities": {
      "dev.ucp.shopping.checkout": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/checkout/v2",
          "schema": "https://ucp.dev/schemas/shopping/checkout/v2"
        }
      ],
      "dev.ucp.shopping.identity_linking": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/identity_linking/v2",
          "schema": "https://ucp.dev/schemas/shopping/identity_linking/v2",
          "config": {
            "authorization_endpoint": "https://store.example.com/oauth/authorize",
            "token_endpoint": "https://store.example.com/oauth/token"
          }
        }
      ],
      "dev.ucp.shopping.order": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/order/v2",
          "schema": "https://ucp.dev/schemas/shopping/order/v2",
          "config": {
            "webhook_url": "https://store.example.com/webhooks/ucp/orders"
          }
        }
      ],
      "dev.ucp.shopping.fulfillment": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/fulfillment/v2",
          "schema": "https://ucp.dev/schemas/shopping/fulfillment/v2",
          "extends": "dev.ucp.shopping.checkout"
        }
      ],
      "dev.ucp.shopping.discount": [
        {
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/shopping/discount/v2",
          "schema": "https://ucp.dev/schemas/shopping/discount/v2",
          "extends": "dev.ucp.shopping.checkout"
        }
      ]
    },
    "payment_handlers": {
      "dev.ucp.payments.stripe": [
        {
          "handler_id": "stripe-live-001",
          "version": "2026-02-16",
          "spec": "https://ucp.dev/specs/payments/stripe/v2",
          "config": {
            "currencies": ["USD", "EUR", "GBP"],
            "methods": ["card", "apple_pay", "google_pay"]
          },
          "risk_signals": {
            "session_id": true,
            "score": true
          }
        }
      ]
    }
  },
  "signing_keys": [
    {
      "kid": "store-key-2026-01",
      "kty": "EC",
      "crv": "P-256",
      "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0"
    }
  ]
}
```

### Key Structure Breakdown

| Field | Description |
|---|---|
| `ucp.version` | UCP spec version in `YYYY-MM-DD` format |
| `ucp.services.*[]` | Arrays of versioned service entries with nested transport keys |
| `ucp.capabilities.*[]` | Arrays of versioned capability entries with `spec`, `schema`, optional `extends` and `config` |
| `ucp.capabilities.*.config` | Capability-specific config (OAuth endpoints for identity_linking, webhook_url for order, etc.) |
| `ucp.payment_handlers.*[]` | Arrays of versioned handler entries with `handler_id`, `spec`, `config`, optional `risk_signals` |
| `signing_keys[]` | JWK-format signing keys for webhook verification |

---

## 11. Common Issues & Troubleshooting

### "Check Failed — Could not reach the store"
- Verify the store URL is correct and publicly accessible.
- Ensure the `/.well-known/ucp` path is being served (not blocked by firewall, WAF, or CDN rules).
- Check that the server returns `Content-Type: application/json`.

### "Invalid URL"
- Make sure the URL is properly formatted (e.g., `https://store.example.com`).
- Do not include the `/.well-known/ucp` path — the tool appends it automatically.

### "Valid JSON" check fails
- Your JSON has a syntax error. Common mistakes:
  - Trailing commas after the last item in an object or array.
  - Missing quotes around keys.
  - Using single quotes instead of double quotes.
- Use a JSON linter (e.g., [jsonlint.com](https://jsonlint.com)) to find and fix syntax errors.

### "Legacy format detected" warning
- Your profile uses the pre-2026 object-based structure. The tool still validates it but shows a warning.
- To upgrade: wrap each service/capability/handler value in an array, replace the flat `transport` field with nested transport keys (e.g., `rest: { endpoint: "..." }`), rename `id` to `handler_id` on payment handlers, and add the required `version`/`spec`/`schema` fields.

### "Extension parents are declared" warning
- One or more extensions reference a parent capability (via `extends`) that is not declared in the profile.
- All UCP extensions (fulfillment, discount, ap2_mandate, buyer_consent) require `dev.ucp.shopping.checkout` to be declared.

### "Has checkout capability" warning
- The profile does not declare the `dev.ucp.shopping.checkout` capability, which is the minimum viable capability for a functioning UCP profile.

### "Identity linking has OAuth endpoints" warning
- The `dev.ucp.shopping.identity_linking` capability is declared but its `config` is missing `authorization_endpoint` or `token_endpoint`.

### "Spec URL origins match namespace authority" warning
- The hostname in a `spec` URL does not match the expected authority for its namespace. For `dev.ucp.*` capabilities, spec URLs should point to `ucp.dev`.

### "Service keys use reverse-domain naming" fails
- All keys must follow the pattern: `segment.segment.segment` (at least 3 segments).
- Each segment starts with a lowercase letter and contains only lowercase letters and digits.
- **Valid:** `dev.ucp.shopping.catalog`
- **Invalid:** `shopping-catalog`, `UCP.Shopping.Catalog`, `catalog`

### "File too large" error
- Uploaded JSON files must be under **1 MB**. Reduce the file size or paste the content directly.

### `signing_keys` warning
- The `signing_keys` field is recommended but not strictly required. Adding it enables secure communications between AI agents and your store.

---

## 12. References

| Resource | URL | Description |
|---|---|---|
| **UCP Official Site** | [https://ucp.dev](https://ucp.dev) | Official Universal Commerce Protocol documentation and specification |
| **UCP GitHub Repository** | [https://github.com/Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp) | Source code and spec for the UCP standard |
| **Google Merchant UCP Guide** | [https://developers.google.com/merchant/ucp](https://developers.google.com/merchant/ucp) | Google's merchant integration guide |
| **UCP Store Check Tool** | [https://vibemindsolutions.ai/tools/ucp-store-check](https://vibemindsolutions.ai/tools/ucp-store-check) | The validation tool covered in this guide |
| **Vibe Mind AI Solutions** | [https://vibemindsolutions.ai](https://vibemindsolutions.ai) | Company website |
| **Well-Known URIs (RFC 8615)** | [https://www.rfc-editor.org/rfc/rfc8615](https://www.rfc-editor.org/rfc/rfc8615) | IETF standard defining the `/.well-known/` URI path prefix |
| **JSON Web Key (RFC 7517)** | [https://www.rfc-editor.org/rfc/rfc7517](https://www.rfc-editor.org/rfc/rfc7517) | IETF standard for the JWK format used in `signing_keys` |
| **Reverse-Domain Naming** | [https://en.wikipedia.org/wiki/Reverse_domain_name_notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation) | Naming convention used for UCP service/capability keys |

### Transport Protocols

In the 2026-02-16 spec, transports are declared as nested objects under their respective keys:

| Transport Key | Description |
|---|---|
| `rest` | Standard REST API — nested object with `endpoint` (required) and optional `schema`. Requires TLS 1.3+. Auth options: OAuth 2.0, API Key, mTLS. |
| `mcp` | Model Context Protocol — nested object with `endpoint` (required) and optional `schema`. Capabilities map 1:1 to MCP tools. |
| `a2a` | Agent-to-Agent Protocol (AP2/A2A) — nested object with optional `agent_card` URL and `schema`. Uses Agent Cards for discovery. |
| `embedded` | Embedded Protocol — nested object with optional `runtime` and `schema`. Business-controlled iframe/webview with JSON-RPC 2.0 postMessage. |

### Core Capabilities

| Capability | Description |
|---|---|
| `dev.ucp.shopping.checkout` | Session-based checkout with lifecycle states: incomplete, requires_escalation, ready_for_complete, completed, canceled |
| `dev.ucp.shopping.identity_linking` | OAuth 2.0 Authorization Code flow. Config requires `authorization_endpoint` and `token_endpoint`. Scope: `ucp:scopes:checkout_session` |
| `dev.ucp.shopping.order` | Webhook-based order tracking. Fulfillment events (shipped, delivered, etc.) and adjustments (refunds, returns, disputes). Webhook security via detached JWT (RFC 7797). |

### Extensions

| Extension | Extends | Description |
|---|---|---|
| `dev.ucp.shopping.fulfillment` | checkout | Shipping methods, pickup, digital fulfillment. Hierarchical: Methods > Groups > Options > Destinations. |
| `dev.ucp.shopping.discount` | checkout | Discount codes and automatic discounts. Allocation via JSONPath-based distribution. |
| `dev.ucp.shopping.ap2_mandate` | checkout | Cryptographic mandates for autonomous AI agents. Uses SD-JWT+kb and JWS Detached Content. |
| `dev.ucp.shopping.buyer_consent` | checkout | Consent booleans: analytics, preferences, marketing, sale_of_data. |

---

*This guide was created for the UCP Store Check tool at [vibemindsolutions.ai](https://vibemindsolutions.ai). For questions or support, visit the [Contact page](https://vibemindsolutions.ai/contact).*
