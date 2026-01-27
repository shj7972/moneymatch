'use client';

import React, { useEffect, useState } from 'react';

type Banner = {
    href: string;
    src: string;
    alt: string;
    title?: string;
    width: number;
    height: number;
    style?: React.CSSProperties;
};

const BANNERS: Banner[] = [
    {
        href: "https://stock-insight.app",
        src: "https://stock-insight.app/static/banner_link_234x60.png",
        alt: "내 주식, 살까 팔까? Stock Insight AI 분석 결과 보기",
        width: 234,
        height: 60,
        style: { border: 0 }
    },
    {
        href: "https://unsedam.kr",
        src: "https://unsedam.kr/static/images/banner_link_234x60.png",
        alt: "운세담 - 2026 무료 토정비결 & AI 사주",
        width: 234,
        height: 60,
        style: { border: "none" }
    },
    {
        href: "https://vibecheck.page",
        src: "https://vibecheck.page/images/vibecheck_banner_234x60.png",
        alt: "VibeCheck 배너",
        title: "VibeCheck - 나를 찾는 트렌디한 심리테스트",
        width: 234,
        height: 60,
        style: { borderRadius: "4px", border: "1px solid #eee" }
    },
    {
        href: "https://promptgenie.kr",
        src: "https://promptgenie.kr/images/banner_link_new_234x60.png",
        alt: "PromptGenie - AI Prompt Library",
        width: 234,
        height: 60,
        style: { border: 0 }
    },
    {
        href: "https://irumlab.com",
        src: "https://irumlab.com/banner_link_234x60.png",
        alt: "이룸랩 배너",
        title: "이룸랩 - 무료 셀프 작명, 영어 닉네임, 브랜드 네이밍",
        width: 234,
        height: 60,
        style: { border: 0 }
    },
    {
        href: "https://nutrimatch.kr",
        src: "https://nutrimatch.kr/banner_link_234x60.png",
        alt: "내 몸이 진짜 원하는 영양제는? Nutri-Match 분석 결과 보기",
        title: "Nutri-Match - 나만의 영양제 궁합 & 저속노화 분석기",
        width: 234,
        height: 60,
        style: { border: 0, borderRadius: "4px" }
    }
];

export default function Footer() {
    const [randomBanners, setRandomBanners] = useState<Banner[]>([]);

    useEffect(() => {
        // Randomly select 3 banners on client-side mount
        const shuffled = [...BANNERS].sort(() => 0.5 - Math.random());
        setRandomBanners(shuffled.slice(0, 3));
    }, []);

    return (
        <footer className="bg-white border-t border-gray-100 pt-10 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-5">

                {/* Banner Exchange Section */}
                <div className="mb-10">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">
                        Partner Sites
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                        {randomBanners.map((banner, index) => (
                            <a
                                key={index}
                                href={banner.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={banner.title}
                                className="transition-transform hover:-translate-y-1"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={banner.src}
                                    alt={banner.alt}
                                    width={banner.width}
                                    height={banner.height}
                                    style={banner.style}
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center border-t border-gray-50 pt-8">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Money Match. All rights reserved.
                    </p>
                    <p className="text-gray-300 text-xs mt-2">
                        본 사이트에서 제공하는 정보는 참고용이며, 정확한 정보는 각 공식 기관에서 확인하시기 바랍니다.
                    </p>
                </div>
            </div>
        </footer>
    );
}
