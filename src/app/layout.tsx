import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://moneymatch.kr"),
    title: {
        default: "2026 정부지원금 찾기 - 나에게 맞는 보조금 매칭 | Money Match",
        template: "%s | Money Match - 정부지원금 매칭",
    },
    description:
        "청년·육아·노인·저소득 정부지원금을 3초 만에 찾아보세요. 청년도약계좌, 부모급여, 기초연금 등 32가지 보조금 정보와 신청방법을 한눈에 확인할 수 있습니다.",
    keywords: [
        "정부지원금",
        "보조금",
        "청년지원금",
        "육아수당",
        "기초연금",
        "부모급여",
        "청년도약계좌",
        "복지혜택",
        "정부보조금 신청",
        "2026 지원금",
        "Money Match",
        "머니매치",
    ],
    openGraph: {
        title: "2026 정부지원금 찾기 - 나에게 맞는 보조금 매칭 | Money Match",
        description:
            "청년·육아·노인·저소득 정부지원금을 3초 만에 찾아보세요. 32가지 보조금 정보와 신청방법을 한눈에!",
        url: "https://moneymatch.kr",
        siteName: "Money Match",
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "2026 정부지원금 찾기 | Money Match",
        description:
            "청년·육아·노인·저소득 정부지원금을 3초 만에 찾아보세요.",
    },
    alternates: {
        canonical: "https://moneymatch.kr",
    },
    verification: {
        other: {
            "naver-site-verification": "a1a24676b337382ce91a97f923822948b2f34153",
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://moneymatch.kr/#website",
            url: "https://moneymatch.kr",
            name: "Money Match",
            description:
                "청년·육아·노인·저소득 정부지원금을 3초 만에 찾아보세요.",
            inLanguage: "ko",
            potentialAction: {
                "@type": "SearchAction",
                target: "https://moneymatch.kr/?q={search_term_string}",
                "query-input": "required name=search_term_string",
            },
        },
        {
            "@type": "Organization",
            "@id": "https://moneymatch.kr/#organization",
            name: "Money Match",
            url: "https://moneymatch.kr",
            logo: {
                "@type": "ImageObject",
                url: "https://moneymatch.kr/icon.png",
            },
        },
        {
            "@type": "BreadcrumbList",
            "@id": "https://moneymatch.kr/#breadcrumb",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "홈",
                    item: "https://moneymatch.kr",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "지원금 가이드",
                    item: "https://moneymatch.kr/blog",
                },
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2947913248390883"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-W73M3RBDFT"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-W73M3RBDFT');
          `}
                </Script>
                {children}
                <Footer />
            </body>
        </html>
    );
}
