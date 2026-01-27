/**
 * Sitemap Generator Script
 * Generates sitemap.xml with all static, category, and service pages
 * Run: npx tsx scripts/generate-sitemap.ts
 */

import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://vibemind.in";
const TODAY = new Date().toISOString().split("T")[0];

// Static pages
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/services", priority: "0.9", changefreq: "weekly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
];

// Category configurations
const serviceCategories = [
  { slug: "conversational-ai", categoryKey: "conversational" },
  { slug: "machine-learning", categoryKey: "ml" },
  { slug: "computer-vision", categoryKey: "vision" },
  { slug: "data-analytics", categoryKey: "analytics" },
  { slug: "generative-ai", categoryKey: "generative" },
  { slug: "automation", categoryKey: "automation" },
  { slug: "enterprise-solutions", categoryKey: "enterprise" },
  { slug: "specialized-solutions", categoryKey: "specialized" },
];

// Service slugs organized by category
const servicesByCategory: Record<string, string[]> = {
  conversational: [
    "chatbot-development",
    "voice-assistants",
    "natural-language-processing",
    "sentiment-analysis",
    "intent-recognition",
    "multi-language-support",
    "conversational-analytics",
  ],
  ml: [
    "neural-networks",
    "deep-learning-models",
    "model-training-fine-tuning",
    "transfer-learning",
    "reinforcement-learning",
    "automl-solutions",
    "mlops-deployment",
  ],
  vision: [
    "image-recognition",
    "object-detection",
    "facial-recognition",
    "ocr-document-processing",
    "video-analytics",
    "medical-imaging-ai",
    "quality-inspection",
  ],
  analytics: [
    "predictive-analytics",
    "real-time-processing",
    "data-pipeline-automation",
    "anomaly-detection",
    "trend-forecasting",
    "business-intelligence-ai",
    "customer-analytics",
  ],
  generative: [
    "llm-integration",
    "custom-gpt-solutions",
    "rag-systems",
    "prompt-engineering",
    "content-generation",
    "code-generation",
    "ai-writing-assistants",
  ],
  automation: [
    "workflow-automation",
    "rpa-solutions",
    "process-optimization",
    "smart-scheduling",
    "automated-testing",
    "ci-cd-ai-integration",
    "devops-automation",
  ],
  enterprise: [
    "enterprise-ai-integration",
    "api-development",
    "cloud-ai-services",
    "edge-ai-deployment",
    "ai-security-solutions",
    "compliance-automation",
    "knowledge-management",
  ],
  specialized: [
    "healthcare-ai",
    "fintech-ai",
    "legal-ai",
    "e-commerce-ai",
    "supply-chain-ai",
    "hr-recruitment-ai",
  ],
};

function generateSitemap(): string {
  const urls: string[] = [];

  // Add static pages
  for (const page of staticPages) {
    urls.push(`  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  // Add category pages
  for (const category of serviceCategories) {
    urls.push(`  <url>
    <loc>${BASE_URL}/services/${category.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Add service detail pages
  for (const category of serviceCategories) {
    const services = servicesByCategory[category.categoryKey] || [];
    for (const serviceSlug of services) {
      urls.push(`  <url>
    <loc>${BASE_URL}/services/${category.slug}/${serviceSlug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), "public", "sitemap.xml");

fs.writeFileSync(outputPath, sitemap, "utf-8");

// Count URLs
const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log(`Sitemap generated successfully!`);
console.log(`Total URLs: ${urlCount}`);
console.log(`Output: ${outputPath}`);
