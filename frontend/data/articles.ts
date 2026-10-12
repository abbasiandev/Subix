import entries from './guides.json';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: 'guide' | 'tutorial' | 'news' | 'comparison';
  imagePath: string;
  readTime: number;
  publishDate: string;
  author: string;
  content: string;
  tags: string[];
  productSlugs: string[];
}

// Published guides only. Research, provider settings and source URLs stay offline.
export const articles: Article[] = (entries as Article[]).slice().sort(
  (a, b) => b.publishDate.localeCompare(a.publishDate) || a.id - b.id,
);
export const getArticlesByCategory = (category: Article['category']) => articles.filter(a => a.category === category);
export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug.toLowerCase());
export const getRecentArticles = (count = 6) => articles.slice(0, count);
export const searchArticles = (query: string) => {
  const value = query.toLowerCase();
  return articles.filter(a => [a.title, a.excerpt, ...a.tags].some(text => text.toLowerCase().includes(value)));
};
export const categoryLabels: Record<Article['category'], string> = {
  guide: 'راهنمای انتخاب', tutorial: 'آزمایش عملی', news: 'به‌روزرسانی', comparison: 'مقایسه کاربردی',
};
export default articles;
