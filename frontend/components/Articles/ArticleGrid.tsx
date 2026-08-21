import React, { useState } from 'react';
import { ArticleCard } from './ArticleCard';
import { articles, Article } from '@/data/articles';
import { designSystem } from '@/styles/apple-design-system';

interface ArticleGridProps {
  showFilters?: boolean;
}

/**
 * Article Grid Component
 * Displays all articles with optional filtering
 */
export const ArticleGrid: React.FC<ArticleGridProps> = ({ showFilters = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<Article['category'] | 'all'>('all');

  // Filter articles
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const categories: Array<{ value: Article['category'] | 'all'; label: string }> = [
    { value: 'all', label: 'همه' },
    { value: 'guide', label: 'راهنما' },
    { value: 'tutorial', label: 'آموزش' },
    { value: 'news', label: 'اخبار' },
    { value: 'comparison', label: 'مقایسه' },
  ];

  return (
    <>
      <div className="article-grid-container">
        {/* Category Filters */}
        {showFilters && (
          <div className="filters-container">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`category-button ${selectedCategory === category.value ? 'active' : ''}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="article-grid">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="empty-state">
            <p>مقاله‌ای در این دسته‌بندی یافت نشد</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .article-grid-container {
          width: 100%;
        }

        .filters-container {
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
        }

        .category-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding: 8px;
          background: ${designSystem.colors.surface.light};
          border-radius: ${designSystem.borderRadius['2xl']};
          box-shadow: ${designSystem.shadows.sm};
        }

        .category-button {
          padding: 10px 20px;
          background: transparent;
          border: none;
          border-radius: ${designSystem.borderRadius.xl};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.medium};
          color: ${designSystem.colors.text.secondary};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .category-button:hover {
          background: ${designSystem.colors.neutral[100]};
          color: ${designSystem.colors.text.primary};
        }

        .category-button.active {
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          box-shadow: ${designSystem.shadows.md};
        }

        .article-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
          width: 100%;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: ${designSystem.colors.text.secondary};
          font-family: ${designSystem.typography.fontFamily.persian};
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .article-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .article-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .category-filters {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .category-filters::-webkit-scrollbar {
            display: none;
          }

          .filters-container {
            margin-bottom: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default ArticleGrid;
