import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import subsidies from '@/data/subsidies.json';
import Link from 'next/link';

interface Subsidy {
    id: string;
    title: string;
    category: string;
    tags: string[];
    summary: string;
    target_text: string;
    amount_text: string;
    official_link: string;
}

interface Props {
    params: {
        id: string;
    };
}

// Generate static params for all subsidies at build time
export async function generateStaticParams() {
    return subsidies.map((subsidy) => ({
        id: subsidy.id,
    }));
}

// Generate SEO metadata for each page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const subsidy = subsidies.find((s) => s.id === params.id);

    if (!subsidy) {
        return {
            title: '지원금을 찾을 수 없습니다',
        };
    }

    return {
        title: `${subsidy.title} - 지원금 상세정보 | Money Match`,
        description: subsidy.summary,
        openGraph: {
            title: `${subsidy.title} | Money Match`,
            description: subsidy.summary,
            type: 'article',
            url: `https://moneymatch.kr/money/${subsidy.id}`,
        },
        keywords: [...subsidy.tags, subsidy.category, '정부지원금', '금융혜택'],
    };
}

export default function SubsidyPage({ params }: Props) {
    const subsidy = subsidies.find((s) => s.id === params.id) as Subsidy;

    if (!subsidy) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Navigation / Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/money" className="hover:text-blue-600 transition-colors">지원금 찾기</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium truncate">{subsidy.title}</span>
                </nav>

                {/* Header Section */}
                <header className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                            {subsidy.category}
                        </span>
                        {subsidy.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 word-keep-all">
                        {subsidy.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed word-keep-all">
                        {subsidy.summary}
                    </p>
                </header>

                {/* Content Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 space-y-8">
                    {/* Target Audience */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                            지원 대상
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-5 text-gray-700 leading-relaxed border border-gray-100">
                            {subsidy.target_text}
                        </div>
                    </section>

                    {/* Support Amount/Benefits */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                            지원 혜택
                        </h2>
                        <div className="bg-green-50 rounded-xl p-5 text-gray-700 leading-relaxed border border-green-100">
                            {subsidy.amount_text}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={subsidy.official_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            신청방법 확인하기 (공식 사이트)
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                        >
                            다른 지원금 더보기
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
