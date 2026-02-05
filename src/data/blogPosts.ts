// Blog Post Data Types and Sample Content

export type BlogCategory =
  | "conversational-ai"
  | "machine-learning"
  | "llms-genai"
  | "automation"
  | "enterprise"
  | "industry-insights";

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogPostSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  image: string;
  imageAlt: string;
  featured: boolean;
  tags: string[];
  seo: BlogPostSEO;
}

// Category display configuration
export const categoryConfig: Record<BlogCategory, { label: string; icon: string; color: string }> =
  {
    "conversational-ai": {
      label: "AI Trends",
      icon: "🤖",
      color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    "machine-learning": {
      label: "ML/Data",
      icon: "📊",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    "llms-genai": {
      label: "LLMs & RAG",
      icon: "🧠",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    automation: {
      label: "Automation",
      icon: "⚙️",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    enterprise: {
      label: "Enterprise",
      icon: "🏢",
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    "industry-insights": {
      label: "Insights",
      icon: "💡",
      color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    },
  };

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "conversational-ai-transforming-customer-experience-2026",
    title: "How Conversational AI is Transforming Customer Experience in 2026",
    excerpt:
      "Discover how leading enterprises are leveraging AI chatbots and voice assistants to deliver personalized, 24/7 customer support that scales with your business needs while reducing operational costs.",
    category: "conversational-ai",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-25",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop",
    imageAlt: "AI chatbot interface showing conversation flow",
    featured: true,
    tags: ["chatbots", "customer service", "voice ai", "automation"],
    seo: {
      title: "How Conversational AI is Transforming Customer Experience | Vibe Mind",
      description:
        "Learn how enterprises leverage AI chatbots and voice assistants for personalized 24/7 customer support. Discover strategies for scaling customer service with AI.",
      keywords: [
        "conversational ai",
        "customer experience",
        "ai chatbots",
        "voice assistants",
        "customer support automation",
      ],
    },
  },
  {
    id: "2",
    slug: "building-production-ready-rag-systems-llamaindex",
    title: "Building Production-Ready RAG Systems with LlamaIndex",
    excerpt:
      "A comprehensive guide to implementing retrieval-augmented generation in enterprise environments. Learn best practices for chunking, embedding strategies, and vector database selection.",
    category: "llms-genai",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-22",
    readingTime: 12,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    imageAlt: "Abstract visualization of neural network connections",
    featured: false,
    tags: ["rag", "llamaindex", "vector databases", "enterprise ai"],
    seo: {
      title: "Building Production-Ready RAG Systems with LlamaIndex | Vibe Mind",
      description:
        "Complete guide to implementing RAG systems in enterprise. Learn chunking strategies, embedding techniques, and vector database selection for production AI.",
      keywords: [
        "rag systems",
        "llamaindex",
        "retrieval augmented generation",
        "vector databases",
        "enterprise llm",
      ],
    },
  },
  {
    id: "3",
    slug: "rpa-ai-revolutionizing-enterprise-workflows",
    title: "How RPA and AI Are Revolutionizing Enterprise Workflows",
    excerpt:
      "Discover the power of intelligent automation combining robotic process automation with AI capabilities. Learn how organizations are achieving 60% efficiency gains.",
    category: "automation",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-18",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=450&fit=crop",
    imageAlt: "Robotic arm in modern manufacturing facility",
    featured: false,
    tags: ["rpa", "automation", "enterprise", "workflow optimization"],
    seo: {
      title: "RPA and AI: Revolutionizing Enterprise Workflows | Vibe Mind",
      description:
        "Learn how combining RPA with AI creates intelligent automation. Discover strategies for achieving 60% efficiency gains in enterprise workflows.",
      keywords: [
        "rpa automation",
        "intelligent automation",
        "enterprise workflows",
        "robotic process automation",
        "ai automation",
      ],
    },
  },
  {
    id: "4",
    slug: "predictive-analytics-business-growth-strategies",
    title: "Predictive Analytics for Business Growth: A Strategic Guide",
    excerpt:
      "Learn how data-driven decisions powered by machine learning can forecast trends, optimize operations, and unlock new revenue streams for your organization.",
    category: "machine-learning",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-15",
    readingTime: 9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    imageAlt: "Data analytics dashboard with charts and graphs",
    featured: false,
    tags: ["predictive analytics", "machine learning", "business intelligence", "data science"],
    seo: {
      title: "Predictive Analytics for Business Growth | Vibe Mind",
      description:
        "Strategic guide to leveraging predictive analytics and ML for business growth. Learn to forecast trends and optimize operations with data-driven insights.",
      keywords: [
        "predictive analytics",
        "business growth",
        "machine learning analytics",
        "data-driven decisions",
        "business intelligence",
      ],
    },
  },
  {
    id: "5",
    slug: "rise-of-ai-agents-2026",
    title: "The Rise of AI Agents: Autonomous Systems in 2026",
    excerpt:
      "Explore the emergence of autonomous AI agents that can plan, reason, and execute complex tasks. From customer service to software development, agents are reshaping work.",
    category: "llms-genai",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-12",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    imageAlt: "Futuristic robot representing AI agent technology",
    featured: false,
    tags: ["ai agents", "autonomous systems", "langchain", "llm applications"],
    seo: {
      title: "The Rise of AI Agents: Autonomous Systems in 2026 | Vibe Mind",
      description:
        "Explore autonomous AI agents that plan, reason, and execute complex tasks. Learn how agents are transforming customer service and software development.",
      keywords: ["ai agents", "autonomous ai", "llm agents", "langchain", "ai automation"],
    },
  },
  {
    id: "6",
    slug: "enterprise-ai-adoption-roadmap",
    title: "Enterprise AI Adoption: A Practical Roadmap for 2026",
    excerpt:
      "A step-by-step guide for enterprises looking to adopt AI technologies. Learn about organizational readiness, pilot projects, and scaling strategies.",
    category: "enterprise",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-10",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    imageAlt: "Business team discussing strategy around a conference table",
    featured: false,
    tags: ["enterprise ai", "digital transformation", "ai strategy", "change management"],
    seo: {
      title: "Enterprise AI Adoption Roadmap 2026 | Vibe Mind",
      description:
        "Practical guide for enterprise AI adoption. Learn organizational readiness assessment, pilot project strategies, and scaling approaches.",
      keywords: [
        "enterprise ai adoption",
        "ai strategy",
        "digital transformation",
        "ai roadmap",
        "organizational change",
      ],
    },
  },
  {
    id: "7",
    slug: "voice-ai-next-frontier-customer-interaction",
    title: "Voice AI: The Next Frontier in Customer Interaction",
    excerpt:
      "Voice-first interfaces are becoming the preferred channel for customer interactions. Discover how to build voice experiences that delight users and drive business results.",
    category: "conversational-ai",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-08",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=450&fit=crop",
    imageAlt: "Smart speaker device with voice waves visualization",
    featured: false,
    tags: ["voice ai", "conversational interfaces", "customer experience", "speech recognition"],
    seo: {
      title: "Voice AI: The Next Frontier in Customer Interaction | Vibe Mind",
      description:
        "Build voice-first interfaces that delight customers. Learn voice AI strategies for improving customer interactions and driving business results.",
      keywords: [
        "voice ai",
        "voice interfaces",
        "customer interaction",
        "speech recognition",
        "conversational ai",
      ],
    },
  },
  {
    id: "8",
    slug: "ai-healthcare-transforming-patient-outcomes",
    title: "AI in Healthcare: Transforming Patient Outcomes",
    excerpt:
      "From diagnostic assistance to personalized treatment plans, AI is revolutionizing healthcare delivery. Learn how leading hospitals are implementing AI solutions.",
    category: "industry-insights",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-05",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
    imageAlt: "Medical professional using AI-powered diagnostic tools",
    featured: false,
    tags: ["healthcare ai", "medical diagnostics", "patient care", "health tech"],
    seo: {
      title: "AI in Healthcare: Transforming Patient Outcomes | Vibe Mind",
      description:
        "Explore how AI transforms healthcare with diagnostic assistance and personalized treatment. Learn implementation strategies from leading hospitals.",
      keywords: [
        "ai healthcare",
        "medical ai",
        "patient outcomes",
        "diagnostic ai",
        "health technology",
      ],
    },
  },
  {
    id: "9",
    slug: "fine-tuning-llms-domain-specific-applications",
    title: "Fine-Tuning LLMs for Domain-Specific Applications",
    excerpt:
      "Master the art of customizing large language models for your specific use case. Learn techniques from LoRA to full fine-tuning and when to use each approach.",
    category: "llms-genai",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-03",
    readingTime: 11,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop",
    imageAlt: "Abstract AI brain visualization with neural connections",
    featured: false,
    tags: ["llm fine-tuning", "lora", "transfer learning", "custom ai models"],
    seo: {
      title: "Fine-Tuning LLMs for Domain-Specific Applications | Vibe Mind",
      description:
        "Complete guide to fine-tuning large language models. Learn LoRA, full fine-tuning techniques, and when to use each approach for custom AI solutions.",
      keywords: [
        "llm fine-tuning",
        "lora",
        "domain specific llm",
        "custom ai models",
        "transfer learning",
      ],
    },
  },
  {
    id: "10",
    slug: "mlops-best-practices-production-ai",
    title: "MLOps Best Practices for Production AI Systems",
    excerpt:
      "Deploy and maintain machine learning models at scale with confidence. Learn MLOps fundamentals including CI/CD, monitoring, and model versioning.",
    category: "machine-learning",
    author: {
      name: "Vibe Mind Team",
      avatar: "/logo.png",
    },
    publishedAt: "2026-01-01",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
    imageAlt: "Server room with modern infrastructure",
    featured: false,
    tags: ["mlops", "model deployment", "ml infrastructure", "ci/cd"],
    seo: {
      title: "MLOps Best Practices for Production AI | Vibe Mind",
      description:
        "Deploy and maintain ML models at scale. Learn MLOps fundamentals including CI/CD pipelines, monitoring strategies, and model versioning best practices.",
      keywords: [
        "mlops",
        "ml deployment",
        "production ai",
        "model monitoring",
        "ml infrastructure",
      ],
    },
  },
];

// Helper function to get featured post
export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find((post) => post.featured) || blogPosts[0];
};

// Helper function to get posts excluding featured
export const getNonFeaturedPosts = (): BlogPost[] => {
  const featured = getFeaturedPost();
  return blogPosts.filter((post) => post.id !== featured?.id);
};

// Helper function to filter posts by category
export const getPostsByCategory = (category: BlogCategory | "all"): BlogPost[] => {
  if (category === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
};

// Helper function to search posts
export const searchPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
};

// Helper function to paginate posts
export const paginatePosts = (
  posts: BlogPost[],
  page: number,
  perPage: number = 6,
): { posts: BlogPost[]; totalPages: number; totalPosts: number } => {
  const startIndex = (page - 1) * perPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + perPage);
  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(posts.length / perPage),
    totalPosts: posts.length,
  };
};

// Get all unique categories from posts
export const getAllCategories = (): BlogCategory[] => {
  return [...new Set(blogPosts.map((post) => post.category))];
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

// Get adjacent (previous and next) posts for navigation
export const getAdjacentPosts = (
  slug: string,
): { prevPost: BlogPost | null; nextPost: BlogPost | null } => {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  // Posts are ordered by date (newest first), so prev is newer, next is older
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
};

// Get related posts based on category and tags
export const getRelatedPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
  const otherPosts = blogPosts.filter((p) => p.id !== post.id);

  // Score posts by relevance
  const scoredPosts = otherPosts.map((p) => {
    let score = 0;

    // Same category gets high priority
    if (p.category === post.category) {
      score += 10;
    }

    // Count shared tags
    const sharedTags = p.tags.filter((tag) => post.tags.includes(tag));
    score += sharedTags.length * 2;

    return { post: p, score };
  });

  // Sort by score (descending) and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
};
