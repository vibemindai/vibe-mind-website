import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getCapabilitiesByCategory, getIcon } from "@/data/aiCapabilities";

interface RelatedServicesProps {
  currentServiceSlug: string;
  categoryKey: string;
  categorySlug: string;
  limit?: number;
}

const RelatedServices = ({
  currentServiceSlug,
  categoryKey,
  categorySlug,
  limit = 3,
}: RelatedServicesProps) => {
  const allServices = getCapabilitiesByCategory(categoryKey);
  const relatedServices = allServices
    .filter((service) => service.slug !== currentServiceSlug)
    .slice(0, limit);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Related Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedServices.map((service, index) => {
          const ServiceIcon = getIcon(service.icon);
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={`/services/${categorySlug}/${service.slug}`}
                className="group block h-full"
              >
                <div className="h-full p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <ServiceIcon className="w-5 h-5 text-primary" />
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
  );
};

export default RelatedServices;
