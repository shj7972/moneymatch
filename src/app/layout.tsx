import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://moneymatch.kr"),
    title: {
        default: "Money Match - AI 실시간 금융 뉴스 & 지원금 매칭",
        template: "%s | Money Match",
    },
    description: "실시간 금융 뉴스 브리핑과 맞춤형 정부 지원금 정보를 제공하는 MoneyMatch입니다.",
    keywords: ["금융 뉴스", "지원금", "재테크", "AI 뉴스", "Money Match", "머니매치"],
    openGraph: {
        title: "Money Match - AI 금융 뉴스 & 지원금",
        description: "최신 금융 뉴스와 나에게 맞는 지원금을 확인하세요.",
        url: "https://moneymatch.kr",
        siteName: "Money Match",
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Money Match",
        description: "AI 실시간 금융 뉴스 & 지원금 매칭",
    },
    verification: {
        other: {
            "naver-site-verification": "a1a24676b337382ce91a97f923822948b2f34153",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={inter.className}>
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
            </body>
        </html>
    );
}
