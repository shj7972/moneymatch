import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Money Match 소개 - 정부지원금 매칭 서비스',
    description: 'Money Match는 복잡한 정부지원금 정보를 누구나 쉽게 찾을 수 있도록 만든 무료 정보 서비스입니다. 청년·육아·노인·저소득 가구를 위한 58가지 지원금을 한눈에 확인하세요.',
    alternates: {
        canonical: 'https://moneymatch.kr/about',
    },
    openGraph: {
        title: 'Money Match 소개 - 정부지원금 매칭 서비스',
        description: '복잡한 정부지원금 정보를 누구나 쉽게 찾을 수 있도록 만든 무료 정보 서비스입니다.',
        url: 'https://moneymatch.kr/about',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Breadcrumb */}
                <nav aria-label="브레드크럼" className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium">서비스 소개</span>
                </nav>

                {/* Hero */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4 break-keep">
                        Money Match 소개
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed break-keep">
                        대한민국에는 수백 가지의 정부지원금 제도가 있지만, 정작 본인이 받을 수 있는 혜택을 모두 알고 신청하는 사람은 많지 않습니다.
                        복잡한 자격 조건, 흩어진 신청 경로, 어려운 행정 용어 때문에 매년 수천억 원의 지원금이 미신청 상태로 남아있습니다.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed break-keep mt-4">
                        <strong className="text-gray-900">Money Match</strong>는 이 문제를 해결하기 위해 만들어진 무료 정보 서비스입니다.
                        나이, 취업 상태, 가족 구성, 소득 수준을 입력하면 3초 만에 나에게 맞는 정부지원금 목록을 보여드립니다.
                    </p>
                </div>

                {/* Why we exist */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        왜 Money Match를 만들었나요?
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">정보의 파편화</h3>
                                <p className="text-gray-600 leading-relaxed break-keep">
                                    청년도약계좌는 금융위원회, 부모급여는 보건복지부, 국가장학금은 교육부… 지원금마다 담당 부처와 신청 사이트가 달라
                                    한 곳에서 전체 그림을 보기 어렵습니다. Money Match는 이 모든 정보를 한 곳에 모았습니다.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">조건 매칭의 어려움</h3>
                                <p className="text-gray-600 leading-relaxed break-keep">
                                    "나는 해당되나요?"라는 질문에 답하려면 여러 부처 사이트를 돌아다니며 복잡한 기준을 일일이 확인해야 합니다.
                                    Money Match의 퀴즈 매칭 기능은 몇 가지 질문만으로 나에게 해당되는 지원금만 필터링해줍니다.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">늦은 신청으로 인한 손실</h3>
                                <p className="text-gray-600 leading-relaxed break-keep">
                                    아동수당은 출생 후 60일 이내, 첫만남이용권은 출생 후 1년 이내에 신청해야 합니다. 모르면 놓치는 지원금이 많습니다.
                                    Money Match의 가이드 블로그에서는 시기별로 놓치지 말아야 할 지원금 정보를 제공합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What we offer */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Money Match가 제공하는 것
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                            <div className="text-2xl mb-2">🎯</div>
                            <h3 className="font-bold text-gray-900 mb-1">지원금 매칭</h3>
                            <p className="text-sm text-gray-600 break-keep">나이·취업상태·소득 조건으로 받을 수 있는 지원금만 필터링</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                            <div className="text-2xl mb-2">📋</div>
                            <h3 className="font-bold text-gray-900 mb-1">58가지 지원금 정보</h3>
                            <p className="text-sm text-gray-600 break-keep">청년·육아·노인·저소득·중장년 카테고리별 상세 정보</p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
                            <div className="text-2xl mb-2">✅</div>
                            <h3 className="font-bold text-gray-900 mb-1">퀴즈 매칭</h3>
                            <p className="text-sm text-gray-600 break-keep">5가지 질문으로 나에게 맞는 지원금 목록을 자동으로 추천</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                            <div className="text-2xl mb-2">📰</div>
                            <h3 className="font-bold text-gray-900 mb-1">가이드 & 뉴스</h3>
                            <p className="text-sm text-gray-600 break-keep">신청 방법 가이드와 정부지원금 최신 뉴스를 매일 업데이트</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>⚠️</span> 이용 시 유의사항
                    </h2>
                    <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                        <li>• Money Match는 정부 공식 기관이 아닌 <strong>민간 정보 서비스</strong>입니다.</li>
                        <li>• 제공되는 모든 지원금 정보는 공개된 공식 자료를 기반으로 하며, 정확성을 위해 주기적으로 업데이트하고 있습니다.</li>
                        <li>• 지원금 신청 자격 및 금액은 정부 정책에 따라 변경될 수 있으므로, 최종 확인은 반드시 <strong>각 공식 기관 사이트</strong>에서 하시기 바랍니다.</li>
                        <li>• 본 사이트의 정보를 이용한 결과에 대한 법적 책임은 이용자 본인에게 있습니다.</li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-xl font-bold mb-2">지금 바로 나에게 맞는 지원금 찾아보기</h2>
                    <p className="text-blue-100 mb-6">3초 만에 받을 수 있는 지원금을 확인하세요.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            지원금 매칭 시작하기
                        </Link>
                        <Link
                            href="/quiz"
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-bold rounded-xl border border-blue-400 hover:bg-blue-400 transition-colors"
                        >
                            퀴즈로 매칭하기
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
