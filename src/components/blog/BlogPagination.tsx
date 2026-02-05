import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}

const BlogPagination = ({
  currentPage,
  totalPages,
  totalPosts,
  postsPerPage,
}: BlogPaginationProps) => {
  const [searchParams] = useSearchParams();

  // Build URL with existing search params preserved
  const buildPageUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
      const queryString = params.toString();
      return `/blog${queryString ? `?${queryString}` : ""}`;
    }
    params.set("page", page.toString());
    return `/blog?${params.toString()}`;
  };

  // Calculate which page numbers to show
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Calculate showing range
  const startItem = (currentPage - 1) * postsPerPage + 1;
  const endItem = Math.min(currentPage * postsPerPage, totalPosts);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Blog pagination" className="flex flex-col items-center gap-4 mt-12">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          asChild
          disabled={currentPage === 1}
          className={cn("gap-1", currentPage === 1 && "pointer-events-none opacity-50")}
        >
          <Link to={buildPageUrl(currentPage - 1)} aria-label="Go to previous page" rel="prev">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                asChild
                className={cn("min-w-[36px]", currentPage === page && "pointer-events-none")}
              >
                <Link
                  to={buildPageUrl(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </Link>
              </Button>
            ),
          )}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          asChild
          disabled={currentPage === totalPages}
          className={cn("gap-1", currentPage === totalPages && "pointer-events-none opacity-50")}
        >
          <Link to={buildPageUrl(currentPage + 1)} aria-label="Go to next page" rel="next">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Posts Count */}
      <p className="text-sm text-muted-foreground">
        Showing {startItem}-{endItem} of {totalPosts} articles
      </p>
    </nav>
  );
};

export default BlogPagination;
