import { BlogPost } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Related Articles
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
