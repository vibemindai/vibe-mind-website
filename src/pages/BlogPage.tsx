import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronRight, Home, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import UnifiedNavigation from "@/components/layout/UnifiedNavigation";
import FooterWrapper from "@/components/FooterWrapper";
import SEOHead from "@/components/seo/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCardFeatured from "@/components/blog/BlogCardFeatured";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogListSchema from "@/components/blog/BlogListSchema";
import {
  BlogCategory,
  blogPosts,
  getFeaturedPost,
  getNonFeaturedPosts,
  paginatePosts,
} from "@/data/blogPosts";

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [searchParams] = useSearchParams();

  // Get URL params
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const categoryParam = searchParams.get("category") as BlogCategory | null;
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") as "latest" | "oldest" | null;

  // Local state (initialized from URL params)
  const [category, setCategory] = useState<BlogCategory | "all">(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">(sortParam || "latest");

  // Sync with URL params on navigation
  useEffect(() => {
    setCategory(categoryParam || "all");
    setSearchQuery(searchParam);
    setSortOrder(sortParam || "latest");
  }, [categoryParam, searchParam, sortParam]);

  // Get featured post (only show on first page with no filters)
  const showFeatured = currentPage === 1 && category === "all" && !searchQuery;
  const featuredPost = showFeatured ? getFeaturedPost() : null;

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = showFeatured ? getNonFeaturedPosts() : blogPosts;

    // Filter by category
    if (category !== "all") {
      posts = posts.filter((post) => post.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      );
    }

    // Sort posts
    posts = [...posts].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [category, searchQuery, sortOrder, showFeatured]);

  // Paginate results
  const {
    posts: paginatedPosts,
    totalPages,
    totalPosts,
  } = useMemo(() => {
    return paginatePosts(filteredPosts, currentPage, POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Filter handlers
  const handleCategoryChange = useCallback((newCategory: BlogCategory | "all") => {
    setCategory(newCategory);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((sort: "latest" | "oldest") => {
    setSortOrder(sort);
  }, []);

  // SEO metadata
  const pageTitle =
    currentPage === 1
      ? "AI Blog & Insights | Vibe Mind AI Solutions"
      : `AI Blog - Page ${currentPage} | Vibe Mind AI Solutions`;

  const pageDescription =
    "Explore the latest insights, tutorials, and best practices on AI, machine learning, conversational AI, and enterprise automation from Vibe Mind experts.";

  const canonicalUrl = currentPage === 1 ? "/blog" : `/blog?page=${currentPage}`;

  return (
    <FooterWrapper>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={[
          "ai blog",
          "machine learning tutorials",
          "conversational ai insights",
          "enterprise automation",
          "llm guides",
          "rag systems",
          "ai trends",
        ]}
        canonicalUrl={canonicalUrl}
        ogType="website"
      />
      <BlogListSchema posts={paginatedPosts} currentPage={currentPage} totalPages={totalPages} />

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
                <span className="text-foreground font-medium">Blog</span>
              </nav>
            </AnimatedSection>

            {/* Page Header */}
            <AnimatedSection delay={0.1}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Newspaper className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">AI Insights & Updates</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Our Blog
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Stay updated with the latest trends, tutorials, and best practices in artificial
                  intelligence and automation.
                </p>
              </div>
            </AnimatedSection>

            {/* Featured Post */}
            {featuredPost && (
              <AnimatedSection delay={0.2} className="mb-12">
                <BlogCardFeatured post={featuredPost} />
              </AnimatedSection>
            )}

            {/* Filters */}
            <AnimatedSection delay={0.3} className="mb-8">
              <BlogFilters
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
              />
            </AnimatedSection>

            {/* Blog Grid */}
            <AnimatedSection delay={0.4}>
              <BlogGrid posts={paginatedPosts} />
            </AnimatedSection>

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalPosts={totalPosts}
              postsPerPage={POSTS_PER_PAGE}
            />
          </div>
        </main>
      </div>
    </FooterWrapper>
  );
};

export default BlogPage;
