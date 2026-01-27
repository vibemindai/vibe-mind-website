import { Helmet } from "react-helmet-async";

interface ServiceSchemaProps {
  name: string;
  description: string;
  category: string;
  url: string;
}

const ServiceSchema = ({ name, description, category, url }: ServiceSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Vibe Mind AI",
      url: "https://vibemindsolutions.ai",
      logo: "https://vibemindsolutions.ai/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8281442486",
        contactType: "customer service",
        areaServed: ["IN", "QA", "US", "World"],
        availableLanguage: ["English", "Malayalam", "Hindi"],
      },
    },
    serviceType: "AI/ML Development",
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    category: category,
    url: `https://vibemindsolutions.ai${url}`,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
