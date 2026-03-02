import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '맞춤 지원금 찾기 퀴즈 - 5가지 질문으로 나에게 맞는 보조금 매칭',
    description:
        '나이, 직업, 가족 상황, 소득 수준, 관심 분야 5가지 질문에 답하면 받을 수 있는 정부지원금을 자동으로 매칭해드립니다. 청년·육아·노인·저소득 맞춤형 보조금을 지금 확인하세요.',
    openGraph: {
        title: '나에게 맞는 정부지원금 찾기 | Money Match 퀴즈',
        description:
            '5가지 간단한 질문으로 받을 수 있는 정부지원금을 찾아보세요. 무료 맞춤 매칭!',
        url: 'https://moneymatch.kr/quiz',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '나에게 맞는 정부지원금 찾기 | Money Match',
        description:
            '5가지 간단한 질문으로 받을 수 있는 정부지원금을 찾아보세요.',
    },
    alternates: {
        canonical: 'https://moneymatch.kr/quiz',
    },
    keywords: [
        '정부지원금 찾기',
        '맞춤 보조금',
        '지원금 매칭',
        '보조금 퀴즈',
        '청년지원금',
        '육아수당',
        '정부보조금 신청',
    ],
};

export default function QuizLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
