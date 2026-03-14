import { Metadata } from 'next';
import Link from 'next/link';

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

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3">문의하기</h1>
                    <p className="text-gray-600 leading-relaxed break-keep">
                        서비스 이용 중 궁금한 점이 있거나, 지원금 정보에 오류를 발견하셨나요?
                        아래 이메일로 문의해 주시면 <strong>영업일 기준 3일 이내</strong>에 답변드리겠습니다.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">연락처 정보</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm mb-1">이메일</p>
                                <a
                                    href="mailto:contact@moneymatch.kr"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    contact@moneymatch.kr
                                </a>
                                <p className="text-xs text-gray-400 mt-1">영업일 기준 3일 이내 답변</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm mb-1">운영 시간</p>
                                <p className="text-gray-600">평일 09:00 ~ 18:00</p>
                                <p className="text-xs text-gray-400 mt-1">주말 및 공휴일 제외</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ shortcut */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">자주 묻는 문의 유형</h2>
                    <div className="space-y-3">
                        {[
                            {
                                icon: '🔍',
                                title: '지원금 정보 오류 신고',
                                desc: '지원 금액, 조건, 신청처 등 정보가 현재와 다른 경우 알려주세요. 빠르게 수정하겠습니다.',
                            },
                            {
                                icon: '➕',
                                title: '지원금 추가 요청',
                                desc: '아직 등록되지 않은 지원금이 있다면 알려주세요. 검토 후 추가하겠습니다.',
                            },
                            {
                                icon: '💡',
                                title: '서비스 개선 제안',
                                desc: '사용하면서 불편하셨던 점이나 추가되었으면 하는 기능을 제안해 주세요.',
                            },
                            {
                                icon: '⚖️',
                                title: '개인정보 관련 문의',
                                desc: '개인정보 처리방침 및 데이터 관련 문의는 이메일로 문의해 주세요.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5 break-keep">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
