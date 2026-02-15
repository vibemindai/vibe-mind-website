import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UCP_SPEC_DATE } from "@/lib/ucp/ucpSchema";

const UCPInfoSection = () => {
  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Learn About UCP</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          Based on UCP Draft Spec — {UCP_SPEC_DATE}
        </span>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="what-is-ucp">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What is UCP?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              UCP (Universal Commerce Protocol) is Google's open-source standard for AI-driven
              commerce. It provides a unified way for ecommerce stores to expose their capabilities
              to AI agents, enabling automated product discovery, checkout, identity linking,
              payment processing, and order management. UCP standardizes how AI systems interact
              with online stores, creating a seamless bridge between artificial intelligence and
              commerce platforms.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="well-known">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What is /.well-known/ucp?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Similar to how{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">robots.txt</code> tells search
              engines how to crawl a site,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">/.well-known/ucp</code> tells
              AI agents what commerce capabilities a store supports. It's a JSON file published at a
              well-known URL path that contains the store's UCP profile, including service
              declarations, capabilities, payment handlers, and signing keys. In the current spec,
              services, capabilities, and payment handlers use an array-based structure where each
              key maps to an array of versioned entries.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="core-capabilities">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What are the core capabilities?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>The UCP spec defines three core capabilities:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Checkout</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.checkout
                  </code>
                  ) — Session-based checkout flow with lifecycle states (incomplete, ready,
                  completed, canceled). The minimum capability for a functioning UCP profile.
                </li>
                <li>
                  <strong>Identity Linking</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.identity_linking
                  </code>
                  ) — OAuth 2.0 Authorization Code flow for linking buyer accounts. Requires{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    authorization_endpoint
                  </code>{" "}
                  and <code className="text-xs bg-muted px-1 py-0.5 rounded">token_endpoint</code>{" "}
                  in config.
                </li>
                <li>
                  <strong>Order</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.order
                  </code>
                  ) — Webhook-based order tracking with fulfillment events (shipped, delivered,
                  etc.) and post-order adjustments (refunds, returns, disputes).
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="extensions">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What are UCP extensions?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Extensions add functionality on top of core capabilities. All current extensions
                extend the Checkout capability:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Fulfillment</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.fulfillment
                  </code>
                  ) — Shipping methods, pickup options, multi-destination support, and fulfillment
                  groups.
                </li>
                <li>
                  <strong>Discount</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.discount
                  </code>
                  ) — Discount codes, automatic discounts, and allocation via JSONPath-based
                  distribution.
                </li>
                <li>
                  <strong>AP2 Mandates</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.ap2_mandate
                  </code>
                  ) — Cryptographic authorization for autonomous AI agent transactions using SD-JWT
                  and JWS.
                </li>
                <li>
                  <strong>Buyer Consent</strong> (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    dev.ucp.shopping.buyer_consent
                  </code>
                  ) — Consent fields for analytics, marketing, preferences, and data sale.
                </li>
              </ul>
              <p className="text-xs mt-2">
                Extensions must declare their parent via the{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">extends</code> field. The
                parent capability must also be declared in the profile.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payment-handlers">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What are Payment Handlers?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Payment Handlers define how a store processes payments through UCP. They form part
                of the "Trust Triangle" between the buyer's AI agent, the merchant's store, and the
                payment provider.
              </p>
              <p>Each handler declares:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">handler_id</code> — unique
                  identifier
                </li>
                <li>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">version</code> /{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">spec</code> — contract
                  versioning
                </li>
                <li>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">config</code> — currencies,
                  payment methods
                </li>
                <li>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">risk_signals</code> —
                  optional fraud assessment context
                </li>
              </ul>
              <p className="text-xs mt-2">
                Payment scenarios include digital wallets (Google Pay), direct tokenization with 3DS
                challenges, and autonomous agent mandates (AP2).
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transports">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What transport protocols does UCP support?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>UCP supports four transport bindings:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>REST</strong> — Standard HTTP API with OpenAPI spec. Requires TLS 1.3+ and
                  supports OAuth 2.0, API Key, and mTLS authentication.
                </li>
                <li>
                  <strong>MCP</strong> — Model Context Protocol for direct LLM tool integration.
                  Capabilities map 1:1 to MCP tools.
                </li>
                <li>
                  <strong>A2A</strong> — Agent-to-Agent Protocol for direct agent commerce. Uses
                  Agent Cards for service discovery.
                </li>
                <li>
                  <strong>Embedded</strong> — Business-controlled iframe/webview embedding using
                  JSON-RPC 2.0 postMessage communication.
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            How does UCP handle security?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>UCP security includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>HTTPS with TLS 1.3+ for all communication</li>
                <li>
                  JWK signing keys for webhook signature verification (detached JWT, RFC 7797)
                </li>
                <li>Key rotation support via multiple keys in the signing_keys array</li>
                <li>
                  Namespace governance — spec/schema URL origins must match the capability namespace
                </li>
                <li>Cryptographic mandates (SD-JWT) for autonomous agent transactions</li>
                <li>EC curves P-256, P-384, P-521 for signing (ES256/384/512)</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="what-changed">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What changed in the {UCP_SPEC_DATE} draft?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>Key structural changes from the previous spec:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Array-based values</strong> — services, capabilities, and payment handlers
                  are now arrays of entries (instead of single objects)
                </li>
                <li>
                  <strong>Nested transports</strong> — service transport is declared via nested keys
                  like <code className="text-xs bg-muted px-1 py-0.5 rounded">rest.endpoint</code>{" "}
                  instead of a flat{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">transport</code> field
                </li>
                <li>
                  <strong>Required fields</strong> —{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">version</code> and{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">spec</code> are now
                  required on services, capabilities, and payment handlers
                </li>
                <li>
                  <strong>Core capabilities</strong> — checkout, identity_linking, and order are
                  formally defined
                </li>
                <li>
                  <strong>Extensions</strong> — fulfillment, discount, AP2 mandates, and buyer
                  consent
                </li>
                <li>
                  <strong>handler_id</strong> — payment handlers use{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">handler_id</code> instead
                  of <code className="text-xs bg-muted px-1 py-0.5 rounded">id</code>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="what-is-ap2">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What is AP2 (Agent-to-Agent Protocol)?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AP2 (also known as A2A) is the agent-to-agent communication protocol within the UCP
              ecosystem. It defines how AI agents discover, authenticate, and transact with each
              other. When a UCP service uses the "a2a" transport type, it means the service
              communicates through the AP2 protocol, enabling direct agent-to-agent commerce without
              human intervention. The AP2 Mandates Extension adds cryptographic authorization using
              SD-JWT for delegated authority and autonomous recurring transactions between agents.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="why-adopt">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            Why should stores adopt UCP?
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>Adopting UCP enables your store to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be discoverable by AI shopping agents and assistants</li>
                <li>Support automated product search, comparison, and checkout</li>
                <li>Integrate with multiple AI platforms through a single standard</li>
                <li>Future-proof your commerce infrastructure for the AI era</li>
                <li>Leverage Google's ecosystem of AI-commerce tools</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-3">
        <a
          href="https://ucp.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          ucp.dev
        </a>
        <span className="text-muted-foreground">|</span>
        <a
          href="https://github.com/Universal-Commerce-Protocol/ucp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default UCPInfoSection;
