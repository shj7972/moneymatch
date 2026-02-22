import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import subsidies from '@/data/subsidies.json';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

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

    const title = `${subsidy.title} 신청방법·대상·금액 총정리 (2026)`;
    const description = `${subsidy.title} - ${subsidy.summary} 지원대상: ${subsidy.target_text.slice(0, 60)}. 지원금액: ${subsidy.amount_text.slice(0, 60)}.`;

    return {
        title,
        description,
        openGraph: {
            title: `${subsidy.title} | Money Match`,
            description: subsidy.summary,
            type: 'article',
            url: `https://moneymatch.kr/money/${subsidy.id}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${subsidy.title} | Money Match`,
            description: subsidy.summary,
        },
        alternates: {
            canonical: `https://moneymatch.kr/money/${subsidy.id}`,
        },
        keywords: [...subsidy.tags, subsidy.category, '정부지원금', '금융혜택', '보조금 신청', '2026 지원금'],
    };
}

function getRelatedSubsidies(current: Subsidy): Subsidy[] {
    const scored = (subsidies as Subsidy[])
        .filter((s) => s.id !== current.id)
        .map((s) => {
            let score = 0;
            if (s.category === current.category) score += 3;
            const commonTags = s.tags.filter((t) => current.tags.includes(t));
            score += commonTags.length * 2;
            return { subsidy: s, score };
        })
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map((s) => s.subsidy);
}

function generateFaqJsonLd(subsidy: Subsidy) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `${subsidy.title}의 지원 대상은 누구인가요?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: subsidy.target_text,
                },
            },
            {
                '@type': 'Question',
                name: `${subsidy.title}의 지원 금액은 얼마인가요?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: subsidy.amount_text,
                },
            },
            {
                '@type': 'Question',
                name: `${subsidy.title}은 어디서 신청하나요?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${subsidy.title}은 공식 사이트(${subsidy.official_link})에서 신청할 수 있습니다. 자세한 신청 방법과 필요 서류는 해당 사이트에서 확인하세요.`,
                },
            },
        ],
    };
}

function generateGovernmentServiceJsonLd(subsidy: Subsidy) {
    return {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: subsidy.title,
        description: subsidy.summary,
        serviceType: subsidy.category,
        provider: {
            '@type': 'GovernmentOrganization',
            name: '대한민국 정부',
        },
        areaServed: {
            '@type': 'Country',
            name: '대한민국',
        },
        url: `https://moneymatch.kr/money/${subsidy.id}`,
    };
}

function generateBreadcrumbJsonLd(subsidy: Subsidy) {
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
                name: '지원금 찾기',
                item: 'https://moneymatch.kr/money',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: subsidy.title,
                item: `https://moneymatch.kr/money/${subsidy.id}`,
            },
        ],
    };
}

export default function SubsidyPage({ params }: Props) {
    const subsidy = subsidies.find((s) => s.id === params.id) as Subsidy;

    if (!subsidy) {
        notFound();
    }

    const relatedSubsidies = getRelatedSubsidies(subsidy);
    const faqJsonLd = generateFaqJsonLd(subsidy);
    const serviceJsonLd = generateGovernmentServiceJsonLd(subsidy);
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(subsidy);

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <div className="max-w-3xl mx-auto space-y-8">

                {/* Navigation / Breadcrumb */}
                <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/money" className="hover:text-blue-600 transition-colors">지원금 찾기</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium truncate">{subsidy.title}</span>
                </nav>

                {/* Header Section */}
                <header className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative">
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
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
                        {subsidy.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed break-keep mb-6">
                        {subsidy.summary}
                    </p>
                    <div className="flex justify-end">
                        <ShareButton
                            title={`${subsidy.title} | Money Match`}
                            text={subsidy.summary}
                            className="bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                        />
                    </div>
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

                {/* FAQ Section */}
                <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                        자주 묻는 질문
                    </h2>
                    <div className="space-y-4">
                        <details className="group border border-gray-100 rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors font-medium text-gray-800">
                                <span>Q. {subsidy.title}의 지원 대상은 누구인가요?</span>
                                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="p-5 text-gray-600 leading-relaxed">
                                {subsidy.target_text}
                            </div>
                        </details>
                        <details className="group border border-gray-100 rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors font-medium text-gray-800">
                                <span>Q. {subsidy.title}의 지원 금액은 얼마인가요?</span>
                                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="p-5 text-gray-600 leading-relaxed">
                                {subsidy.amount_text}
                            </div>
                        </details>
                        <details className="group border border-gray-100 rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors font-medium text-gray-800">
                                <span>Q. {subsidy.title}은 어디서 신청하나요?</span>
                                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="p-5 text-gray-600 leading-relaxed">
                                <a
                                    href={subsidy.official_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    공식 사이트
                                </a>
                                에서 온라인으로 신청할 수 있습니다. 필요 서류 및 상세 절차는 해당 사이트에서 확인하세요.
                            </div>
                        </details>
                    </div>
                </section>

                {/* Related Subsidies */}
                {relatedSubsidies.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                            함께 확인하면 좋은 지원금
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedSubsidies.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/money/${related.id}`}
                                    className="block p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                                >
                                    <span className="text-xs text-gray-400 font-medium">{related.category}</span>
                                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors mt-1 text-sm leading-snug">
                                        {related.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{related.summary}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}
