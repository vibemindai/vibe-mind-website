import { Link } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { BlogPost, categoryConfig, formatDate } from '@/data/blogPosts';
import { cn } from '@/lib/utils';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  const category = categoryConfig[post.category];

  return (
    <header className="mb-8">
      {/* Category Badge */}
      <div className="mb-4">
        <Link
          to={`/blog?category=${post.category}`}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 hover:scale-105',
            category.color
          )}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {post.title}
        </span>
      </h1>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium">{post.author.name}</span>
        </div>
        <span className="hidden sm:inline text-border">|</span>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <span className="hidden sm:inline text-border">|</span>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-card/50">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
      </div>
    </header>
  );
};

export default BlogPostHeader;
