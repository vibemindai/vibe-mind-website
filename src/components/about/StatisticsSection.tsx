import { motion } from "framer-motion";
import { Bot, FolderGit2, Globe, ThumbsUp } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const StatisticsSection = () => {
  const stats = [
    {
      icon: Bot,
      value: 4,
      suffix: "+",
      label: "AI Models",
      description: "Integrated in our solutions",
    },
    {
      icon: FolderGit2,
      value: 50,
      suffix: "+",
      label: "Projects",
      description: "Successfully delivered",
    },
    {
      icon: Globe,
      value: 3,
      suffix: "",
      label: "Countries",
      description: "Global presence",
    },
    {
      icon: ThumbsUp,
      value: 98,
      suffix: "%",
      label: "Satisfaction",
      description: "Client approval rate",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Numbers That Speak
          </h2>
          <p className="text-muted-foreground">
            Our track record of excellence in AI solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.1,
              }}
              className="glass-strong rounded-xl p-4 md:p-6 text-center group hover:border-primary/50 transition-all"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>

              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={1500}
                />
              </div>

              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
