'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

type NewsItem = {
    title: string;
    link: string;
    published: string;
    summary: string;
    sentiment: string;
};

export default function NewsRollingBanner({ items }: { items: NewsItem[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!items || items.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items]);

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];

    return (
        <div className="bg-gradient-to-r from-blue-50 to-white border-y border-blue-100 py-3 mb-8 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-5 flex items-center">
                <div className="flex-shrink-0 flex items-center mr-4">
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse mr-2">
                        🚨 긴급
                    </span>
                    <span className="text-sm font-bold text-gray-800 whitespace-nowrap hidden md:block">
                        오늘 뜬 지원 소식
                    </span>
                </div>

                <div className="flex-grow relative h-6 overflow-hidden">
                    <div key={currentIndex} className="absolute w-full animate-fade-in-up">
                        <a
                            href={currentItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-700 hover:text-blue-600 truncate group"
                        >
                            <span className="font-medium truncate mr-2">{currentItem.title}</span>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(currentItem.published).toLocaleDateString()}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-1" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
