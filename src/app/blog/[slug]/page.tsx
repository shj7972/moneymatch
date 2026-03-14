import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import blogPosts from '@/data/blog-posts.json';
import subsidies from '@/data/subsidies.json';
import ShareButton from '@/components/ShareButton';

interface BlogPost {
    id: string;
    title: string;
    category: string;
    tags: string[];
    summary: string;
    content: ContentBlock[];
    publishedAt: string;
    updatedAt: string;
}

interface ContentBlock {
    type: 'intro' | 'section' | 'conclusion';
    text: string;
    heading?: string;
    relatedSubsidy?: string;
    paragraphs?: string[];
    bullets?: string[];
    callout?: string;
}

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = blogPosts.find((p) => p.id === params.slug) as BlogPost | undefined;

    if (!post) {
        return { title: '글을 찾을 수 없습니다' };
    }

    const year = new Date(post.updatedAt).getFullYear();
    const seoTitle = `${post.title} [${year} 최신]`;
    const seoDescription = `${post.summary} 신청 조건·방법·금액을 한눈에 확인하고 놓치는 혜택 없이 챙기세요.`;

    return {
        title: seoTitle,
        description: seoDescription,
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            type: 'article',
            url: `https://moneymatch.kr/blog/${post.id}`,
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
        },
        alternates: {
            canonical: `https://moneymatch.kr/blog/${post.id}`,
        },
        keywords: [...post.tags, '정부지원금', '보조금', post.category, '신청방법', `${year} 지원금`],
    };
}

function generateArticleJsonLd(post: BlogPost) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.summary,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
            '@type': 'Organization',
            name: 'Money Match',
            url: 'https://moneymatch.kr',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Money Match',
            logo: {
                '@type': 'ImageObject',
                url: 'https://moneymatch.kr/icon.png',
            },
        },
        mainEntityOfPage: `https://moneymatch.kr/blog/${post.id}`,
    };
}

function generateBreadcrumbJsonLd(post: BlogPost) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: '홈',
                item: 'https://moneymatch.kr',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: '가이드',
                item: 'https://moneymatch.kr/blog',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://moneymatch.kr/blog/${post.id}`,
            },
        ],
    };
}

function getRelatedPosts(current: BlogPost): BlogPost[] {
    return (blogPosts as BlogPost[])
        .filter((p) => p.id !== current.id)
        .sort((a, b) => {
            const aScore = a.category === current.category ? 3 : 0;
            const bScore = b.category === current.category ? 3 : 0;
            return bScore - aScore;
        })
        .slice(0, 2);
}

const categoryColors: Record<string, string> = {
    청년: 'bg-blue-100 text-blue-700',
    육아: 'bg-yellow-100 text-yellow-700',
    노인: 'bg-green-100 text-green-700',
    저소득: 'bg-red-100 text-red-700',
    중장년: 'bg-purple-100 text-purple-700',
};

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.id === params.slug) as BlogPost | undefined;

    if (!post) {
        notFound();
    }

    const articleJsonLd = generateArticleJsonLd(post);
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(post);
    const relatedPosts = getRelatedPosts(post);

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <article className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        홈
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/blog" className="hover:text-blue-600 transition-colors">
                        가이드
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium truncate">{post.title}</span>
                </nav>

                {/* Article Header */}
                <header className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}
                        >
                            {post.category}
                        </span>
                        <time className="text-sm text-gray-400" dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 break-keep leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed break-keep">
                        {post.summary}
                    </p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <ShareButton
                            title={post.title}
                            text={post.summary}
                            className="flex-shrink-0"
                        />
                    </div>
                </header>

                {/* Article Body */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
                    <div className="space-y-8">
                        {post.content.map((block, index) => {
                            if (block.type === 'intro') {
                                const paras = block.paragraphs ?? [block.text];
                                return (
                                    <div key={index} className="space-y-3 border-l-4 border-blue-200 pl-4">
                                        {paras.map((para, i) => (
                                            <p key={i} className="text-gray-600 leading-relaxed text-lg break-keep">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }

                            if (block.type === 'section') {
                                const relatedSubsidy = block.relatedSubsidy
                                    ? subsidies.find((s) => s.id === block.relatedSubsidy)
                                    : null;
                                const paras = block.paragraphs ?? [block.text];

                                return (
                                    <section key={index} className="space-y-3">
                                        <h2 className="text-xl font-bold text-gray-900 break-keep">
                                            {block.heading}
                                        </h2>
                                        {paras.map((para, i) => (
                                            <p key={i} className="text-gray-600 leading-relaxed break-keep">
                                                {para}
                                            </p>
                                        ))}
                                        {block.bullets && block.bullets.length > 0 && (
                                            <ul className="space-y-1.5 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                {block.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex gap-2 text-gray-700 text-sm">
                                                        <span className="text-blue-500 flex-shrink-0 font-bold">•</span>
                                                        <span className="break-keep">{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {block.callout && (
                                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 break-keep leading-relaxed">
                                                <span className="font-bold">⚠️ 주의: </span>{block.callout}
                                            </div>
                                        )}
                                        {relatedSubsidy && (
                                            <Link
                                                href={`/money/${relatedSubsidy.id}`}
                                                className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-100"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                                {relatedSubsidy.title} 상세보기
                                            </Link>
                                        )}
                                    </section>
                                );
                            }

                            if (block.type === 'conclusion') {
                                const paras = block.paragraphs ?? [block.text];
                                return (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-3">
                                        {paras.map((para, i) => (
                                            <p key={i} className="text-gray-700 leading-relaxed font-medium break-keep">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white mb-8">
                    <h2 className="text-xl font-bold mb-2">
                        나에게 맞는 지원금을 3초 만에 찾아보세요
                    </h2>
                    <p className="text-blue-100 mb-6">
                        조건을 선택하면 받을 수 있는 지원금을 바로 확인할 수 있습니다.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        지원금 매칭 바로가기
                    </Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            다른 가이드 보기
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/blog/${related.id}`}
                                    className="block p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                                >
                                    <span
                                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[related.category] || 'bg-gray-100 text-gray-600'}`}
                                    >
                                        {related.category}
                                    </span>
                                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors mt-2 text-sm leading-snug break-keep">
                                        {related.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </main>
    );
}
