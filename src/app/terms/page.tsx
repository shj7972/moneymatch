import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '이용약관 | Money Match',
    description: 'Money Match 서비스 이용약관입니다. 서비스 이용 조건, 금지 행위, 면책 사항 등을 안내합니다.',
    alternates: {
        canonical: 'https://moneymatch.kr/terms',
    },
};

export default function TermsPage() {
    const lastUpdated = '2026년 2월 1일';

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Breadcrumb */}
                <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium">이용약관</span>
                </nav>

                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">이용약관</h1>
                    <p className="text-sm text-gray-400 mb-8">최종 업데이트: {lastUpdated}</p>

                    <div className="space-y-8 text-gray-700 leading-relaxed">

                        <section>
                            <p className="break-keep">
                                본 약관은 Money Match(이하 &quot;서비스&quot;)가 제공하는 정부지원금 정보 서비스의 이용 조건 및 절차,
                                이용자와 서비스 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제1조 서비스의 목적 및 성격</h2>
                            <p className="break-keep">
                                Money Match는 대한민국 정부 및 공공기관이 운영하는 지원금 제도에 대한 정보를 수집·정리하여 이용자에게 무료로 제공하는
                                정보 안내 서비스입니다. 서비스는 정부 공식 기관이 아니며, 지원금 신청을 대행하거나 지원금 수혜를 보장하지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제2조 서비스 이용</h2>
                            <ol className="space-y-3">
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">①</span>
                                    <span className="break-keep">서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">②</span>
                                    <span className="break-keep">서비스는 PC, 태블릿, 모바일 기기 등 다양한 환경에서 이용할 수 있습니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">③</span>
                                    <span className="break-keep">서비스 운영자는 서비스의 내용을 사전 공지 없이 변경하거나, 일시 중단 또는 종료할 수 있습니다.</span>
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제3조 정보의 정확성 및 면책</h2>
                            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 mb-4">
                                <p className="text-amber-800 font-semibold text-sm mb-2">⚠️ 중요 안내</p>
                                <p className="text-amber-700 text-sm break-keep">
                                    본 서비스에서 제공하는 지원금 정보는 공개된 공식 자료를 기반으로 하나, 정부 정책의 변경으로 인해
                                    실제 내용과 다를 수 있습니다. 지원금 신청 전 반드시 해당 공식 기관에서 최신 정보를 확인하시기 바랍니다.
                                </p>
                            </div>
                            <ol className="space-y-3">
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">①</span>
                                    <span className="break-keep">서비스에서 제공하는 정보는 참고 목적으로만 사용하여야 하며, 이를 근거로 한 신청·투자·법적 행위 등에서 발생하는 손해에 대해 서비스 운영자는 책임을 지지 않습니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">②</span>
                                    <span className="break-keep">서비스에 게재된 외부 링크(공식 사이트 등)를 통해 이용자가 제3자 사이트를 이용하는 경우, 해당 사이트에서 발생하는 모든 사항은 해당 사이트의 약관 및 운영 정책에 따릅니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">③</span>
                                    <span className="break-keep">서비스 운영자는 천재지변, 시스템 장애, 인터넷 연결 불량 등 불가피한 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</span>
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제4조 지식재산권</h2>
                            <ol className="space-y-3">
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">①</span>
                                    <span className="break-keep">서비스의 디자인, 텍스트, 코드, 구성 방식 등 서비스 운영자가 독자적으로 제작한 콘텐츠에 대한 저작권은 서비스 운영자에게 있습니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">②</span>
                                    <span className="break-keep">이용자는 서비스에서 제공하는 콘텐츠를 개인적 참고 목적으로 이용할 수 있으나, 상업적 목적의 무단 복제·배포·수정은 금지됩니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-semibold text-gray-900 flex-shrink-0">③</span>
                                    <span className="break-keep">정부 지원금 제도 자체에 대한 정보(지원 대상, 금액, 신청처 등)는 공공 정보로서 저작권의 보호를 받지 않습니다.</span>
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제5조 금지 행위</h2>
                            <p className="mb-3 break-keep">이용자는 서비스를 이용함에 있어 다음 행위를 하여서는 안 됩니다.</p>
                            <ul className="space-y-2">
                                <li className="flex gap-2"><span className="text-red-500 font-bold flex-shrink-0">✕</span><span className="break-keep">서비스 콘텐츠를 무단으로 크롤링·스크래핑하여 상업적으로 이용하는 행위</span></li>
                                <li className="flex gap-2"><span className="text-red-500 font-bold flex-shrink-0">✕</span><span className="break-keep">서비스의 정상적인 운영을 방해하는 기술적 수단을 이용하는 행위</span></li>
                                <li className="flex gap-2"><span className="text-red-500 font-bold flex-shrink-0">✕</span><span className="break-keep">서비스 운영자 또는 제3자를 사칭하는 행위</span></li>
                                <li className="flex gap-2"><span className="text-red-500 font-bold flex-shrink-0">✕</span><span className="break-keep">기타 관련 법령에 위반되는 행위</span></li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제6조 광고</h2>
                            <p className="break-keep">
                                서비스는 Google AdSense 등 제3자 광고 서비스를 통해 광고를 게재할 수 있습니다.
                                광고 내용은 서비스 운영자가 직접 제작하거나 추천하는 것이 아니며, 광고주와의 거래에서 발생하는 불이익에 대해
                                서비스 운영자는 책임을 지지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제7조 약관의 변경</h2>
                            <p className="break-keep">
                                서비스 운영자는 합리적인 사유가 있는 경우 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.
                                변경된 약관은 공지 후 7일이 경과하면 효력이 발생합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제8조 준거법 및 분쟁 해결</h2>
                            <p className="break-keep">
                                본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은 관련 법령에 따른 절차를 통해 해결합니다.
                            </p>
                        </section>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-400">본 이용약관은 {lastUpdated}부터 적용됩니다.</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
