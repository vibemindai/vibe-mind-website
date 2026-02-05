import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const MissionVisionSection = () => {
  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize AI-powered software development by creating intelligent solutions that empower businesses of all sizes. We believe that cutting-edge technology should be accessible, practical, and transformative.",
      gradient: "from-primary/20 to-accent/20",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        'To be the leading force in the "Vibe Coding" revolution—where human creativity and AI capabilities merge seamlessly. We envision a world where software development is faster, smarter, and more intuitive than ever before.',
      gradient: "from-accent/20 to-primary/20",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.1,
              }}
              className={`glass-strong rounded-2xl p-6 md:p-8 bg-gradient-to-br ${card.gradient}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">{card.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
