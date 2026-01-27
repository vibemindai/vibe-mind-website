import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { BlogPost, categoryConfig, formatDate } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogCardFeaturedProps {
  post: BlogPost;
}

const BlogCardFeatured = ({ post }: BlogCardFeaturedProps) => {
  const category = categoryConfig[post.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block"
        aria-label={`Read featured article: ${post.title}`}
      >
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          {/* Desktop Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Container */}
            <div className="relative lg:w-3/5 aspect-[16/9] lg:aspect-auto overflow-hidden">
              <img
                src={post.image}
                alt={post.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-lg">
                  Featured
                </span>
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent lg:opacity-100 opacity-0" />
            </div>

            {/* Content */}
            <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col justify-center">
              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border',
                    category.color
                  )}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-muted-foreground mb-6 line-clamp-3 lg:line-clamp-4">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
                <span className="hidden sm:inline text-border">|</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span className="hidden sm:inline text-border">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <Button
                  variant="default"
                  className="group/btn gap-2"
                  tabIndex={-1}
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCardFeatured;
