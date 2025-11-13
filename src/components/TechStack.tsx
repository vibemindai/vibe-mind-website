import { Badge } from "@/components/ui/badge";

const TechStack = () => {
  const technologies = [
    { category: "AI & ML", items: ["OpenAI", "Google Gemini", "LangChain", "TensorFlow", "PyTorch", "Hugging Face"] },
    { category: "Backend", items: ["Python", "Node.js", "FastAPI", "Django", "Express.js", "GraphQL"] },
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Svelte"] },
    { category: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Pinecone", "ChromaDB"] },
    { category: "AI Tools", items: ["LangChain", "LlamaIndex", "Anthropic", "Replicate", "Stability AI", "Midjourney"] }
  ];

  return (
    <section id="tech-stack" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">Technology Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Powered by
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cutting-Edge Technology
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We leverage the best tools and frameworks to build intelligent, scalable solutions
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="space-y-4 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline"
                    className="border-border hover:border-primary/50 hover:bg-primary/10 transition-smooth cursor-default text-sm py-1.5"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Looking for a specific technology or integration?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            Let's discuss your requirements →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
