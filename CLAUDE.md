# Project Notes

## Build & Dev

- `npm run build` — production build (runs sitemap generation + vite build)
- `npm run dev` — development server

## UCP Store Check Tool — How to Update the Spec & Checker

The UCP Store Check tool lives at `/tools/ucp-store-check`. When the UCP spec changes, follow this process:

### Spec Date Constant

The spec date is centralized in one place:

```
src/lib/ucp/ucpSchema.ts → export const UCP_SPEC_DATE = "YYYY-MM-DD"
```

The UI and docs reference this constant — but the **type system** and **validator** also have the date string hardcoded as the format version identifier. A full date update requires changing:

1. `src/lib/ucp/ucpSchema.ts` — `UCP_SPEC_DATE` constant + all version strings in `SAMPLE_UCP_PROFILE`
2. `src/lib/ucp/ucpTypes.ts` — `UCPFormatVersion` type literal (e.g., `"legacy" | "2026-02-16"`)
3. `src/lib/ucp/ucpValidator.ts` — `detectFormat()` return values and `if (format === "...")` branches
4. `src/components/ucp/UCPStoreCheckForm.tsx` — placeholder string in Textarea
5. `docs/ucp-store-check-guide.md` — all prose references to the spec date

**Tip:** Use find-and-replace-all on the old date string across the project.

### File Dependency Order

When making structural changes, edit in this order (types → schemas → validator → UI → docs):

1. **`src/lib/ucp/ucpTypes.ts`** — TypeScript interfaces + known capability/extension constants. All other files depend on these.
2. **`src/lib/ucp/ucpSchema.ts`** — Zod schemas + capability config schemas + `SAMPLE_UCP_PROFILE`. Must match the types.
3. **`src/lib/ucp/ucpValidator.ts`** — Runtime validation logic. Has `detectFormat()` for legacy vs current format branching, plus per-section validation functions and the capability registry + security governance checks.
4. **`src/components/ucp/UCPStoreCheckForm.tsx`** — Form UI (placeholder text).
5. **`src/components/ucp/UCPValidationResults.tsx`** — Results display (format badge + `groupOrder` array for check groups).
6. **`src/components/ucp/UCPInfoSection.tsx`** — FAQ/info content about UCP capabilities, extensions, transports, security.
7. **`src/pages/UCPStoreCheckPage.tsx`** — Page hero with spec date line.
8. **`docs/ucp-store-check-guide.md`** — Full user-facing documentation.

### Files That Don't Change for Spec Updates

- `src/hooks/useUCPCheck.ts` — Hook that calls the validator (no spec-specific logic)
- `src/lib/ucp/ucpApi.ts` — API fetch layer
- `src/components/ucp/UCPCheckItem.tsx` — Generic check item renderer
- `src/components/ucp/UCPProfileViewer.tsx` — Raw JSON viewer

### Validation Check Groups (15 total + 1 conditional)

The validator produces checks in these groups (must match `groupOrder` in `UCPValidationResults.tsx`).
Groups 7–13 are **per-module** and only appear when the corresponding capability is declared.

| # | Group | Prefix | Checks | Scope |
|---|-------|--------|--------|-------|
| 1 | **Profile Structure** | `ps-` | ps-1 Valid JSON, ps-2 Root is object, ps-3 Has "ucp" key, ps-4 Has signing_keys (warn) | Always |
| 2 | **Version & Compliance** | `vc-` | vc-1 Version present, vc-2 Version format YYYY-MM-DD, vc-3 Current spec format | Always |
| 3 | **Services** | `sv-` | sv-1 Section present (warn), sv-2 Count (info), sv-3 Reverse-domain keys, sv-4 Version, sv-5 Spec URL, sv-6 Transport declared, sv-7 REST/MCP endpoints | New format |
| 4 | **Capabilities** | `cp-` | cp-1 Section present (warn), cp-2 Count (info), cp-3 Reverse-domain keys, cp-4 Version, cp-5 Spec URL, cp-6 Schema URL, cp-7 extends valid, cp-8 Identity linking OAuth (warn), cp-9 Order webhook (warn) | New format |
| 5 | **Payment Handlers** | `ph-` | ph-1 Section present (warn), ph-2 Count (info), ph-3 Reverse-domain keys, ph-4 handler_id, ph-5 Version, ph-6 Spec URL, ph-7 Risk signals (info) | New format |
| 6 | **Capability Registry** | `cr-` | cr-1 Core capabilities (info), cr-2 Extensions (info), cr-3 Has checkout (warn), cr-4 Extension parents declared (warn), cr-5 Custom capabilities (info, conditional) | New format |
| 7 | **Checkout** | `co-` | co-1 Declared (info), co-2 Checkout service paired (warn), co-3 REST/MCP transport (warn), co-4 Spec URL, co-5 Schema URL | If `dev.ucp.shopping.checkout` declared |
| 8 | **Identity Linking** | `il-` | il-1 Declared (info), il-2 Has config, il-3 authorization_endpoint, il-4 token_endpoint, il-5 revocation_endpoint (warn), il-6 issuer (warn), il-7 scopes (warn), il-8 HTTPS on OAuth endpoints | If `dev.ucp.shopping.identity_linking` declared |
| 9 | **Order** | `or-` | or-1 Declared (info), or-2 Has config (warn), or-3 webhook_url (warn), or-4 Webhook HTTPS, or-5 Checkout present (warn) | If `dev.ucp.shopping.order` declared |
| 10 | **Fulfillment** | `ff-` | ff-1 Declared (info), ff-2 Extends checkout, ff-3 Spec URL, ff-4 Schema URL, ff-5 Features (info, conditional) | If `dev.ucp.shopping.fulfillment` declared |
| 11 | **Discount** | `dc-` | dc-1 Declared (info), dc-2 Extends checkout, dc-3 Spec URL, dc-4 Schema URL | If `dev.ucp.shopping.discount` declared |
| 12 | **AP2 Mandates** | `ap-` | ap-1 Declared (info), ap-2 Extends checkout, ap-3 Spec URL, ap-4 Schema URL, ap-5 A2A transport available (warn), ap-6 Signing keys present | If `dev.ucp.shopping.ap2_mandate` declared |
| 13 | **Buyer Consent** | `bc-` | bc-1 Declared (info), bc-2 Extends checkout, bc-3 Spec URL, bc-4 Schema URL, bc-5 Consent fields (info, conditional) | If `dev.ucp.shopping.buyer_consent` declared |
| 14 | **Cross-Section** | `xs-` | xs-1 Service-capability overlap (info), xs-2 A2A agent_card URLs (warn, conditional), xs-3 Embedded runtime (warn, conditional), xs-4 Handler currencies (warn, conditional), xs-5 Handler payment methods (warn, conditional) | New format, if services + caps present |
| 15 | **Signing Keys** | `sk-` | sk-1 Array check, sk-2 Count (info), sk-3 kid, sk-4 kty, sk-5 EC crv/x/y, sk-6 Approved curves (warn) | If signing_keys present |
| 16 | **Security & Governance** | `sg-` | sg-1 HTTPS URLs, sg-2 Multiple keys for rotation (warn), sg-3 Namespace governance (warn, new format only) | Always |

