import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  return (
    <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 sm:p-8 lg:p-10">
      {/* Lead Paragraph / Excerpt */}
      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-medium border-l-4 border-primary/50 pl-4 mb-8">
          {post.excerpt}
        </p>

        {/* Placeholder for full content */}
        <div className="space-y-6 text-muted-foreground">
          <p>
            This article explores the key concepts and practical applications of{' '}
            <strong className="text-foreground">{post.title.toLowerCase()}</strong>.
            As organizations continue to embrace digital transformation, understanding
            these technologies becomes increasingly critical for success.
          </p>

          <h2 id="key-insights" className="text-2xl font-bold text-foreground mt-8 mb-4">
            Key Insights
          </h2>
          <p>
            The landscape of AI and automation is evolving rapidly. Here are the main
            takeaways from our research and industry experience:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modern AI solutions require a thoughtful approach to implementation</li>
            <li>Integration with existing systems is crucial for success</li>
            <li>Continuous monitoring and optimization lead to better outcomes</li>
            <li>User experience should remain at the forefront of design decisions</li>
          </ul>

          <h2 id="implementation" className="text-2xl font-bold text-foreground mt-8 mb-4">
            Implementation Considerations
          </h2>
          <p>
            When implementing these solutions, organizations should consider their
            specific needs, existing infrastructure, and long-term goals. A phased
            approach often yields the best results.
          </p>

          <h2 id="best-practices" className="text-2xl font-bold text-foreground mt-8 mb-4">
            Best Practices
          </h2>
          <p>
            Following industry best practices ensures a smoother implementation and
            better return on investment. Key practices include thorough planning,
            stakeholder alignment, and iterative development.
          </p>

          <h2 id="conclusion" className="text-2xl font-bold text-foreground mt-8 mb-4">
            Conclusion
          </h2>
          <p>
            As we continue to see advancements in AI technology, staying informed
            and adaptable will be key to leveraging these tools effectively. The
            future holds exciting possibilities for organizations ready to embrace
            innovation.
          </p>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mt-10 pt-8 border-t border-border/50">
        <div className="flex flex-wrap items-center gap-2">
          <Hash className="h-5 w-5 text-muted-foreground" />
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?search=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 text-sm rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
            >
              #{tag.replace(/\s+/g, '')}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
