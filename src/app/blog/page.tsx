import { Metadata } from 'next';
import Link from 'next/link';
import blogPosts from '@/data/blog-posts.json';

export const metadata: Metadata = {
    title: '정부지원금 가이드 블로그 - 최신 복지 정책 총정리',
    description:
        '청년, 육아, 노인, 저소득, 중장년 등 대상별 정부지원금 가이드를 확인하세요. 신청방법, 자격요건, 지원금액을 알기 쉽게 정리했습니다.',
    openGraph: {
        title: '정부지원금 가이드 블로그 | Money Match',
        description: '대상별 정부지원금 가이드를 확인하세요.',
        url: 'https://moneymatch.kr/blog',
    },
    alternates: {
        canonical: 'https://moneymatch.kr/blog',
    },
};

const categoryColors: Record<string, string> = {
    청년: 'bg-blue-100 text-blue-700',
    육아: 'bg-yellow-100 text-yellow-700',
    노인: 'bg-green-100 text-green-700',
    저소득: 'bg-red-100 text-red-700',
    중장년: 'bg-purple-100 text-purple-700',
};

export default function BlogListPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600 transition-colors">
                            홈
                        </Link>
                        <span className="mx-2">&gt;</span>
                        <span className="text-gray-900 font-medium">가이드</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 break-keep">
                        정부지원금 가이드
                    </h1>
                    <p className="text-lg text-gray-500">
                        대상별 정부지원금 신청방법과 자격요건을 알기 쉽게 정리했습니다.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="space-y-6">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}
                                >
                                    {post.category}
                                </span>
                                <time className="text-xs text-gray-400" dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 break-keep leading-snug">
                                {post.title}
                            </h2>

                            <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                                {post.summary}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        나에게 맞는 지원금 찾기
                    </h2>
                    <p className="text-gray-500 mb-6">
                        3초 만에 나의 조건에 맞는 정부지원금을 매칭해보세요.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        지원금 매칭 바로가기
                    </Link>
                </div>
            </div>
        </main>
    );
}
