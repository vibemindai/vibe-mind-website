import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostSchemaProps {
  post: BlogPost;
}

const BlogPostSchema = ({ post }: BlogPostSchemaProps) => {
  const baseUrl = 'https://vibemindsolutions.ai';
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo.title,
    description: post.seo.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vibe Mind AI Solutions',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.seo.keywords.join(', '),
    wordCount: post.readingTime * 200, // Approximate based on reading time
    articleSection: post.category,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default BlogPostSchema;
