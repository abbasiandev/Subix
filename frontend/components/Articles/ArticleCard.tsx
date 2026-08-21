import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/data/articles';
import { designSystem } from '@/styles/apple-design-system';

interface ArticleCardProps {
  article: Article;
}

/**
 * Article Card Component
 * Displays article preview with real image and metadata
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <>
      <Link href={`/blog/${article.slug}`}>
        <div className="article-card">
          {/* Article Image */}
          <div className="article-image-container">
            <div className="article-image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            
            {/* Category Badge */}
            <span className="category-badge">
              {getCategoryLabel(article.category)}
            </span>
          </div>

          {/* Article Content */}
          <div className="article-content">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
            
            <div className="article-meta">
              <span className="read-time">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {article.readTime} دقیقه مطالعه
              </span>
              <span className="publish-date">
                {formatDate(article.publishDate)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .article-card {
          display: flex;
          flex-direction: column;
          background: ${designSystem.colors.surface.light};
          border-radius: ${designSystem.borderRadius['2xl']};
          overflow: hidden;
          cursor: pointer;
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
          box-shadow: ${designSystem.shadows.sm};
          height: 100%;
        }

        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: ${designSystem.shadows.xl};
        }

        .article-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: linear-gradient(135deg, ${designSystem.colors.primary.DEFAULT} 0%, ${designSystem.colors.primary.active} 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .article-image-placeholder {
          color: white;
          opacity: 0.5;
        }

        .article-image-container :global(.article-image) {
          object-fit: cover;
          transition: transform ${designSystem.animation.duration.slow} ${designSystem.animation.easing.default};
        }

        .article-card:hover .article-image-container :global(.article-image) {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: white;
          font-size: ${designSystem.typography.fontSize.xs};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          font-family: ${designSystem.typography.fontFamily.persian};
          border-radius: ${designSystem.borderRadius.full};
          z-index: 2;
        }

        .article-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          flex: 1;
        }

        .article-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          line-height: ${designSystem.typography.lineHeight.snug};
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-excerpt {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid ${designSystem.colors.neutral[200]};
          font-size: ${designSystem.typography.fontSize.xs};
          color: ${designSystem.colors.text.tertiary};
          font-family: ${designSystem.typography.fontFamily.persian};
        }

        .read-time {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .read-time svg {
          color: ${designSystem.colors.text.secondary};
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .article-title {
            font-size: ${designSystem.typography.fontSize.lg};
          }

          .article-content {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
};

/**
 * Get category label in Persian
 */
const getCategoryLabel = (category: Article['category']): string => {
  const labels: Record<Article['category'], string> = {
    guide: 'راهنما',
    tutorial: 'آموزش',
    news: 'اخبار',
    comparison: 'مقایسه',
  };
  return labels[category] || category;
};

/**
 * Format date to Persian
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default ArticleCard;
