import { articles } from './articles';
import { blogPosts, BlogPost } from './blog-posts';

export function getUnifiedPosts(): BlogPost[] {
  const guides: BlogPost[] = articles.map(article => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    coverImage: article.imagePath,
    category: article.category === 'guide' ? 'guides' : article.category === 'tutorial' ? 'tips' : article.category,
    tags: article.tags,
    author: { name: article.author, avatar: '' },
    publishedAt: article.publishDate,
    readTime: article.readTime,
    productSlugs: article.productSlugs,
  }));
  const slugs = new Set(guides.map(guide => guide.slug));
  return [...guides, ...blogPosts.filter(post => !slugs.has(post.slug))]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
