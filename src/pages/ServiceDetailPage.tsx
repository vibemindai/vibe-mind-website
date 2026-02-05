import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import RelatedServices from "@/components/services/RelatedServices";
import { SEOHead, ServiceSchema, BreadcrumbSchema } from "@/components/seo";
import { getCategoryBySlug } from "@/data/serviceCategories";
import { getCapabilityBySlug, getIcon } from "@/data/aiCapabilities";

const ServiceDetailPage = () => {
  const { categorySlug, serviceSlug } = useParams<{
    categorySlug: string;
    serviceSlug: string;
  }>();

  const category = getCategoryBySlug(categorySlug || "");
  const service = getCapabilityBySlug(serviceSlug || "");

  if (!category || !service || service.category !== category.categoryKey) {
    return <Navigate to="/services" replace />;
  }

  const ServiceIcon = getIcon(service.icon);

  const breadcrumbItems = [
    { label: "Services", href: "/services" },
    { label: category.name, href: `/services/${category.slug}` },
    { label: service.title },
  ];

  const schemaBreadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: category.name, url: `/services/${category.slug}` },
    {
      name: service.title,
      url: `/services/${category.slug}/${service.slug}`,
    },
  ];

  const serviceUrl = `/services/${category.slug}/${service.slug}`;

  return (
    <FooterWrapper>
      <SEOHead
        title={`${service.title} Services | ${category.name} | Vibe Mind AI`}
        description={service.metaDescription}
        canonicalUrl={serviceUrl}
        keywords={service.keywords}
      />
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        category={category.name}
        url={serviceUrl}
      />
      <BreadcrumbSchema items={schemaBreadcrumbs} />

      <div className="min-h-screen bg-background relative">
        <UnifiedNavigation />

        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb */}
            <AnimatedSection delay={0}>
              <ServiceBreadcrumb items={breadcrumbItems} />
            </AnimatedSection>

            {/* Hero Section */}
            <AnimatedSection delay={0.1}>
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <ServiceIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/services/${category.slug}`}
                      className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-3 hover:bg-primary/20 transition-colors"
                    >
                      {category.name}
                    </Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {service.title}
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                      {service.metaDescription}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Schedule a Call
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Description */}
              <AnimatedSection delay={0.2} className="lg:col-span-2">
                <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50">
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>

              {/* Benefits Sidebar */}
              <AnimatedSection delay={0.3}>
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Use Cases Section */}
            <AnimatedSection delay={0.4}>
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-center">Use Cases</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {service.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="p-4 rounded-xl bg-card/30 border border-border/30 text-center hover:border-primary/30 hover:bg-card/50 transition-all"
                    >
                      <span className="text-sm font-medium">{useCase}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* How It Works Section */}
            <AnimatedSection delay={0.5}>
              <div className="mb-16 py-12 px-8 rounded-2xl bg-card/30 border border-border/30">
                <h2 className="text-2xl font-semibold mb-8 text-center">How We Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "01",
                      title: "Consultation",
                      description: "We understand your needs and goals",
                    },
                    {
                      step: "02",
                      title: "Design",
                      description: "We architect the optimal solution",
                    },
                    {
                      step: "03",
                      title: "Development",
                      description: "We build and rigorously test",
                    },
                    {
                      step: "04",
                      title: "Deployment",
                      description: "We launch and provide support",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="relative text-center"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-lg mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Related Services */}
            <AnimatedSection delay={0.6}>
              <RelatedServices
                currentServiceSlug={service.slug}
                categoryKey={category.categoryKey}
                categorySlug={category.slug}
              />
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection delay={0.7}>
              <div className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Get Started with {service.title}?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let our experts help you implement {service.title.toLowerCase()} solutions
                  tailored to your business needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to={`/services/${category.slug}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    View More {category.name} Services
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default ServiceDetailPage;