**Total possible checks with full sample profile: ~77 (62 scored + 15 info)**

Legacy format runs a reduced set: sv-1..5 (different checks), cp-1..4, ph-1..4, sk-*, sg-1..2.

### Adding a New Validation Check

1. Add the check in the appropriate `validate*()` function in `ucpValidator.ts`
2. Use `check(id, group, label, pass, detail?, warnOnly?)` for pass/fail/warn checks
3. Use `infoCheck(id, group, label, detail?)` for informational checks
4. Check IDs follow the pattern: `ps-N`, `vc-N`, `sv-N`, `cp-N`, `ph-N`, `cr-N`, `co-N`, `il-N`, `or-N`, `ff-N`, `dc-N`, `ap-N`, `bc-N`, `xs-N`, `sk-N`, `sg-N`
5. If adding a new group, also add it to `groupOrder` in `UCPValidationResults.tsx`
6. Update the legacy branch if the check applies to old-format profiles too
7. Update `docs/ucp-store-check-guide.md` with the new check
8. **Update this CLAUDE.md** — add the new check ID to the table above so it is not forgotten on future spec updates

### Adding a New Per-Module Validator

When a new UCP capability or extension is added that needs deep validation beyond the generic cp-* checks:

1. Create a `validate<ModuleName>Module()` function in `ucpValidator.ts` following the pattern of existing ones (e.g., `validateCheckoutModule`, `validateIdentityLinkingModule`)
2. The function should early-return if the capability key is not in `ucp.capabilities`
3. Pick a new 2-letter prefix for check IDs (e.g., `co-`, `il-`, `or-`, `ff-`, `dc-`, `ap-`, `bc-`)
4. Always start with an info check (`*-1`) declaring the module is present
5. Call the new function from `validateUCPProfile()` inside the `if (format === "2026-02-16")` block
6. Add the group name to `groupOrder` in `UCPValidationResults.tsx` in the correct position
7. Add a corresponding config schema in `ucpSchema.ts` if the module has a `config` object
8. Add the config interface in `ucpTypes.ts`
9. **Update the Validation Check Groups table in this CLAUDE.md**

### Adding a New Known Capability or Extension

1. Add the name to `UCP_CORE_CAPABILITIES` or `UCP_EXTENSIONS` in `ucpTypes.ts`
2. If it's an extension, add its parent to `UCP_EXTENSION_PARENTS` in `ucpTypes.ts`
3. Add any config interface (e.g., `UCPFulfillmentConfig`) in `ucpTypes.ts`
4. Add corresponding Zod config schema in `ucpSchema.ts`
5. If the capability has required config fields, add a specific check in `validateCapabilitiesNew()` (see cp-8, cp-9 pattern)
6. Add entries to the `SAMPLE_UCP_PROFILE` in `ucpSchema.ts`
7. Update the info section FAQs in `UCPInfoSection.tsx`
8. Update docs sections 1, 9.4, 9.6, 10, 12

### Legacy Format Support

The validator detects legacy (pre-2026) profiles via `detectFormat()` which inspects whether values are arrays (new) or plain objects (legacy). Legacy profiles get a `vc-3` warning but still validate with the original check set. The Capability Registry and Security & Governance groups run for both formats (security) or new format only (registry). Keep the `validate*Legacy()` functions working when updating.

### Remaining Gaps vs Real UCP Spec

Items not yet covered by the profile checker:

- **Checkout session lifecycle** — runtime API validation (not profile-level)
- **Negotiation protocol** — capability intersection algorithm, schema composition
- **Payment instruments** — card types, token credentials, payment account references
- **Runtime security** — detached JWT webhook signing verification, UCP-Agent header format, TLS 1.3 enforcement
- **Platform vs Business profile** distinction
- **Embedded checkout** — CSP frame-ancestors, sandbox attributes validation

### UCP Spec References

- Official site: https://ucp.dev
- GitHub: https://github.com/Universal-Commerce-Protocol/ucp
- Google developer guide: https://developers.google.com/merchant/ucp
- Python SDK: https://github.com/Universal-Commerce-Protocol/python-sdk
- JavaScript SDK: https://github.com/Universal-Commerce-Protocol/js-sdk
