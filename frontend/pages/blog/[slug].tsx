import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import DesktopContainer from '../../components/layouts/DesktopContainer';
import BottomNav from '../../components/BottomNav';
import GlassContainer from '../../components/GlassContainer';
import { blogPosts, blogCategories } from '../../data/blog-posts';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogPosts.find((p) => p.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default function BlogPost({ post: initialPost }: { post: typeof blogPosts[0] }) {
  const router = useRouter();
  const isTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp;

  const post = initialPost;
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isTelegram) {
    return (
      <>
        <BlogPostContent post={post} relatedPosts={relatedPosts} formatDate={formatDate} />
        <BottomNav />
      </>
    );
  }

  return (
    <DesktopContainer sidebar={null}>
      <BlogPostContent post={post} relatedPosts={relatedPosts} formatDate={formatDate} />
    </DesktopContainer>
  );
}

function BlogPostContent({ 
  post, 
  relatedPosts, 
  formatDate 
}: { 
  post: typeof blogPosts[0]; 
  relatedPosts: typeof blogPosts;
  formatDate: (date: string) => string;
}) {
  return (
    <>
      <Head>
        <title>{post.title} - بلاگ سابیکس</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author.name} />
        <link rel="canonical" href={`https://abbasiandev.github.io/Subix/blog/${post.slug}`} />
        
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://abbasiandev.github.io/Subix/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Head>
      <div className="min-h-screen" dir="rtl">
      <div className="relative container mx-auto px-4 py-8 pb-32 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <button className="glass-light hover:glass-hover rounded-xl px-4 py-2 mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-all">
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            بازگشت به بلاگ
          </button>
        </Link>

        {/* Article Header */}
        <GlassContainer elevation="light" className="rounded-3xl p-8 md:p-12 mb-8 animate-fade-up">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {blogCategories.find(c => c.id === post.category)?.icon}{' '}
              {blogCategories.find(c => c.id === post.category)?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                {post.author.name.charAt(0)}
              </div>
              <span className="text-white">{post.author.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime} دقیقه مطالعه
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views?.toLocaleString('fa-IR')} بازدید
            </span>
          </div>
          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs bg-white/5 text-gray-300 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </GlassContainer>

        {/* Article Content */}
        <GlassContainer elevation="light" className="rounded-3xl p-8 md:p-12 mb-8 animate-fade-up stagger-1">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </GlassContainer>

        {/* Share Section */}
        <GlassContainer elevation="light" className="rounded-2xl p-6 mb-8 animate-fade-up stagger-2">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">اشتراک‌گذاری مقاله:</span>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                </svg>
              </button>
            </div>
          </div>
        </GlassContainer>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="animate-fade-up stagger-3">
            <h2 className="text-2xl font-bold text-white mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <GlassContainer
                    elevation="light"
                    hover
                    className="rounded-2xl overflow-hidden cursor-pointer h-full"
                  >
                    <div className="h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                      <div className="text-4xl">
                        {blogCategories.find(c => c.id === relatedPost.category)?.icon || '📝'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold mb-2 line-clamp-2 text-sm">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {relatedPost.readTime} دقیقه
                        </span>
                      </div>
                    </div>
                  </GlassContainer>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
