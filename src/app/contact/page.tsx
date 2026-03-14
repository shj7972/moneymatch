import { Metadata } from 'next';
import Link from 'next/link';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: '문의하기 | Money Match',
    description: 'Money Match에 문의사항, 오류 신고, 정보 수정 요청을 남겨주세요. 영업일 기준 3일 이내에 답변드립니다.',
    alternates: {
        canonical: 'https://moneymatch.kr/contact',
    },
    openGraph: {
        title: '문의하기 | Money Match',
        description: 'Money Match에 문의사항, 오류 신고, 정보 수정 요청을 남겨주세요.',
        url: 'https://moneymatch.kr/contact',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">

                {/* Breadcrumb */}
                <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium">문의하기</span>
                </nav>

                <ContactClient />

                {/* Links to legal pages */}
                <div className="bg-gray-100 rounded-2xl p-6 text-center">
                    <p className="text-sm text-gray-500 mb-3">관련 페이지</p>
                    <div className="flex justify-center gap-6 text-sm">
                        <Link href="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/terms" className="text-blue-600 hover:underline">이용약관</Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/about" className="text-blue-600 hover:underline">서비스 소개</Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
