import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { BlogPost, categoryConfig, formatDate } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const category = categoryConfig[post.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block h-full"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="h-full rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:bg-card/80">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category Badge */}
            <div className="mb-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border",
                  category.color,
                )}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{post.author.name}</span>
              </div>
              <span className="text-border">|</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
