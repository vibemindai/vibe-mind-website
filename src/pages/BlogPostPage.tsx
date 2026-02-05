import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight, Home, Newspaper, ArrowLeft } from "lucide-react";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";
import SEOHead from "@/components/seo/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import BlogPostSchema from "@/components/blog/BlogPostSchema";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostNavigation from "@/components/blog/BlogPostNavigation";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import TableOfContents from "@/components/blog/TableOfContents";
import SocialShareButtons from "@/components/blog/SocialShareButtons";
import { getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/data/blogPosts";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = slug ? getPostBySlug(slug) : undefined;
  const { prevPost, nextPost } = slug ? getAdjacentPosts(slug) : { prevPost: null, nextPost: null };
  const relatedPosts = post ? getRelatedPosts(post, 3) : [];

  // Redirect to blog list if post not found
  useEffect(() => {
    if (slug && !post) {
      navigate("/blog", { replace: true });
    }
  }, [slug, post, navigate]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return null;
  }

  return (
    <FooterWrapper>
      <SEOHead
        title={post.seo.title}
        description={post.seo.description}
        keywords={post.seo.keywords}
        canonicalUrl={`/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
      />
      <BlogPostSchema post={post} />
      <ReadingProgressBar />

      <div className="min-h-screen bg-background">
        <UnifiedNavigation />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb */}
            <AnimatedSection delay={0}>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
              >
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  to="/blog"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Newspaper className="h-4 w-4" />
                  <span>Blog</span>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium line-clamp-1 max-w-[200px] sm:max-w-none">
                  {post.title}
                </span>
              </nav>
            </AnimatedSection>

            {/* Back to Blog Link (Mobile) */}
            <AnimatedSection delay={0.05} className="lg:hidden mb-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>
            </AnimatedSection>

            {/* Two Column Layout */}
            <div className="flex gap-8">
              {/* Main Content */}
              <article className="flex-1 max-w-4xl">
                <AnimatedSection delay={0.1}>
                  <BlogPostHeader post={post} />
                </AnimatedSection>

                {/* Mobile Table of Contents */}
                <AnimatedSection delay={0.15}>
                  <TableOfContents />
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <BlogPostContent post={post} />
                </AnimatedSection>

                {/* Share Buttons */}
                <AnimatedSection delay={0.25} className="mt-8">
                  <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Found this article helpful? Share it with others!
                    </span>
                    <SocialShareButtons title={post.title} url={`/blog/${post.slug}`} />
                  </div>
                </AnimatedSection>

                {/* Post Navigation */}
                <AnimatedSection delay={0.3}>
                  <BlogPostNavigation prevPost={prevPost} nextPost={nextPost} />
                </AnimatedSection>

                {/* Related Posts */}
                <AnimatedSection delay={0.35}>
                  <RelatedPosts posts={relatedPosts} />
                </AnimatedSection>

                {/* CTA Section */}
                <AnimatedSection delay={0.4} className="mt-16">
                  <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Ready to Transform Your Business with AI?
                      </span>
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                      Let our experts help you implement cutting-edge AI solutions tailored to your
                      specific needs.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                      Get in Touch
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </AnimatedSection>
              </article>

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-28">
                  {/* Back to Blog */}
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Blog</span>
                  </Link>

                  {/* Table of Contents */}
                  <TableOfContents />
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default BlogPostPage;
