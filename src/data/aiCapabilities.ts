import {
  MessageSquare,
  Brain,
  BarChart3,
  Zap,
  Monitor,
  Settings,
  Sparkles,
  Eye,
  Mic,
  Code2,
  Database,
  Globe,
  Shield,
  Cpu,
  Network,
  FileText,
  Bot,
  Workflow,
  LineChart,
  Search,
  Image,
  Video,
  HeartPulse,
  Wallet,
  Scale,
  ShoppingCart,
  Truck,
  Users,
  Lightbulb,
  Layers,
  Cloud,
  Lock,
  Gauge,
  Target,
  Wand2,
  PenTool,
  type LucideIcon,
} from "lucide-react";

export interface Capability {
  icon: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  benefits: string[];
  useCases: string[];
}

export const capabilities: Capability[] = [
  // Category 1: Conversational AI (7 services)
  {
    icon: "MessageSquare",
    title: "Chatbot Development",
    slug: "chatbot-development",
    category: "conversational",
    description:
      "Transform customer engagement with intelligent chatbot solutions. Our AI-powered chatbots handle customer inquiries 24/7, automate support workflows, and integrate seamlessly with your existing systems. We build custom chatbots using advanced NLP and machine learning to understand context, sentiment, and intent, delivering human-like conversations that drive satisfaction and reduce operational costs.",
    metaDescription:
      "Build intelligent AI chatbots for your business. Custom chatbot development with NLP, 24/7 support automation, and seamless integrations. Get started today.",
    keywords: [
      "chatbot development",
      "AI chatbot",
      "custom chatbot",
      "chatbot services",
      "conversational AI chatbot",
      "business chatbot",
    ],
    benefits: [
      "24/7 automated customer support",
      "Reduced response times",
      "Lower operational costs",
      "Seamless CRM integration",
      "Multi-platform deployment",
    ],
    useCases: [
      "Customer support automation",
      "Lead qualification",
      "Appointment scheduling",
      "FAQ handling",
      "E-commerce assistance",
    ],
  },
  {
    icon: "Mic",
    title: "Voice Assistants",
    slug: "voice-assistants",
    category: "conversational",
    description:
      "Empower your applications with voice-enabled AI assistants. We develop custom voice solutions that understand natural speech, process complex commands, and respond with human-like voice synthesis. From smart speakers to mobile apps, our voice assistants integrate advanced speech recognition and NLU to create intuitive hands-free experiences for your users.",
    metaDescription:
      "Create custom AI voice assistants for your business. Voice-enabled applications with speech recognition, natural language understanding, and voice synthesis.",
    keywords: [
      "voice assistant development",
      "AI voice assistant",
      "custom voice AI",
      "speech recognition",
      "voice-enabled applications",
    ],
    benefits: [
      "Hands-free user interaction",
      "Accessibility improvement",
      "Natural language understanding",
      "Multi-language voice support",
      "Voice biometrics security",
    ],
    useCases: [
      "Smart home control",
      "Voice-enabled customer service",
      "In-car assistants",
      "Voice commerce",
      "Healthcare voice apps",
    ],
  },
  {
    icon: "FileText",
    title: "Natural Language Processing",
    slug: "natural-language-processing",
    category: "conversational",
    description:
      "Unlock the power of human language with our NLP services. We build sophisticated language models that analyze, understand, and generate text. From document classification to entity extraction, our NLP solutions transform unstructured text into actionable insights, enabling smarter decision-making and automated content workflows.",
    metaDescription:
      "Advanced NLP solutions for text analysis, language understanding, and document processing. Extract insights from unstructured data with AI.",
    keywords: [
      "natural language processing",
      "NLP services",
      "text analysis",
      "language understanding",
      "NLP solutions",
      "text mining",
    ],
    benefits: [
      "Automated text analysis",
      "Entity and relationship extraction",
      "Document classification",
      "Language generation",
      "Semantic search capabilities",
    ],
    useCases: [
      "Document processing",
      "Content categorization",
      "Email classification",
      "Contract analysis",
      "Knowledge extraction",
    ],
  },
  {
    icon: "Target",
    title: "Sentiment Analysis",
    slug: "sentiment-analysis",
    category: "conversational",
    description:
      "Understand how customers feel about your brand with AI sentiment analysis. Our solutions analyze text from reviews, social media, surveys, and support tickets to detect emotions, opinions, and attitudes. Get real-time insights into customer satisfaction, track brand perception, and identify issues before they escalate.",
    metaDescription:
      "AI-powered sentiment analysis to understand customer opinions. Analyze reviews, social media, and feedback to gauge brand perception.",
    keywords: [
      "sentiment analysis",
      "opinion mining",
      "brand sentiment",
      "customer feedback analysis",
      "social media sentiment",
      "emotion detection",
    ],
    benefits: [
      "Real-time brand monitoring",
      "Customer satisfaction tracking",
      "Crisis detection",
      "Competitive analysis",
      "Product feedback insights",
    ],
    useCases: [
      "Social media monitoring",
      "Product review analysis",
      "Customer support insights",
      "Market research",
      "Brand reputation management",
    ],
  },
  {
    icon: "Search",
    title: "Intent Recognition",
    slug: "intent-recognition",
    category: "conversational",
    description:
      "Accurately understand what users want with AI intent recognition. Our models analyze user messages to identify underlying goals, enabling precise responses and actions. Whether for chatbots, voice assistants, or search systems, we train custom intent classifiers that improve over time and handle complex, multi-intent queries.",
    metaDescription:
      "AI intent recognition to understand user goals and actions. Improve chatbot accuracy and user experience with intelligent intent detection.",
    keywords: [
      "intent recognition",
      "intent detection",
      "user intent AI",
      "conversational intent",
      "intent classification",
    ],
    benefits: [
      "Accurate user understanding",
      "Improved chatbot responses",
      "Multi-intent handling",
      "Context-aware classification",
      "Continuous learning",
    ],
    useCases: [
      "Chatbot training",
      "Voice command processing",
      "Search query understanding",
      "Customer routing",
      "Action automation",
    ],
  },
  {
    icon: "Globe",
    title: "Multi-language Support",
    slug: "multi-language-support",
    category: "conversational",
    description:
      "Reach global audiences with multilingual AI solutions. We build conversational systems that understand and respond in 100+ languages, with automatic language detection and real-time translation. Our multilingual models preserve context and cultural nuances, ensuring natural communication regardless of language barriers.",
    metaDescription:
      "AI solutions for multilingual support. Build chatbots and apps that communicate in 100+ languages with automatic translation and localization.",
    keywords: [
      "multilingual AI",
      "multi-language chatbot",
      "language translation AI",
      "multilingual NLP",
      "global AI solutions",
    ],
    benefits: [
      "Global reach expansion",
      "Automatic language detection",
      "Cultural context preservation",
      "Real-time translation",
      "Unified multilingual platform",
    ],
    useCases: [
      "Global customer support",
      "International e-commerce",
      "Multilingual chatbots",
      "Cross-border communication",
      "Localized content delivery",
    ],
  },
  {
    icon: "LineChart",
    title: "Conversational Analytics",
    slug: "conversational-analytics",
    category: "conversational",
    description:
      "Turn conversation data into strategic insights. Our analytics platform tracks chatbot performance, user engagement, conversation flows, and resolution rates. Identify bottlenecks, understand user behavior patterns, and continuously optimize your conversational AI with data-driven decisions.",
    metaDescription:
      "Analyze chatbot and conversation data for actionable insights. Track performance, user behavior, and optimize conversational experiences.",
    keywords: [
      "conversational analytics",
      "chatbot analytics",
      "conversation insights",
      "chat data analysis",
      "conversational AI metrics",
    ],
    benefits: [
      "Performance tracking",
      "User behavior insights",
      "Conversation flow optimization",
      "ROI measurement",
      "Continuous improvement",
    ],
    useCases: [
      "Chatbot optimization",
      "Support quality monitoring",
      "User journey analysis",
      "A/B testing conversations",
      "Compliance auditing",
    ],
  },

  // Category: Data & Analytics (7 services)
  {
    icon: "BarChart3",
    title: "Predictive Analytics",
    slug: "predictive-analytics",
    category: "analytics",
    description:
      "Make data-driven decisions with predictive analytics. Our AI models analyze historical data to forecast future trends, customer behavior, and business outcomes. From sales prediction to risk assessment, we build accurate forecasting systems that give you a competitive edge.",
    metaDescription:
      "AI predictive analytics for business forecasting. Predict customer behavior, sales, demand, and risks with machine learning models.",
    keywords: [
      "predictive analytics",
      "AI forecasting",
      "business prediction",
      "predictive modeling",
      "analytics AI services",
    ],
    benefits: [
      "Accurate forecasting",
      "Data-driven decisions",
      "Risk mitigation",
      "Opportunity identification",
      "Competitive advantage",
    ],
    useCases: [
      "Sales forecasting",
      "Demand planning",
      "Churn prediction",
      "Risk assessment",
      "Inventory optimization",
    ],
  },
  {
    icon: "Zap",
    title: "Real-time Processing",
    slug: "real-time-processing",
    category: "analytics",
    description:
      "Act on data as it happens with real-time processing. Our stream analytics solutions process millions of events per second, enabling instant insights, automated alerts, and immediate responses. From IoT sensor streams to financial transactions, we build systems that make decisions in milliseconds.",
    metaDescription:
      "Real-time data processing and stream analytics. Process millions of events per second for instant insights and automated responses.",
    keywords: [
      "real-time processing",
      "stream analytics",
      "real-time data",
      "event processing",
      "streaming AI",
    ],
    benefits: [
      "Instant insights",
      "Millisecond latency",
      "Scalable streaming",
      "Automated responses",
      "Live dashboards",
    ],
    useCases: [
      "Fraud detection",
      "IoT analytics",
      "Live monitoring",
      "Trading systems",
      "Real-time recommendations",
    ],
  },
  {
    icon: "Database",
    title: "Data Pipeline Automation",
    slug: "data-pipeline-automation",
    category: "analytics",
    description:
      "Streamline data operations with automated pipelines. We build intelligent ETL systems that extract, transform, and load data reliably and efficiently. Our pipelines include automated data quality checks, error handling, and self-healing capabilities to ensure your data is always ready for analysis.",
    metaDescription:
      "Automated data pipelines with AI. Build reliable ETL processes, data integration, and automated data quality management.",
    keywords: [
      "data pipeline automation",
      "ETL automation",
      "data integration",
      "automated data processing",
      "data pipeline services",
    ],
    benefits: [
      "Reliable data flows",
      "Automated quality checks",
      "Self-healing pipelines",
      "Reduced manual effort",
      "Scalable architecture",
    ],
    useCases: [
      "Data warehouse loading",
      "API data integration",
      "Multi-source aggregation",
      "Data lake management",
      "Reporting automation",
    ],
  },
  {
    icon: "Shield",
    title: "Anomaly Detection",
    slug: "anomaly-detection",
    category: "analytics",
    description:
      "Detect the unexpected with AI anomaly detection. Our systems identify unusual patterns, outliers, and deviations across any data type—transactions, network traffic, sensor readings, or user behavior. Real-time detection enables immediate response to fraud, security threats, and operational issues.",
    metaDescription:
      "AI anomaly detection for fraud, security, and operations. Identify unusual patterns and outliers in real-time across any data type.",
    keywords: [
      "anomaly detection",
      "outlier detection",
      "fraud detection AI",
      "anomaly detection services",
      "unusual pattern detection",
    ],
    benefits: [
      "Real-time detection",
      "Adaptive thresholds",
      "Multi-dimensional analysis",
      "Low false positives",
      "Continuous learning",
    ],
    useCases: [
      "Fraud prevention",
      "Security monitoring",
      "Equipment failure prediction",
      "Network intrusion detection",
      "Quality control",
    ],
  },
  {
    icon: "LineChart",
    title: "Trend Forecasting",
    slug: "trend-forecasting",
    category: "analytics",
    description:
      "Stay ahead with AI trend forecasting. Our models analyze market signals, consumer behavior, and historical patterns to predict emerging trends before they peak. Make strategic decisions with confidence using data-driven trend intelligence across markets, products, and consumer preferences.",
    metaDescription:
      "AI trend forecasting for market and business intelligence. Predict emerging trends, market shifts, and consumer behavior patterns.",
    keywords: [
      "trend forecasting",
      "market prediction",
      "trend analysis AI",
      "business forecasting",
      "trend prediction services",
    ],
    benefits: [
      "Early trend detection",
      "Market intelligence",
      "Strategic planning",
      "Competitive insights",
      "Data-driven decisions",
    ],
    useCases: [
      "Market research",
      "Product planning",
      "Investment analysis",
      "Retail buying",
      "Content strategy",
    ],
  },
  {
    icon: "Gauge",
    title: "Business Intelligence AI",
    slug: "business-intelligence-ai",
    category: "analytics",
    description:
      "Transform BI with artificial intelligence. Our AI-powered business intelligence solutions automate insight discovery, enable natural language data queries, and surface important patterns you might miss. Get intelligent dashboards that proactively alert you to opportunities and risks.",
    metaDescription:
      "AI-enhanced business intelligence for smarter decisions. Automated insights, natural language queries, and intelligent dashboards.",
    keywords: [
      "business intelligence AI",
      "AI BI",
      "intelligent analytics",
      "automated insights",
      "AI-powered BI",
    ],
    benefits: [
      "Automated insights",
      "Natural language queries",
      "Proactive alerts",
      "Pattern discovery",
      "Self-service analytics",
    ],
    useCases: [
      "Executive dashboards",
      "Sales analytics",
      "Financial reporting",
      "Operational intelligence",
      "KPI monitoring",
    ],
  },
  {
    icon: "Target",
    title: "Customer Analytics",
    slug: "customer-analytics",
    category: "analytics",
    description:
      "Understand your customers deeply with AI analytics. Our solutions analyze customer behavior across touchpoints to predict churn, identify high-value segments, personalize experiences, and optimize lifetime value. Turn customer data into actionable strategies for retention and growth.",
    metaDescription:
      "AI customer analytics for deeper insights. Understand customer behavior, predict churn, segment audiences, and optimize lifetime value.",
    keywords: [
      "customer analytics",
      "customer intelligence",
      "customer behavior AI",
      "churn prediction",
      "customer segmentation",
    ],
    benefits: [
      "Behavior insights",
      "Churn prediction",
      "Smart segmentation",
      "LTV optimization",
      "Personalization",
    ],
    useCases: [
      "Churn prevention",
      "Customer segmentation",
      "Personalization",
      "Journey analysis",
      "Loyalty optimization",
    ],
  },

  // Category 5: LLM & Generative AI (7 services)
  {
    icon: "Bot",
    title: "LLM Integration",
    slug: "llm-integration",
    category: "generative",
    description:
      "Unlock the power of large language models for your business. We integrate leading LLMs—GPT-4, Claude, Llama, and others—into your applications with secure, scalable architectures. Our implementations include prompt management, cost optimization, fallback handling, and enterprise-grade security.",
    metaDescription:
      "Integrate large language models into your applications. Connect GPT-4, Claude, and other LLMs with secure, scalable implementations.",
    keywords: [
      "LLM integration",
      "large language models",
      "GPT integration",
      "LLM services",
      "language model integration",
    ],
    benefits: [
      "Secure integration",
      "Cost optimization",
      "Multi-model support",
      "Prompt management",
      "Scalable architecture",
    ],
    useCases: [
      "Intelligent assistants",
      "Content automation",
      "Document analysis",
      "Code assistance",
      "Customer support",
    ],
  },
  {
    icon: "Sparkles",
    title: "Custom GPT Solutions",
    slug: "custom-gpt-solutions",
    category: "generative",
    description:
      "Create AI assistants that know your business. We develop custom GPT solutions trained on your proprietary data, speaking your brand voice, and expert in your domain. From customer-facing assistants to internal knowledge tools, get AI that truly understands your context.",
    metaDescription:
      "Build custom GPT solutions for your business. Tailored AI assistants trained on your data with your brand voice and domain expertise.",
    keywords: [
      "custom GPT",
      "tailored GPT",
      "custom AI assistant",
      "GPT development",
      "branded AI",
    ],
    benefits: [
      "Domain expertise",
      "Brand voice alignment",
      "Proprietary knowledge",
      "Controlled responses",
      "Continuous improvement",
    ],
    useCases: [
      "Customer support agents",
      "Internal knowledge bots",
      "Sales assistants",
      "Training companions",
      "Expert systems",
    ],
  },
  {
    icon: "Database",
    title: "RAG Systems",
    slug: "rag-systems",
    category: "generative",
    description:
      "Ground AI in your knowledge with RAG systems. Retrieval Augmented Generation combines the power of LLMs with your proprietary documents, creating AI that provides accurate, up-to-date, citation-backed responses. Eliminate hallucinations and build trust with verifiable AI answers.",
    metaDescription:
      "Build RAG systems for accurate, grounded AI responses. Combine LLMs with your knowledge base for reliable, citation-backed answers.",
    keywords: [
      "RAG systems",
      "retrieval augmented generation",
      "knowledge-grounded AI",
      "RAG implementation",
      "document AI",
    ],
    benefits: [
      "Accurate responses",
      "Source citations",
      "Up-to-date knowledge",
      "Hallucination reduction",
      "Verifiable answers",
    ],
    useCases: [
      "Enterprise knowledge base",
      "Customer support",
      "Legal research",
      "Technical documentation",
      "Compliance queries",
    ],
  },
  {
    icon: "PenTool",
    title: "Prompt Engineering",
    slug: "prompt-engineering",
    category: "generative",
    description:
      "Maximize LLM performance with expert prompt engineering. We design and optimize prompts that achieve better accuracy, consistency, and cost efficiency. Our systematic approach includes prompt testing, iteration, and documentation to create reliable, maintainable AI interactions.",
    metaDescription:
      "Expert prompt engineering to maximize LLM performance. Craft optimal prompts for accuracy, consistency, and cost efficiency.",
    keywords: [
      "prompt engineering",
      "LLM prompts",
      "prompt optimization",
      "AI prompt design",
      "prompt engineering services",
    ],
    benefits: [
      "Improved accuracy",
      "Consistent outputs",
      "Cost reduction",
      "Maintainable prompts",
      "Systematic testing",
    ],
    useCases: [
      "LLM optimization",
      "Output quality improvement",
      "Cost reduction",
      "Prompt libraries",
      "AI behavior tuning",
    ],
  },
  {
    icon: "FileText",
    title: "Content Generation",
    slug: "content-generation",
    category: "generative",
    description:
      "Scale content creation with AI generation. Our solutions produce marketing copy, blog posts, product descriptions, and documentation that match your brand voice and quality standards. Built with human-in-the-loop workflows to ensure accuracy and maintain your editorial vision.",
    metaDescription:
      "AI content generation for marketing, blogs, and documents. Scale content production with quality, brand-consistent automated writing.",
    keywords: [
      "AI content generation",
      "automated writing",
      "content AI",
      "AI copywriting",
      "content generation services",
    ],
    benefits: [
      "Scalable production",
      "Brand consistency",
      "Quality control",
      "Multi-format support",
      "Editorial workflows",
    ],
    useCases: [
      "Marketing content",
      "Product descriptions",
      "Blog articles",
      "Email campaigns",
      "Documentation",
    ],
  },
  {
    icon: "Code2",
    title: "Code Generation",
    slug: "code-generation",
    category: "generative",
    description:
      "Accelerate development with AI code generation. Our solutions help developers write, review, and refactor code faster with intelligent suggestions. From boilerplate generation to complex algorithm implementation, AI coding assistants boost productivity while maintaining code quality.",
    metaDescription:
      "AI code generation to accelerate development. Generate, review, and refactor code with intelligent AI coding assistants.",
    keywords: [
      "AI code generation",
      "automated coding",
      "code AI",
      "AI programming",
      "code generation services",
    ],
    benefits: [
      "Faster development",
      "Code quality",
      "Best practices",
      "Multi-language support",
      "Learning assistance",
    ],
    useCases: [
      "Boilerplate generation",
      "Code completion",
      "Refactoring assistance",
      "Documentation generation",
      "Test writing",
    ],
  },
  {
    icon: "Wand2",
    title: "AI Writing Assistants",
    slug: "ai-writing-assistants",
    category: "generative",
    description:
      "Enhance professional writing with AI assistants. Our writing tools go beyond grammar to help with style, tone, clarity, and structure. Whether drafting emails, reports, or creative content, get intelligent suggestions that improve communication while preserving your authentic voice.",
    metaDescription:
      "AI writing assistants for professionals. Enhance writing with grammar, style, tone adjustments, and intelligent suggestions.",
    keywords: [
      "AI writing assistant",
      "writing AI",
      "intelligent writing",
      "writing tool AI",
      "AI editor",
    ],
    benefits: [
      "Writing improvement",
      "Style guidance",
      "Tone adjustment",
      "Clarity enhancement",
      "Time savings",
    ],
    useCases: [
      "Business writing",
      "Email composition",
      "Report drafting",
      "Creative writing",
      "Academic writing",
    ],
  },

  // Category 6: Automation (7 services)
  {
    icon: "Workflow",
    title: "Workflow Automation",
    slug: "workflow-automation",
    category: "automation",
    description:
      "Streamline operations with intelligent workflow automation. Our AI solutions automate repetitive tasks, route approvals, and orchestrate complex business processes. Beyond simple automation, we add intelligence—decisions, exceptions, and optimizations that adapt to changing conditions.",
    metaDescription:
      "AI-powered workflow automation to streamline operations. Automate repetitive tasks, approvals, and business processes intelligently.",
    keywords: [
      "workflow automation",
      "process automation",
      "AI automation",
      "business automation",
      "workflow AI",
    ],
    benefits: [
      "Reduced manual work",
      "Faster processing",
      "Intelligent routing",
      "Exception handling",
      "Continuous optimization",
    ],
    useCases: [
      "Approval workflows",
      "Document processing",
      "Employee onboarding",
      "Order processing",
      "Support ticket routing",
    ],
  },
  {
    icon: "Bot",
    title: "RPA Solutions",
    slug: "rpa-solutions",
    category: "automation",
    description:
      "Automate repetitive tasks with intelligent RPA. Our robotic process automation solutions deploy software robots that work across applications, handling data entry, transfers, and routine operations. Enhanced with AI, our bots handle exceptions and learn from variations.",
    metaDescription:
      "Intelligent RPA solutions for business automation. Deploy software robots that automate repetitive tasks across applications.",
    keywords: [
      "RPA solutions",
      "robotic process automation",
      "software robots",
      "RPA services",
      "intelligent automation",
    ],
    benefits: [
      "24/7 operation",
      "Error reduction",
      "Cross-application automation",
      "Scalable workforce",
      "Quick deployment",
    ],
    useCases: [
      "Data entry automation",
      "Report generation",
      "System integration",
      "Invoice processing",
      "Employee data management",
    ],
  },
  {
    icon: "Settings",
    title: "Process Optimization",
    slug: "process-optimization",
    category: "automation",
    description:
      "Optimize operations with AI-driven process analysis. We analyze your workflows to identify bottlenecks, inefficiencies, and automation opportunities. Our solutions provide data-driven recommendations and implement improvements that reduce costs, time, and errors while improving quality.",
    metaDescription:
      "AI-driven process optimization for operational efficiency. Analyze, improve, and automate business processes with data-driven insights.",
    keywords: [
      "process optimization",
      "business process AI",
      "operational efficiency",
      "process improvement",
      "AI optimization",
    ],
    benefits: [
      "Bottleneck identification",
      "Efficiency gains",
      "Cost reduction",
      "Quality improvement",
      "Data-driven decisions",
    ],
    useCases: [
      "Manufacturing optimization",
      "Service delivery",
      "Supply chain efficiency",
      "Customer journey optimization",
      "Operational excellence",
    ],
  },
  {
    icon: "Zap",
    title: "Smart Scheduling",
    slug: "smart-scheduling",
    category: "automation",
    description:
      "Optimize schedules intelligently with AI. Our smart scheduling solutions balance constraints, preferences, and efficiency to create optimal schedules automatically. From appointment booking to workforce management to resource allocation, reduce scheduling overhead while improving utilization.",
    metaDescription:
      "AI smart scheduling for appointments, resources, and workforce. Optimize schedules automatically with intelligent algorithms.",
    keywords: [
      "smart scheduling",
      "AI scheduling",
      "intelligent scheduling",
      "automated scheduling",
      "schedule optimization",
    ],
    benefits: [
      "Optimal schedules",
      "Reduced conflicts",
      "Better utilization",
      "Preference handling",
      "Real-time adjustments",
    ],
    useCases: [
      "Appointment scheduling",
      "Workforce planning",
      "Resource allocation",
      "Meeting optimization",
      "Shift scheduling",
    ],
  },
  {
    icon: "Monitor",
    title: "Automated Testing",
    slug: "automated-testing",
    category: "automation",
    description:
      "Ensure software quality with AI-powered testing. Our solutions generate test cases, detect bugs, and maintain test suites automatically. AI identifies edge cases humans might miss, reduces test maintenance burden, and accelerates release cycles while improving coverage.",
    metaDescription:
      "AI-powered automated testing for software quality. Generate tests, detect bugs, and maintain test suites with intelligent automation.",
    keywords: [
      "automated testing",
      "AI testing",
      "intelligent QA",
      "test automation",
      "AI test generation",
    ],
    benefits: [
      "Faster testing",
      "Better coverage",
      "Reduced maintenance",
      "Bug detection",
      "Continuous testing",
    ],
    useCases: [
      "Test generation",
      "Regression testing",
      "UI testing",
      "API testing",
      "Performance testing",
    ],
  },
  {
    icon: "Code2",
    title: "CI/CD AI Integration",
    slug: "ci-cd-ai-integration",
    category: "automation",
    description:
      "Supercharge DevOps with AI-integrated CI/CD. Our solutions add intelligence to your pipelines—automated code review, smart build optimization, predictive test selection, and intelligent deployment decisions. Ship faster with confidence through AI-enhanced development workflows.",
    metaDescription:
      "Integrate AI into CI/CD pipelines. Intelligent build optimization, automated code review, and smart deployment decisions.",
    keywords: [
      "CI/CD AI",
      "DevOps AI",
      "intelligent pipelines",
      "AI code review",
      "smart deployments",
    ],
    benefits: [
      "Faster builds",
      "Smart test selection",
      "Automated review",
      "Deployment confidence",
      "Pipeline optimization",
    ],
    useCases: [
      "Build optimization",
      "Code review automation",
      "Test prioritization",
      "Deployment gating",
      "Release management",
    ],
  },
  {
    icon: "Cpu",
    title: "DevOps Automation",
    slug: "devops-automation",
    category: "automation",
    description:
      "Transform operations with AI-powered DevOps automation. From infrastructure provisioning to incident response, our solutions automate operational tasks intelligently. Predict issues before they occur, auto-remediate common problems, and optimize resource utilization with AI.",
    metaDescription:
      "AI-powered DevOps automation for infrastructure and operations. Automate provisioning, monitoring, and incident response intelligently.",
    keywords: [
      "DevOps automation",
      "infrastructure AI",
      "operations automation",
      "AIOps",
      "DevOps AI",
    ],
    benefits: [
      "Proactive operations",
      "Auto-remediation",
      "Resource optimization",
      "Faster incident response",
      "Reduced toil",
    ],
    useCases: [
      "Infrastructure provisioning",
      "Incident management",
      "Capacity planning",
      "Cost optimization",
      "Configuration management",
    ],
  },

  // Category 7: Enterprise Solutions (7 services)
  {
    icon: "Network",
    title: "Enterprise AI Integration",
    slug: "enterprise-ai-integration",
    category: "enterprise",
    description:
      "Transform your enterprise with integrated AI. We connect AI capabilities across your organization—linking with existing systems, data warehouses, and workflows. Our enterprise approach ensures governance, security, and scalability while delivering AI value across departments.",
    metaDescription:
      "Integrate AI across your enterprise. Connect AI capabilities with existing systems, data, and workflows for organization-wide intelligence.",
    keywords: [
      "enterprise AI integration",
      "business AI",
      "AI transformation",
      "enterprise intelligence",
      "AI systems integration",
    ],
    benefits: [
      "Organization-wide AI",
      "System integration",
      "Data connectivity",
      "Governance compliance",
      "Scalable architecture",
    ],
    useCases: [
      "Digital transformation",
      "System modernization",
      "Data integration",
      "Cross-department AI",
      "Enterprise automation",
    ],
  },
  {
    icon: "Code2",
    title: "API Development",
    slug: "api-development",
    category: "enterprise",
    description:
      "Build intelligent APIs that power modern applications. We develop AI-powered APIs—RESTful and GraphQL—that bring machine learning capabilities to your products. Our APIs are designed for performance, reliability, and developer experience with comprehensive documentation.",
    metaDescription:
      "Build AI-powered APIs for your applications. RESTful and GraphQL APIs with integrated machine learning and intelligent features.",
    keywords: [
      "AI API development",
      "intelligent APIs",
      "ML APIs",
      "API services",
      "AI integration APIs",
    ],
    benefits: [
      "AI-powered endpoints",
      "Scalable design",
      "Developer-friendly",
      "Comprehensive docs",
      "High performance",
    ],
    useCases: [
      "ML model serving",
      "Feature APIs",
      "Integration endpoints",
      "Product AI capabilities",
      "Partner APIs",
    ],
  },
  {
    icon: "Cloud",
    title: "Cloud AI Services",
    slug: "cloud-ai-services",
    category: "enterprise",
    description:
      "Deploy AI at scale with cloud services. We architect and implement AI solutions on AWS, Azure, and GCP, leveraging managed ML services for optimal performance and cost. Our cloud-native approach ensures scalability, reliability, and security for production AI workloads.",
    metaDescription:
      "Cloud AI services for scalable machine learning. Deploy AI on AWS, Azure, or GCP with managed infrastructure and optimal performance.",
    keywords: [
      "cloud AI services",
      "AI cloud",
      "cloud machine learning",
      "managed AI",
      "cloud AI deployment",
    ],
    benefits: [
      "Scalable infrastructure",
      "Managed services",
      "Multi-cloud support",
      "Cost optimization",
      "High availability",
    ],
    useCases: [
      "ML model deployment",
      "AI platform setup",
      "Cloud migration",
      "Scalable inference",
      "Managed training",
    ],
  },
  {
    icon: "Cpu",
    title: "Edge AI Deployment",
    slug: "edge-ai-deployment",
    category: "enterprise",
    description:
      "Bring AI to the edge for real-time, offline-capable intelligence. We optimize and deploy models on edge devices—IoT sensors, mobile phones, embedded systems, and on-premise servers. Edge AI enables low-latency decisions, data privacy, and operation without cloud connectivity.",
    metaDescription:
      "Deploy AI at the edge for real-time, offline-capable intelligence. Edge AI solutions for IoT, mobile, and embedded systems.",
    keywords: ["edge AI", "on-device AI", "embedded AI", "IoT AI", "edge deployment"],
    benefits: [
      "Low latency",
      "Offline operation",
      "Data privacy",
      "Reduced bandwidth",
      "Real-time decisions",
    ],
    useCases: [
      "IoT intelligence",
      "Mobile AI",
      "Embedded systems",
      "On-premise AI",
      "Autonomous devices",
    ],
  },
  {
    icon: "Lock",
    title: "AI Security Solutions",
    slug: "ai-security-solutions",
    category: "enterprise",
    description:
      "Protect your AI systems and leverage AI for security. We secure ML models against attacks, ensure data privacy, and implement AI-powered threat detection. Our comprehensive approach covers model security, adversarial defense, and compliance for safe enterprise AI deployment.",
    metaDescription:
      "Secure AI systems and use AI for security. Protect ML models, detect threats, and ensure safe AI deployment in enterprise environments.",
    keywords: [
      "AI security",
      "ML security",
      "AI threat detection",
      "secure AI",
      "AI security services",
    ],
    benefits: [
      "Model protection",
      "Threat detection",
      "Privacy compliance",
      "Adversarial defense",
      "Secure deployment",
    ],
    useCases: [
      "Model security",
      "Threat detection",
      "Compliance",
      "Data protection",
      "Security automation",
    ],
  },
  {
    icon: "Shield",
    title: "Compliance Automation",
    slug: "compliance-automation",
    category: "enterprise",
    description:
      "Simplify compliance with AI automation. Our solutions monitor regulatory requirements, assess compliance risks, maintain audit trails, and generate reports automatically. Stay compliant with GDPR, HIPAA, SOC2, and industry regulations without manual overhead.",
    metaDescription:
      "Automate compliance with AI. Monitor regulations, assess risks, and maintain audit trails automatically for GDPR, HIPAA, SOC2, and more.",
    keywords: [
      "compliance automation",
      "regulatory AI",
      "automated compliance",
      "compliance monitoring",
      "AI compliance",
    ],
    benefits: [
      "Automated monitoring",
      "Risk assessment",
      "Audit trails",
      "Report generation",
      "Regulatory updates",
    ],
    useCases: [
      "GDPR compliance",
      "HIPAA monitoring",
      "SOC2 audits",
      "Financial regulations",
      "Industry standards",
    ],
  },
  {
    icon: "Lightbulb",
    title: "Knowledge Management",
    slug: "knowledge-management",
    category: "enterprise",
    description:
      "Unlock organizational knowledge with AI. Our knowledge management solutions capture, organize, and surface expertise across your organization. AI-powered search, automatic categorization, and intelligent recommendations ensure the right knowledge reaches the right people at the right time.",
    metaDescription:
      "AI-powered knowledge management for enterprises. Capture, organize, and retrieve organizational knowledge with intelligent systems.",
    keywords: [
      "knowledge management AI",
      "enterprise knowledge",
      "AI knowledge base",
      "organizational intelligence",
      "knowledge systems",
    ],
    benefits: [
      "Knowledge capture",
      "Intelligent search",
      "Auto-categorization",
      "Expert identification",
      "Knowledge sharing",
    ],
    useCases: [
      "Enterprise wikis",
      "Expert finding",
      "Onboarding",
      "Support knowledge",
      "Research management",
    ],
  },

  // Category 8: Specialized Solutions (6 services)
  {
    icon: "HeartPulse",
    title: "Healthcare AI",
    slug: "healthcare-ai",
    category: "specialized",
    description:
      "Transform healthcare with specialized AI solutions. We build AI for clinical decision support, patient engagement, operational efficiency, and medical research. Our healthcare solutions meet regulatory requirements and integrate with clinical workflows to improve outcomes while reducing costs.",
    metaDescription:
      "AI solutions for healthcare and medical applications. Clinical decision support, patient engagement, and operational efficiency for healthcare.",
    keywords: [
      "healthcare AI",
      "medical AI",
      "clinical AI",
      "health tech AI",
      "healthcare AI solutions",
    ],
    benefits: [
      "Clinical support",
      "Patient engagement",
      "Operational efficiency",
      "Regulatory compliance",
      "Workflow integration",
    ],
    useCases: [
      "Clinical decision support",
      "Patient chatbots",
      "Appointment scheduling",
      "Claims processing",
      "Drug discovery",
    ],
  },
  {
    icon: "Wallet",
    title: "FinTech AI",
    slug: "fintech-ai",
    category: "specialized",
    description:
      "Innovate financial services with specialized AI. Our fintech solutions cover fraud detection, credit scoring, algorithmic trading, and customer experience. Built for regulatory compliance and security, our AI helps financial institutions reduce risk, increase efficiency, and serve customers better.",
    metaDescription:
      "AI solutions for financial services. Fraud detection, credit scoring, trading algorithms, and customer experience for banks and fintech.",
    keywords: [
      "fintech AI",
      "financial AI",
      "banking AI",
      "fraud detection AI",
      "fintech solutions",
    ],
    benefits: [
      "Fraud prevention",
      "Risk assessment",
      "Trading intelligence",
      "Customer experience",
      "Regulatory compliance",
    ],
    useCases: [
      "Fraud detection",
      "Credit scoring",
      "Algorithmic trading",
      "Customer service bots",
      "AML compliance",
    ],
  },
  {
    icon: "Scale",
    title: "Legal AI",
    slug: "legal-ai",
    category: "specialized",
    description:
      "Empower legal professionals with specialized AI. Our legal solutions automate contract analysis, accelerate legal research, streamline document review, and monitor compliance. Help lawyers focus on high-value work while AI handles time-consuming tasks with accuracy.",
    metaDescription:
      "AI solutions for legal professionals. Contract analysis, legal research, document review, and compliance monitoring for law firms.",
    keywords: ["legal AI", "law tech AI", "contract AI", "legal research AI", "legal AI solutions"],
    benefits: [
      "Contract analysis",
      "Research acceleration",
      "Document review",
      "Compliance monitoring",
      "Time savings",
    ],
    useCases: [
      "Contract review",
      "Legal research",
      "Due diligence",
      "E-discovery",
      "Compliance monitoring",
    ],
  },
  {
    icon: "ShoppingCart",
    title: "E-commerce AI",
    slug: "e-commerce-ai",
    category: "specialized",
    description:
      "Drive e-commerce growth with specialized AI. Our solutions power personalization, product recommendations, dynamic pricing, and customer service. Increase conversion rates, average order value, and customer lifetime value with AI optimized for online retail.",
    metaDescription:
      "AI solutions for e-commerce and retail. Personalization, recommendations, pricing optimization, and customer experience for online stores.",
    keywords: [
      "e-commerce AI",
      "retail AI",
      "recommendation AI",
      "personalization AI",
      "e-commerce solutions",
    ],
    benefits: [
      "Personalization",
      "Smart recommendations",
      "Dynamic pricing",
      "Customer service",
      "Conversion optimization",
    ],
    useCases: [
      "Product recommendations",
      "Personalized search",
      "Price optimization",
      "Chatbot support",
      "Inventory prediction",
    ],
  },
  {
    icon: "Truck",
    title: "Supply Chain AI",
    slug: "supply-chain-ai",
    category: "specialized",
    description:
      "Optimize supply chains with specialized AI. Our solutions improve demand forecasting, optimize routes, manage inventory, and provide end-to-end visibility. Reduce costs, prevent stockouts, and build resilient supply chains with AI-powered intelligence.",
    metaDescription:
      "AI solutions for supply chain and logistics. Demand forecasting, route optimization, inventory management, and supply chain visibility.",
    keywords: [
      "supply chain AI",
      "logistics AI",
      "demand forecasting AI",
      "supply chain optimization",
      "logistics solutions",
    ],
    benefits: [
      "Demand forecasting",
      "Route optimization",
      "Inventory management",
      "Supply visibility",
      "Cost reduction",
    ],
    useCases: [
      "Demand planning",
      "Route optimization",
      "Warehouse management",
      "Supplier risk",
      "Logistics automation",
    ],
  },
  {
    icon: "Users",
    title: "HR & Recruitment AI",
    slug: "hr-recruitment-ai",
    category: "specialized",
    description:
      "Transform talent management with HR AI. Our solutions automate resume screening, match candidates to roles, analyze employee engagement, and provide workforce insights. Build better teams faster while improving candidate and employee experiences.",
    metaDescription:
      "AI solutions for HR and recruitment. Resume screening, candidate matching, employee engagement, and workforce analytics for talent teams.",
    keywords: ["HR AI", "recruitment AI", "talent AI", "hiring AI", "HR AI solutions"],
    benefits: [
      "Automated screening",
      "Candidate matching",
      "Engagement analysis",
      "Workforce insights",
      "Bias reduction",
    ],
    useCases: [
      "Resume screening",
      "Candidate matching",
      "Employee surveys",
      "Attrition prediction",
      "Skills assessment",
    ],
  },
];

// Icon mapping utility
export const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Brain,
  BarChart3,
  Zap,
  Monitor,
  Settings,
  Sparkles,
  Eye,
  Mic,
  Code2,
  Database,
  Globe,
  Shield,
  Cpu,
  Network,
  FileText,
  Bot,
  Workflow,
  LineChart,
  Search,
  Image,
  Video,
  HeartPulse,
  Wallet,
  Scale,
  ShoppingCart,
  Truck,
  Users,
  Lightbulb,
  Layers,
  Cloud,
  Lock,
  Gauge,
  Target,
  Wand2,
  PenTool,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] || Sparkles;

// Helper function to get capability by slug
export const getCapabilityBySlug = (slug: string): Capability | undefined => {
  return capabilities.find((cap) => cap.slug === slug);
};

// Helper function to get capabilities by category
export const getCapabilitiesByCategory = (categoryKey: string): Capability[] => {
  return capabilities.filter((cap) => cap.category === categoryKey);
};
