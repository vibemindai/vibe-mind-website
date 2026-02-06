import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UCPInfoSection = () => {
  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Learn About UCP</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="what-is-ucp">
          <AccordionTrigger className="hover:no-underline text-sm font-semibold">
            What is UCP?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              UCP (Universal Commerce Protocol) is Google's open-source standard for AI-driven
              commerce. It provides a unified way for ecommerce stores to expose their capabilities
              to AI agents, enabling automated product discovery, checkout, payment processing, and
              more. UCP standardizes how AI systems interact with online stores, creating a seamless
              bridge between artificial intelligence and commerce platforms.
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
              declarations, capabilities, payment handlers, and signing keys.
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
              human intervention.
            </p>
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
          href="https://github.com/anthropics/ucp"
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
