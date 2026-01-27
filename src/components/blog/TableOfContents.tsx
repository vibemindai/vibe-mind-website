import { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Extract headings from article content
    const articleHeadings = document.querySelectorAll('article h2, article h3');
    const items: TOCItem[] = [];

    articleHeadings.forEach((heading) => {
      if (heading.id) {
        items.push({
          id: heading.id,
          text: heading.textContent || '',
          level: heading.tagName === 'H2' ? 2 : 3,
        });
      }
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
      >
        <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-4">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
            <List className="h-4 w-4 text-primary" />
            <span>Table of Contents</span>
          </div>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    'text-left w-full text-sm py-1 px-2 rounded transition-colors duration-200',
                    heading.level === 3 && 'pl-4',
                    activeId === heading.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Collapsible */}
      <div className="lg:hidden mb-6">
        <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 text-sm font-semibold text-foreground"
          >
            <div className="flex items-center gap-2">
              <List className="h-4 w-4 text-primary" />
              <span>Table of Contents</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <ul className="px-4 pb-4 space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => {
                      scrollToHeading(heading.id);
                      setIsExpanded(false);
                    }}
                    className={cn(
                      'text-left w-full text-sm py-1 px-2 rounded transition-colors duration-200',
                      heading.level === 3 && 'pl-4',
                      activeId === heading.id
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
