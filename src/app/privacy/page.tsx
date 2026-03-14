import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '개인정보처리방침 | Money Match',
    description: 'Money Match의 개인정보처리방침입니다. 수집하는 개인정보의 항목, 이용 목적, 보유 기간 등을 안내합니다.',
    alternates: {
        canonical: 'https://moneymatch.kr/privacy',
    },
};

export default function PrivacyPage() {
    const lastUpdated = '2026년 2월 1일';

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Breadcrumb */}
                <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium">개인정보처리방침</span>
                </nav>

                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">개인정보처리방침</h1>
                    <p className="text-sm text-gray-400 mb-8">최종 업데이트: {lastUpdated}</p>

                    <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

                        <section>
                            <p className="break-keep">
                                Money Match(이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 및 관련 법령에 따라
                                이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다.
                                본 개인정보처리방침은 서비스가 어떤 정보를 수집하고 어떻게 사용하는지 설명합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제1조 수집하는 개인정보 항목 및 수집 방법</h2>
                            <p className="mb-3 break-keep">서비스는 별도의 회원가입 절차 없이 이용할 수 있으며, 다음의 정보를 자동으로 수집할 수 있습니다.</p>
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <h3 className="font-semibold text-gray-800 mb-2">자동 수집 정보 (서비스 이용 시)</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>• IP 주소, 방문 일시, 서비스 이용 기록, 브라우저 종류</li>
                                    <li>• 쿠키(Cookie): 구글 애널리틱스(Google Analytics) 통계 목적</li>
                                    <li>• 광고 쿠키: 구글 애드센스(Google AdSense) 맞춤형 광고 목적</li>
                                </ul>
                            </div>
                            <p className="mt-3 text-sm text-gray-500 break-keep">
                                ※ 서비스는 이름, 주민등록번호, 연락처 등 직접 식별 가능한 개인정보를 별도로 수집하지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제2조 개인정보의 이용 목적</h2>
                            <p className="mb-3 break-keep">수집된 정보는 다음 목적으로만 이용됩니다.</p>
                            <ul className="space-y-2">
                                <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">①</span><span className="break-keep">서비스 접속 통계 분석 및 품질 개선 (Google Analytics)</span></li>
                                <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">②</span><span className="break-keep">맞춤형 광고 제공 (Google AdSense)</span></li>
                                <li className="flex gap-2"><span className="text-blue-500 font-bold flex-shrink-0">③</span><span className="break-keep">서비스의 원활한 운영 및 보안 유지</span></li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제3조 개인정보의 보유 및 이용 기간</h2>
                            <p className="break-keep">
                                자동 수집되는 통계 정보(Google Analytics)는 수집일로부터 26개월간 보관되며, 이후 자동 삭제됩니다.
                                광고 관련 쿠키는 구글의 정책에 따라 관리됩니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제4조 개인정보의 제3자 제공</h2>
                            <p className="break-keep">
                                서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                                다만, 서비스 운영을 위해 아래 업체에 업무를 위탁하고 있습니다.
                            </p>
                            <div className="mt-3 bg-gray-50 rounded-xl p-5 border border-gray-100 text-sm">
                                <div className="grid grid-cols-2 gap-2 font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-2">
                                    <span>수탁 업체</span>
                                    <span>위탁 업무</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-gray-600">
                                    <span>Google LLC</span>
                                    <span>웹 분석(Analytics) 및 광고(AdSense) 서비스 운영</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제5조 쿠키(Cookie) 관리</h2>
                            <p className="mb-3 break-keep">
                                서비스는 구글 애널리틱스 및 애드센스 운영을 위해 쿠키를 사용합니다.
                                이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.
                                단, 쿠키를 거부할 경우 일부 서비스 이용에 불편이 생길 수 있습니다.
                            </p>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm text-gray-600">
                                <p className="font-semibold text-gray-700 mb-1">브라우저별 쿠키 설정 경로</p>
                                <ul className="space-y-1">
                                    <li>• Chrome: 설정 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터</li>
                                    <li>• Safari: 환경설정 &gt; 개인정보 보호 &gt; 쿠키 및 웹 사이트 데이터</li>
                                    <li>• Firefox: 설정 &gt; 개인정보 및 보안 &gt; 향상된 추적 방지</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제6조 이용자의 권리</h2>
                            <p className="break-keep">
                                이용자는 언제든지 개인정보 처리에 관한 동의를 철회하거나 처리 정지를 요청할 수 있습니다.
                                관련 문의는 아래 연락처로 문의해 주시기 바랍니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제7조 개인정보 보호책임자</h2>
                            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 text-sm">
                                <ul className="space-y-1 text-gray-700">
                                    <li><span className="font-semibold">서비스명:</span> Money Match (머니매치)</li>
                                    <li><span className="font-semibold">이메일:</span> <Link href="/contact" className="text-blue-600 hover:underline">문의 폼 이용</Link></li>
                                    <li><span className="font-semibold">처리 기간:</span> 영업일 기준 7일 이내 답변</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">제8조 개인정보처리방침의 변경</h2>
                            <p className="break-keep">
                                본 방침은 법령 변경이나 서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.
                                중요한 변경 사항이 있을 경우 서비스 첫 화면을 통해 별도로 안내합니다.
                            </p>
                        </section>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-400">본 개인정보처리방침은 {lastUpdated}부터 적용됩니다.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/contact" className="text-blue-600 hover:underline text-sm">
                        개인정보 관련 문의하기 →
                    </Link>
                </div>
            </div>
        </main>
    );
}
