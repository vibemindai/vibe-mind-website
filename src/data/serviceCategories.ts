export interface CategoryConfig {
  slug: string;
  name: string;
  categoryKey: string;
  description: string;
  metaDescription: string;
  icon: string;
}

export const serviceCategories: CategoryConfig[] = [
  {
    slug: "conversational-ai",
    name: "Conversational AI",
    categoryKey: "conversational",
    icon: "MessageSquare",
    description: "Build intelligent conversational experiences that understand, engage, and delight your customers. Our conversational AI solutions leverage advanced NLP, intent recognition, and sentiment analysis to create chatbots, voice assistants, and multilingual support systems that feel natural and human-like.",
    metaDescription: "Conversational AI services including chatbots, voice assistants, NLP, sentiment analysis, and multilingual support. Transform customer engagement with intelligent AI.",
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    categoryKey: "ml",
    icon: "Brain",
    description: "Harness the power of machine learning to build intelligent systems that learn, adapt, and improve. From neural networks to deep learning models, we develop custom ML solutions including model training, transfer learning, reinforcement learning, AutoML, and MLOps for production-ready AI.",
    metaDescription: "Machine learning services including neural networks, deep learning, model training, transfer learning, AutoML, and MLOps. Build intelligent AI systems.",
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    categoryKey: "vision",
    icon: "Eye",
    description: "Transform visual data into actionable insights with computer vision AI. We build solutions for image recognition, object detection, facial recognition, OCR, video analytics, medical imaging, and quality inspection that see and understand the world like humans do.",
    metaDescription: "Computer vision services including image recognition, object detection, facial recognition, OCR, video analytics, and medical imaging AI.",
  },
  {
    slug: "data-analytics",
    name: "Data & Analytics",
    categoryKey: "analytics",
    icon: "BarChart3",
    description: "Turn data into competitive advantage with AI-powered analytics. Our solutions include predictive analytics, real-time processing, data pipelines, anomaly detection, trend forecasting, business intelligence, and customer analytics that drive smarter decisions.",
    metaDescription: "Data analytics AI services including predictive analytics, real-time processing, anomaly detection, trend forecasting, and business intelligence.",
  },
  {
    slug: "generative-ai",
    name: "LLM & Generative AI",
    categoryKey: "generative",
    icon: "Sparkles",
    description: "Unlock the power of large language models and generative AI for your business. We specialize in LLM integration, custom GPT solutions, RAG systems, prompt engineering, content generation, code generation, and AI writing assistants that create, compose, and communicate.",
    metaDescription: "Generative AI services including LLM integration, custom GPT, RAG systems, prompt engineering, content generation, and AI writing assistants.",
  },
  {
    slug: "automation",
    name: "Automation",
    categoryKey: "automation",
    icon: "Workflow",
    description: "Automate intelligently with AI-powered workflow solutions. We build workflow automation, RPA, process optimization, smart scheduling, automated testing, CI/CD integration, and DevOps automation that reduce manual effort and accelerate operations.",
    metaDescription: "AI automation services including workflow automation, RPA, process optimization, smart scheduling, automated testing, and DevOps automation.",
  },
  {
    slug: "enterprise-solutions",
    name: "Enterprise Solutions",
    categoryKey: "enterprise",
    icon: "Network",
    description: "Scale AI across your enterprise with robust, secure solutions. Our enterprise offerings include AI integration, API development, cloud AI services, edge deployment, AI security, compliance automation, and knowledge management for organization-wide intelligence.",
    metaDescription: "Enterprise AI solutions including API development, cloud AI, edge deployment, AI security, compliance automation, and knowledge management.",
  },
  {
    slug: "specialized-solutions",
    name: "Specialized Solutions",
    categoryKey: "specialized",
    icon: "Lightbulb",
    description: "Industry-specific AI solutions tailored to your domain. We build specialized AI for healthcare, fintech, legal, e-commerce, supply chain, and HR & recruitment that understand your unique challenges and regulatory requirements.",
    metaDescription: "Specialized AI solutions for healthcare, fintech, legal, e-commerce, supply chain, and HR & recruitment industries.",
  },
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): CategoryConfig | undefined => {
  return serviceCategories.find((cat) => cat.slug === slug);
};

// Helper function to get category by key
export const getCategoryByKey = (key: string): CategoryConfig | undefined => {
  return serviceCategories.find((cat) => cat.categoryKey === key);
};
