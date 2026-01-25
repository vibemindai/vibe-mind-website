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
  category: string;
}

export const capabilities: Capability[] = [
  // Conversational AI
  { icon: "MessageSquare", title: "Chatbot Development", category: "conversational" },
  { icon: "Mic", title: "Voice Assistants", category: "conversational" },
  { icon: "FileText", title: "Natural Language Processing", category: "conversational" },
  { icon: "Target", title: "Sentiment Analysis", category: "conversational" },
  { icon: "Search", title: "Intent Recognition", category: "conversational" },
  { icon: "Globe", title: "Multi-language Support", category: "conversational" },
  { icon: "LineChart", title: "Conversational Analytics", category: "conversational" },

  // Machine Learning
  { icon: "Brain", title: "Neural Networks", category: "ml" },
  { icon: "Layers", title: "Deep Learning Models", category: "ml" },
  { icon: "Settings", title: "Model Training & Fine-tuning", category: "ml" },
  { icon: "Sparkles", title: "Transfer Learning", category: "ml" },
  { icon: "Cpu", title: "Reinforcement Learning", category: "ml" },
  { icon: "Wand2", title: "AutoML Solutions", category: "ml" },
  { icon: "Workflow", title: "MLOps & Deployment", category: "ml" },

  // Computer Vision
  { icon: "Image", title: "Image Recognition", category: "vision" },
  { icon: "Eye", title: "Object Detection", category: "vision" },
  { icon: "Users", title: "Facial Recognition", category: "vision" },
  { icon: "FileText", title: "OCR & Document Processing", category: "vision" },
  { icon: "Video", title: "Video Analytics", category: "vision" },
  { icon: "HeartPulse", title: "Medical Imaging AI", category: "vision" },
  { icon: "Search", title: "Quality Inspection", category: "vision" },

  // Data & Analytics
  { icon: "BarChart3", title: "Predictive Analytics", category: "analytics" },
  { icon: "Zap", title: "Real-time Processing", category: "analytics" },
  { icon: "Database", title: "Data Pipeline Automation", category: "analytics" },
  { icon: "Shield", title: "Anomaly Detection", category: "analytics" },
  { icon: "LineChart", title: "Trend Forecasting", category: "analytics" },
  { icon: "Gauge", title: "Business Intelligence AI", category: "analytics" },
  { icon: "Target", title: "Customer Analytics", category: "analytics" },

  // LLM & Generative AI
  { icon: "Bot", title: "LLM Integration", category: "generative" },
  { icon: "Sparkles", title: "Custom GPT Solutions", category: "generative" },
  { icon: "Database", title: "RAG Systems", category: "generative" },
  { icon: "PenTool", title: "Prompt Engineering", category: "generative" },
  { icon: "FileText", title: "Content Generation", category: "generative" },
  { icon: "Code2", title: "Code Generation", category: "generative" },
  { icon: "Wand2", title: "AI Writing Assistants", category: "generative" },

  // Automation
  { icon: "Workflow", title: "Workflow Automation", category: "automation" },
  { icon: "Bot", title: "RPA Solutions", category: "automation" },
  { icon: "Settings", title: "Process Optimization", category: "automation" },
  { icon: "Zap", title: "Smart Scheduling", category: "automation" },
  { icon: "Monitor", title: "Automated Testing", category: "automation" },
  { icon: "Code2", title: "CI/CD AI Integration", category: "automation" },
  { icon: "Cpu", title: "DevOps Automation", category: "automation" },

  // Enterprise Solutions
  { icon: "Network", title: "Enterprise AI Integration", category: "enterprise" },
  { icon: "Code2", title: "API Development", category: "enterprise" },
  { icon: "Cloud", title: "Cloud AI Services", category: "enterprise" },
  { icon: "Cpu", title: "Edge AI Deployment", category: "enterprise" },
  { icon: "Lock", title: "AI Security Solutions", category: "enterprise" },
  { icon: "Shield", title: "Compliance Automation", category: "enterprise" },
  { icon: "Lightbulb", title: "Knowledge Management", category: "enterprise" },

  // Specialized
  { icon: "HeartPulse", title: "Healthcare AI", category: "specialized" },
  { icon: "Wallet", title: "FinTech AI", category: "specialized" },
  { icon: "Scale", title: "Legal AI", category: "specialized" },
  { icon: "ShoppingCart", title: "E-commerce AI", category: "specialized" },
  { icon: "Truck", title: "Supply Chain AI", category: "specialized" },
  { icon: "Users", title: "HR & Recruitment AI", category: "specialized" },
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
