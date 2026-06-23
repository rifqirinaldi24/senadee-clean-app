import { useMemo } from 'react';
import ArticleCard from './ArticleCard';
import { getAllPublishedArticles } from '../../data/articles';

export default function RelatedArticles({ currentArticleId, currentCategory }) {
  const relatedArticles = useMemo(() => {
    const allArticles = getAllPublishedArticles();
    return allArticles
      .filter((article) => article.category === currentCategory && article.id !== currentArticleId)
      .slice(0, 3);
  }, [currentArticleId, currentCategory]);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-surface-container">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-heading font-bold text-2xl text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">library_books</span>
          Artikel Terkait
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
