import { useEffect, useState, useMemo } from 'react';

export default function StickyTableOfContents({ markdownContent }) {
  const [activeId, setActiveId] = useState('');

  const headings = useMemo(() => {
    const results = [];
    if (!markdownContent) return results;
    
    // Match Markdown headers: ## Header or ### Header
    const regex = /^(##|###)\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(markdownContent)) !== null) {
      const level = match[1] === '##' ? 2 : 3;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\u00C0-\u024F]+/g, '-');
      results.push({ id, text, level });
    }
    return results;
  }, [markdownContent]);

  useEffect(() => {
    // We want the header to be considered active when it's near the top of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { 
        rootMargin: '-10% 0px -75% 0px', // Trigger when header passes the top 10%-25% zone
        threshold: 0 
      }
    );

    // Observe all heading elements
    const timeout = setTimeout(() => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    }, 100); // Small delay to ensure React has rendered the DOM

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 hidden lg:block">
      <h4 className="font-heading font-bold text-sm text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">list_alt</span>
        Daftar Isi
      </h4>
      <ul className="space-y-2 border-l-2 border-surface-container">
        {headings.map((heading) => (
          <li key={heading.id} className={`${heading.level === 3 ? 'ml-3' : 'ml-0'}`}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${heading.id}`);
                }
              }}
              className={`block pl-4 py-1.5 text-sm transition-all duration-200 border-l-2 -ml-[2px] ${
                activeId === heading.id
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-surface-container-highest'
              }`}
            >
              <span className="line-clamp-2 leading-snug">{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
