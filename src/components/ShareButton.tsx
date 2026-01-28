'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareButtonProps {
    title?: string;
    text?: string;
    url?: string;
    className?: string; // Allow custom styling
}

export default function ShareButton({
    title = 'Money Match',
    text = '나에게 꼭 맞는 정부지원금을 찾아보세요!',
    url,
    className = '',
}: ShareButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        const shareUrl = url || window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(shareUrl);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
                alert('링크가 클립보드에 복사되었습니다!');
            } catch (err) {
                console.error('Failed to copy code', err);
                // Fallback for older browsers (unlikely needed for modern Next.js apps but good practice)
                const textArea = document.createElement("textarea");
                textArea.value = shareUrl;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                    alert('링크가 클립보드에 복사되었습니다!');
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                    alert('링크 복사에 실패했습니다. URL을 직접 복사해주세요.');
                }
                document.body.removeChild(textArea);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${isCopied
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 shadow-sm'
                } ${className}`}
            aria-label="공유하기"
        >
            {isCopied ? (
                <>
                    <Check className="w-4 h-4" />
                    <span>복사됨</span>
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4" />
                    <span>공유하기</span>
                </>
            )}
        </button>
    );
}
