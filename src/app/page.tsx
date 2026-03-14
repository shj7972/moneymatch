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
    <section className="relative overflow-hidden bg-white pt-20 pb-16 px-5 mb-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-400 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-400 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="animate-fade-in-up">
                <span className="inline-block bg-white/80 backdrop-blur-sm text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm border border-indigo-50/50">
                    <span className="animate-pulse mr-1">🌟</span> 2026년 정부지원금 가이드
                </span>
                <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1] md:leading-[1.1]">
                    <span className="block mb-2">💰 놓치면 손해 보는</span>
                    <span className="text-gradient drop-shadow-sm">정부지원금</span>
                </h1>
                <p className="text-gray-500 text-lg md:text-2xl max-w-3xl mb-10 leading-relaxed break-keep">
                    복잡한 정책은 그만! 나에게 딱 맞는 혜택을 <br className="hidden md:block" />
                    <span className="text-gray-900 font-semibold underline decoration-blue-500/30 decoration-4 underline-offset-4">3초 만에</span> 인공지능이 찾아드립니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                    <Link
                        href="/quiz"
                        className="btn-premium bg-blue-600 text-white flex items-center gap-2 group"
                    >
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span>맞춤 지원금 찾기</span>
                    </Link>
                    <ShareButton className="btn-premium bg-white text-gray-700 border border-gray-100" />
                </div>
            </div>
            
            {/* Visual Indicator */}
            <div className="mt-16 animate-float flex flex-col items-center gap-2 text-gray-300">
                <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-blue-400 to-transparent" />
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
            <div className="max-w-7xl mx-auto px-5 mt-24">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            지원금 가이드
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 ml-13">전문가가 직접 알려주는 최신 정책 정보</p>
                    </div>
                    <Link
                        href="/blog"
                        className="px-6 py-2.5 bg-white border border-gray-100 text-sm text-indigo-600 hover:bg-gray-50 font-bold rounded-xl shadow-sm transition-all"
                    >
                        전체 보기
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="group glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500"
                        >
                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-indigo-100/30">
                                {post.category}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mt-5 mb-3 leading-[1.4] break-keep">
                                {post.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{post.summary}</p>
                            <div className="mt-6 flex items-center text-indigo-500 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                                Read More <ChevronRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quiz CTA Banner — Server-rendered for SEO */}
            <div className="max-w-7xl mx-auto px-5 mt-24">
                <Link
                    href="/quiz"
                    className="relative block overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 md:p-16 text-center text-white group"
                >
                    {/* Decorative background for CTA */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent -z-0" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                            <Sparkles className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                            나에게 맞는 지원금, <br className="md:hidden" /> 
                            <span className="text-indigo-400">5가지 질문</span>으로 찾기
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            나이, 직업, 가족 상황에 딱 맞는 <br className="md:hidden" />
                            <span className="text-white">맞춤형 정부 혜택</span>을 초정밀 알고리즘으로 추천해드립니다.
                        </p>
                        <span className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-900/50 group-hover:-translate-y-1">
                            무료 매칭 시작하기 <ChevronRight className="w-5 h-5" />
                        </span>
                    </div>
                </Link>
            </div>

        </main >
    );
}
