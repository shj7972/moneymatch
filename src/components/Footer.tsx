'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Banner = {
    href: string;
    src: string;
    alt: string;
    title?: string;
    width: number;
    height: number;
};

const BANNERS: Banner[] = [
    {
        href: "https://stock-insight.app",
        src: "https://stock-insight.app/static/banner_link_234x60.png",
        alt: "내 주식, 살까 팔까? Stock Insight AI 분석 결과 보기",
        width: 234,
        height: 60,
    },
    {
        href: "https://unsedam.kr",
        src: "https://unsedam.kr/static/images/banner_link_234x60.png",
        alt: "운세담 - 2026 무료 토정비결 & AI 사주",
        width: 234,
        height: 60,
    },
    {
        href: "https://vibecheck.page",
        src: "https://vibecheck.page/images/vibecheck_banner_234x60.png",
        alt: "VibeCheck - 나를 찾는 트렌디한 심리테스트",
        title: "VibeCheck - 나를 찾는 트렌디한 심리테스트",
        width: 234,
        height: 60,
    },
    {
        href: "https://promptgenie.kr",
        src: "https://promptgenie.kr/images/banner_link_new_234x60.png",
        alt: "PromptGenie - AI Prompt Library",
        width: 234,
        height: 60,
    },
    {
        href: "https://irumlab.com",
        src: "https://irumlab.com/banner_link_234x60.png",
        alt: "이룸랩 - 무료 셀프 작명, 영어 닉네임, 브랜드 네이밍",
        title: "이룸랩 - 무료 셀프 작명, 영어 닉네임, 브랜드 네이밍",
        width: 234,
        height: 60,
    },
    {
        href: "https://nutrimatch.kr",
        src: "https://nutrimatch.kr/banner_link_234x60.png",
        alt: "내 몸이 진짜 원하는 영양제는? Nutri-Match 분석 결과 보기",
        title: "Nutri-Match - 나만의 영양제 궁합 & 저속노화 분석기",
        width: 234,
        height: 60,
    }
];

export default function Footer() {
    const [randomBanners, setRandomBanners] = useState<Banner[]>([]);

    useEffect(() => {
        const shuffled = [...BANNERS].sort(() => 0.5 - Math.random());
        setRandomBanners(shuffled.slice(0, 3));
    }, []);

    return (
        <footer className="relative bg-slate-900 pt-20 pb-12 mt-auto overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-5 relative z-10">
                {/* Banner Exchange Section */}
                <div className="mb-20">
                    <div className="flex flex-col items-center mb-10">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Official Partners</span>
                        <div className="w-12 h-0.5 bg-indigo-500/30 rounded-full" />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                        {randomBanners.map((banner, index) => (
                            <a
                                key={index}
                                href={banner.href}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                title={banner.title}
                                className="transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 opacity-40 hover:opacity-100"
                            >
                                <Image
                                    src={banner.src}
                                    alt={banner.alt}
                                    width={banner.width}
                                    height={banner.height}
                                    loading="lazy"
                                    className="rounded-lg shadow-2xl"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Legal Links & Info */}
                <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="max-w-xs">
                        <h2 className="text-xl font-black text-white mb-4">Money Match</h2>
                        <p className="text-slate-500 text-xs leading-relaxed break-keep">
                            당신의 삶에 실질적인 도움이 되는 정부 지원 정보를 인공지능이 가장 빠르고 정확하게 찾아드립니다.
                        </p>
                    </div>

                    <nav aria-label="사이트 하단 메뉴" className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-4 text-sm font-bold">
                        <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                            서비스 소개
                        </Link>
                        <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                            개인정보처리방침
                        </Link>
                        <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                            이용약관
                        </Link>
                        <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                            문의하기
                        </Link>
                    </nav>
                </div>

                {/* Copyright Section */}
                <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <p className="text-slate-600">
                        &copy; {new Date().getFullYear()} Money Match. All Rights Reserved.
                    </p>
                    <p className="text-slate-700 max-w-sm md:text-right">
                        정보의 정확성을 위해 항상 공식 기관의 최신 공고를 확인해 주세요.
                    </p>
                </div>
            </div>
        </footer>
    );
}
