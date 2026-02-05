import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCategory, categoryConfig, getAllCategories } from "@/data/blogPosts";

interface BlogFiltersProps {
  onCategoryChange: (category: BlogCategory | "all") => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: "latest" | "oldest") => void;
}

const BlogFilters = ({ onCategoryChange, onSearchChange, onSortChange }: BlogFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const categories = getAllCategories();
  const currentCategory = (searchParams.get("category") as BlogCategory) || "all";
  const currentSort = (searchParams.get("sort") as "latest" | "oldest") || "latest";

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchValue);
      // Update URL params
      const params = new URLSearchParams(searchParams);
      if (searchValue) {
        params.set("search", searchValue);
        params.delete("page"); // Reset to page 1 on search
      } else {
        params.delete("search");
      }
      setSearchParams(params, { replace: true });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, searchParams, setSearchParams, onSearchChange]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      const category = value as BlogCategory | "all";
      onCategoryChange(category);
      const params = new URLSearchParams(searchParams);
      if (category === "all") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      params.delete("page"); // Reset to page 1 on filter
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams, onCategoryChange],
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const sort = value as "latest" | "oldest";
      onSortChange(sort);
      const params = new URLSearchParams(searchParams);
      if (sort === "latest") {
        params.delete("sort");
      } else {
        params.set("sort", sort);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams, onSortChange],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        {/* Category Filter */}
        <div className="flex items-center gap-2 min-w-[160px]">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={currentCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  <span className="flex items-center gap-2">
                    <span>{categoryConfig[cat].icon}</span>
                    <span>{categoryConfig[cat].label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
            aria-label="Search blog articles"
          />
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="Latest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BlogFilters;
