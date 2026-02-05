import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogPosts";

interface BlogListSchemaProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

const BlogListSchema = ({
  posts,
  currentPage,
  totalPages,
  baseUrl = "https://vibemind.in",
}: BlogListSchemaProps) => {
  // Build the canonical URL for current page
  const canonicalUrl =
    currentPage === 1 ? `${baseUrl}/blog` : `${baseUrl}/blog?page=${currentPage}`;

  // Build prev/next URLs for pagination SEO
  const prevUrl =
    currentPage > 1
      ? currentPage === 2
        ? `${baseUrl}/blog`
        : `${baseUrl}/blog?page=${currentPage - 1}`
      : null;
  const nextUrl = currentPage < totalPages ? `${baseUrl}/blog?page=${currentPage + 1}` : null;

  // CollectionPage schema for the blog list
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vibe Mind AI Blog",
    description:
      "Explore insights, tutorials, and best practices on AI, machine learning, conversational AI, and enterprise automation.",
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Vibe Mind AI Solutions",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/blog/${post.slug}`,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: {
            "@type": "Organization",
            name: post.author.name,
          },
          publisher: {
            "@type": "Organization",
            name: "Vibe Mind AI Solutions",
            url: baseUrl,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${post.slug}`,
          },
        },
      })),
    },
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      ...(currentPage > 1
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: `Page ${currentPage}`,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      {/* Pagination links for SEO */}
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">{JSON.stringify(collectionPageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};

export default BlogListSchema;
