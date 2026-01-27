import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostNavigationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogPostNavigation = ({ prevPost, nextPost }: BlogPostNavigationProps) => {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav aria-label="Post navigation" className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Post */}
        {prevPost ? (
          <Link
            to={`/blog/${prevPost.slug}`}
            className="group flex items-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
          >
            <div className="flex-shrink-0 mt-1">
              <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Previous
              </span>
              <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors mt-1">
                {prevPost.title}
              </h4>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Next Post */}
        {nextPost ? (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="group flex items-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 md:text-right md:flex-row-reverse"
          >
            <div className="flex-shrink-0 mt-1">
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Next
              </span>
              <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors mt-1">
                {nextPost.title}
              </h4>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </nav>
  );
};

export default BlogPostNavigation;
