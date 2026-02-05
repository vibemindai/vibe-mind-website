import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";
import { SEOHead } from "@/components/seo";

const PrivacyPolicyPage = () => {
  return (
    <FooterWrapper>
      <SEOHead
        title="Privacy Policy | Vibe Mind AI Solutions"
        description="Read the Privacy Policy of Vibe Mind AI Solutions. Learn how we collect, use, and protect your personal information when using our AI services."
        keywords={[
          "privacy policy",
          "data protection",
          "vibe mind ai privacy",
          "personal data",
          "cookie policy",
        ]}
        canonicalUrl="/privacy-policy"
      />
      <div className="min-h-screen bg-background">
        <UnifiedNavigation />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection delay={0}>
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                  <p className="text-muted-foreground">Last Updated: February 3, 2026</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    At <strong className="text-foreground">Vibe Mind AI Solutions</strong>, we are
                    committed to protecting your privacy and ensuring the security of your personal
                    information. This Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you visit our website or use our services.
                  </p>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      1. Information We Collect
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Personal Information:</strong> Name,
                        email address, phone number, and company name when you contact us or request
                        our services.
                      </li>
                      <li>
                        <strong className="text-foreground">Usage Data:</strong> Information about
                        how you interact with our website, including pages visited, time spent, and
                        navigation patterns.
                      </li>
                      <li>
                        <strong className="text-foreground">Device Information:</strong> Browser
                        type, operating system, IP address, and device identifiers.
                      </li>
                      <li>
                        <strong className="text-foreground">Communication Data:</strong> Records of
                        correspondence when you contact us via email, phone, or WhatsApp.
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      2. How We Use Your Information
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      We use the collected information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>To provide, maintain, and improve our AI services and solutions</li>
                      <li>To respond to your inquiries and fulfill your requests</li>
                      <li>To send you project updates and relevant communications</li>
                      <li>To analyze website usage and improve user experience</li>
                      <li>To comply with legal obligations and protect our rights</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      3. Information Sharing and Disclosure
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      We do not sell, trade, or rent your personal information to third parties. We
                      may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Service Providers:</strong> With trusted
                        third-party vendors who assist us in operating our website and delivering
                        services
                      </li>
                      <li>
                        <strong className="text-foreground">Legal Requirements:</strong> When
                        required by law or to respond to legal process
                      </li>
                      <li>
                        <strong className="text-foreground">Business Transfers:</strong> In
                        connection with a merger, acquisition, or sale of assets
                      </li>
                      <li>
                        <strong className="text-foreground">With Your Consent:</strong> When you
                        have given us explicit permission
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      4. Data Security
                    </h2>
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational measures to protect your
                      personal information against unauthorized access, alteration, disclosure, or
                      destruction. However, no method of transmission over the Internet is 100%
                      secure, and we cannot guarantee absolute security.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      5. Cookies and Tracking Technologies
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Our website may use cookies and similar tracking technologies to enhance your
                      browsing experience and collect usage data. You can control cookie preferences
                      through your browser settings.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Essential Cookies:</strong> Required for
                        basic website functionality
                      </li>
                      <li>
                        <strong className="text-foreground">Analytics Cookies:</strong> Help us
                        understand how visitors interact with our website
                      </li>
                      <li>
                        <strong className="text-foreground">Preference Cookies:</strong> Remember
                        your settings and preferences
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      6. Your Rights
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Depending on your location, you may have the following rights regarding your
                      personal data:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Access and obtain a copy of your personal data</li>
                      <li>Request correction of inaccurate information</li>
                      <li>Request deletion of your personal data</li>
                      <li>Object to or restrict processing of your data</li>
                      <li>Data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      7. Third-Party Services
                    </h2>
                    <p className="text-muted-foreground">
                      Our website may contain links to third-party websites or integrate with
                      third-party services. We are not responsible for the privacy practices of
                      these external sites. We encourage you to review their privacy policies before
                      providing any personal information.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      8. Children's Privacy
                    </h2>
                    <p className="text-muted-foreground">
                      Our services are not directed to individuals under the age of 18. We do not
                      knowingly collect personal information from children. If we become aware that
                      we have collected data from a child, we will take steps to delete such
                      information.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      9. International Data Transfers
                    </h2>
                    <p className="text-muted-foreground">
                      As we serve clients in India, Qatar, and the United States, your information
                      may be transferred to and processed in countries other than your country of
                      residence. We ensure appropriate safeguards are in place to protect your data
                      during such transfers.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      10. Changes to This Privacy Policy
                    </h2>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time to reflect changes in our
                      practices or for legal, operational, or regulatory reasons. We will notify you
                      of any material changes by posting the updated policy on this page with a new
                      "Last Updated" date.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-primary">
                      11. Contact Us
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions, concerns, or requests regarding this Privacy Policy
                      or our data practices, please contact us:
                    </p>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">Vibe Mind AI Solutions</p>
                      <p className="text-muted-foreground">
                        Email:{" "}
                        <a
                          href="mailto:info@vibemindsolutions.ai"
                          className="text-primary hover:underline"
                        >
                          info@vibemindsolutions.ai
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        Phone:{" "}
                        <a href="tel:+918921442486" className="text-primary hover:underline">
                          +91 89 21 442 486
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        WhatsApp:{" "}
                        <a
                          href="https://wa.me/918921442486"
                          className="text-primary hover:underline"
                        >
                          +91 89 21 442 486
                        </a>
                      </p>
                      <p className="text-muted-foreground">Location: Kerala, India</p>
                    </div>
                  </section>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default PrivacyPolicyPage;
