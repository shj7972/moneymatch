import React from 'react';
import Link from 'next/link';
import subsidiesData from '@/data/subsidies.json';
import newsData from '@/data/news.json';
import blogPosts from '@/data/blog-posts.json';
import {
    ChevronRight,
    Sparkles,
    BookOpen,
} from 'lucide-react';

import ShareButton from '@/components/ShareButton';
import SubsidyFinderClient from '@/components/SubsidyFinderClient';
import NewsRollingBanner from '@/components/NewsRollingBanner';

// --- Types ---
type Subsidy = {
    id: string;
    title: string;
    category: string;
    tags: string[];
    summary: string;
    target_text: string;
    amount_text: string;
    official_link: string;
};

type NewsItem = {
    title: string;
    link: string;
    published: string;
    summary: string;
    sentiment: string;
};

// --- Server-rendered Sections ---

const HeroSection = () => (
    <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-5 mb-8 border-b border-blue-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                🌟 2026년 정부지원금 가이드
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                💰 <span className="text-blue-600">놓치면 손해 보는</span> 정부지원금
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-6">
                복잡한 정책은 그만! 나에게 딱 맞는 혜택을 <br className="md:hidden" />
                <span className="font-bold text-gray-800">3초 만에</span> 찾아드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
                >
                    <Sparkles className="w-5 h-5" />
                    맞춤 지원금 찾기
                </Link>
                <ShareButton className="shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5" />
            </div>
        </div>
    </section>
);

export default function SubsidyFinderPage() {
    return (
        <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">

            <HeroSection />

            {/* Client-side interactive filters + subsidy cards */}
            <SubsidyFinderClient subsidies={subsidiesData as Subsidy[]} />

            {/* News Rolling Banner (Client Component) */}
            <div className="mt-8">
                <NewsRollingBanner items={newsData as NewsItem[]} />
            </div>

            {/* Blog Section — Server-rendered for SEO */}
            <div className="max-w-7xl mx-auto px-5 mt-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <BookOpen className="w-6 h-6 mr-2 text-gray-400" />
                        지원금 가이드
                    </h2>
                    <Link
                        href="/blog"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                        전체 보기 <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                        >
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                {post.category}
                            </span>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mt-3 mb-2 leading-snug break-keep">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{post.summary}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quiz CTA Banner — Server-rendered for SEO */}
            <div className="max-w-7xl mx-auto px-5 mt-12 mb-4">
                <Link
                    href="/quiz"
                    className="block bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white hover:from-blue-700 hover:to-blue-800 transition-all group"
                >
                    <Sparkles className="w-8 h-8 mx-auto mb-3 text-blue-200 group-hover:text-white transition-colors" />
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                        나에게 맞는 지원금, 5가지 질문으로 찾기
                    </h2>
                    <p className="text-blue-100 mb-4">
                        나이, 직업, 가족 상황에 맞는 맞춤형 지원금을 추천해드립니다.
                    </p>
                    <span className="inline-flex items-center gap-1 px-6 py-2 bg-white text-blue-700 font-bold rounded-xl">
                        시작하기 <ChevronRight className="w-4 h-4" />
                    </span>
                </Link>
            </div>

        </main >
    );
}
