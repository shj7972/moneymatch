'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import subsidiesData from '@/data/subsidies.json';
import { ChevronRight, RotateCcw, Share2, CheckCircle2 } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

type Subsidy = {
    id: string;
    title: string;
    category: string;
    tags: string[];
    summary: string;
    target_text: string;
    amount_text: string;
    official_link: string;
};

interface QuizAnswer {
    age: string | null;
    employment: string | null;
    family: string | null;
    income: string | null;
    interest: string[];
}

const STEPS = [
    {
        key: 'age' as const,
        question: '나이대가 어떻게 되시나요?',
        options: [
            { label: '19~34세 (청년)', value: 'youth', keywords: ['청년', '만19-34세', '만19', '만34', '19~34'] },
            { label: '35~44세', value: 'adult', keywords: ['근로자', '직장인'] },
            { label: '45~64세 (중장년)', value: 'middle', keywords: ['중장년', '중년', '장년', '만40', '만45', '만50'] },
            { label: '65세 이상 (어르신)', value: 'senior', keywords: ['노인', '만65세', '어르신'] },
        ],
    },
    {
        key: 'employment' as const,
        question: '현재 어떤 상황이신가요?',
        options: [
            { label: '학생 / 구직 중', value: 'jobseeker', keywords: ['학생', '구직', '취업', '실업', '대학생'] },
            { label: '직장인 (회사원)', value: 'worker', keywords: ['직장인', '근로자', '재직자'] },
            { label: '자영업 / 소상공인', value: 'self_employed', keywords: ['소상공인', '자영업', '소기업'] },
            { label: '농업 / 어업 종사자', value: 'farmer', keywords: ['농업인', '어업인', '농어민'] },
        ],
    },
    {
        key: 'family' as const,
        question: '가족 상황을 알려주세요.',
        options: [
            { label: '미혼 / 1인 가구', value: 'single', keywords: ['1인가구', '단독', '청년'] },
            { label: '임신 중 / 출산 예정', value: 'pregnant', keywords: ['임신', '출산', '임산부', '난임'] },
            { label: '영유아 자녀 양육 중', value: 'infant', keywords: ['0-1세', '아동', '양육', '보육', '영유아', '8세미만'] },
            { label: '기타 (해당 없음)', value: 'none', keywords: [] },
        ],
    },
    {
        key: 'income' as const,
        question: '소득 수준은 어느 정도인가요?',
        options: [
            { label: '저소득 (기초수급 / 차상위)', value: 'low', keywords: ['저소득', '기초수급', '차상위', '중위소득', '기초생활'] },
            { label: '일반 소득', value: 'normal', keywords: [] },
            { label: '잘 모르겠음', value: 'unknown', keywords: [] },
        ],
    },
    {
        key: 'interest' as const,
        question: '관심 있는 분야를 모두 선택하세요. (복수 선택)',
        options: [
            { label: '주거 (전세/월세)', value: 'housing', keywords: ['전세', '월세', '주거', '청약', '내집마련', '주택'] },
            { label: '교육 / 훈련', value: 'education', keywords: ['교육', '등록금', '훈련', '장학', '자기개발'] },
            { label: '의료 / 건강', value: 'health', keywords: ['의료', '건강', '수술', '치료', '진료', '검진'] },
            { label: '금융 / 자산형성', value: 'finance', keywords: ['금융', '저축', '대출', '자산형성', '장려금'] },
        ],
    },
];

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer>({
        age: null,
        employment: null,
        family: null,
        income: null,
        interest: [],
    });
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (stepKey: string, value: string) => {
        if (stepKey === 'interest') {
            setAnswers((prev) => ({
                ...prev,
                interest: prev.interest.includes(value)
                    ? prev.interest.filter((v) => v !== value)
                    : [...prev.interest, value],
            }));
        } else {
            setAnswers((prev) => ({ ...prev, [stepKey]: value }));
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setAnswers({ age: null, employment: null, family: null, income: null, interest: [] });
        setShowResult(false);
    };

    const matchedSubsidies = useMemo(() => {
        if (!showResult) return [];

        const allKeywords: string[] = [];

        STEPS.forEach((step) => {
            if (step.key === 'interest') {
                answers.interest.forEach((val) => {
                    const opt = step.options.find((o) => o.value === val);
                    if (opt) allKeywords.push(...opt.keywords);
                });
            } else {
                const val = answers[step.key];
                if (val) {
                    const opt = step.options.find((o) => o.value === val);
                    if (opt) allKeywords.push(...opt.keywords);
                }
            }
        });

        if (allKeywords.length === 0) return subsidiesData as Subsidy[];

        const scored = (subsidiesData as Subsidy[]).map((subsidy) => {
            let score = 0;
            const searchableText = [
                subsidy.title,
                subsidy.category,
                ...subsidy.tags,
                subsidy.target_text,
                subsidy.summary,
            ].join(' ');

            allKeywords.forEach((keyword) => {
                if (keyword && searchableText.includes(keyword)) {
                    score += 1;
                }
            });

            return { subsidy, score };
        });

        return scored
            .filter((s) => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .map((s) => s.subsidy);
    }, [showResult, answers]);

    const step = STEPS[currentStep];
    const canProceed =
        step.key === 'interest'
            ? answers.interest.length > 0
            : answers[step.key] !== null;

    if (showResult) {
        return (
            <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Result Header */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-8">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
                            나에게 맞는 지원금 {matchedSubsidies.length}건 발견!
                        </h1>
                        <p className="text-blue-100">
                            아래 지원금들을 확인하고 신청해보세요.
                        </p>
                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                다시 하기
                            </button>
                            <ShareButton
                                title="나에게 맞는 정부지원금 찾기 | Money Match"
                                text={`나에게 맞는 정부지원금 ${matchedSubsidies.length}건을 찾았어요! 당신도 확인해보세요.`}
                                className="bg-white/20 border-transparent text-white hover:bg-white/30"
                            />
                        </div>
                    </div>

                    {/* Result List */}
                    <div className="space-y-4">
                        {matchedSubsidies.map((subsidy) => (
                            <Link
                                key={subsidy.id}
                                href={`/money/${subsidy.id}`}
                                className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <span className="text-xs font-medium text-gray-400 mb-1 block">
                                            {subsidy.category}
                                        </span>
                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                            {subsidy.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {subsidy.summary}
                                        </p>
                                        <p className="text-sm text-blue-600 font-semibold mt-2">
                                            {subsidy.amount_text}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 mt-2 flex-shrink-0" />
                                </div>
                            </Link>
                        ))}

                        {matchedSubsidies.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                <p className="text-gray-500 mb-4">
                                    조건에 정확히 맞는 지원금을 찾지 못했습니다.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    전체 지원금 둘러보기
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Blog CTA */}
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                        <p className="text-gray-500 mb-3">더 자세한 정보가 필요하신가요?</p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700"
                        >
                            지원금 가이드 보기
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-500">
                            {currentStep + 1} / {STEPS.length}
                        </span>
                        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
                            건너뛰기
                        </Link>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 break-keep">
                        {step.question}
                    </h1>

                    <div className="space-y-3">
                        {step.options.map((option) => {
                            const isSelected =
                                step.key === 'interest'
                                    ? answers.interest.includes(option.value)
                                    : answers[step.key] === option.value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(step.key, option.value)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
                                        isSelected
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200 hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option.label}</span>
                                        {isSelected && (
                                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                                currentStep === 0
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            이전
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canProceed}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${
                                canProceed
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {currentStep === STEPS.length - 1 ? '결과 보기' : '다음'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
