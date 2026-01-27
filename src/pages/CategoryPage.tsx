import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { serviceCategories, getCategoryBySlug } from "@/data/serviceCategories";
import { getCapabilitiesByCategory, getIcon } from "@/data/aiCapabilities";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");

  if (!category) {
    return <Navigate to="/services" replace />;
  }

  const services = getCapabilitiesByCategory(category.categoryKey);
  const CategoryIcon = getIcon(category.icon);

  const breadcrumbItems = [
    { label: "Services", href: "/services" },
    { label: category.name },
  ];

  const schemaBreadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: category.name, url: `/services/${category.slug}` },
  ];

  // Get other categories for navigation
  const otherCategories = serviceCategories.filter(
    (cat) => cat.slug !== category.slug
  );

  return (
    <FooterWrapper>
      <SEOHead
        title={`${category.name} Services | AI Solutions | Vibe Mind AI`}
        description={category.metaDescription}
        canonicalUrl={`/services/${category.slug}`}
        keywords={[category.name.toLowerCase(), "AI services", "Vibe Mind AI"]}
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

            {/* Category Hero */}
            <AnimatedSection delay={0.1}>
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                  <CategoryIcon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {category.name}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
            </AnimatedSection>

            {/* Services Grid */}
            <AnimatedSection delay={0.2}>
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 text-center">
                  Our {category.name} Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, index) => {
                    const ServiceIcon = getIcon(service.icon);
                    return (
                      <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Link
                          to={`/services/${category.slug}/${service.slug}`}
                          className="group block h-full"
                        >
                          <div className="h-full p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <ServiceIcon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                                  {service.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {service.metaDescription}
                                </p>
                                <span className="inline-flex items-center gap-1 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  Learn more <ArrowRight className="w-4 h-4" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Why Choose Us Section */}
            <AnimatedSection delay={0.3}>
              <div className="mb-16 py-12 px-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                <h2 className="text-2xl font-semibold mb-8 text-center">
                  Why Choose Vibe Mind AI for {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Expert Team",
                      description:
                        "Skilled AI engineers with deep domain expertise",
                    },
                    {
                      title: "Proven Results",
                      description:
                        "Track record of successful implementations",
                    },
                    {
                      title: "Custom Solutions",
                      description: "Tailored to your specific business needs",
                    },
                    {
                      title: "Ongoing Support",
                      description:
                        "Continuous optimization and maintenance",
                    },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Other Categories */}
            <AnimatedSection delay={0.4}>
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 text-center">
                  Explore Other AI Solutions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {otherCategories.slice(0, 4).map((cat) => {
                    const CatIcon = getIcon(cat.icon);
                    return (
                      <Link
                        key={cat.slug}
                        to={`/services/${cat.slug}`}
                        className="group p-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all text-center"
                      >
                        <CatIcon className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection delay={0.5}>
              <div className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Transform Your Business with {category.name}?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's discuss how our AI solutions can help you achieve your
                  goals. Get in touch with our experts today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    View All Services
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

export default CategoryPage;
