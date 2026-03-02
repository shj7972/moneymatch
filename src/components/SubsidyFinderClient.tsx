'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Wallet,
    Baby,
    Users,
    Briefcase,
    Coins,
    ChevronRight,
    Search,
    Sparkles,
} from 'lucide-react';

// --- Types ---
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

// --- Filters Data ---
const FILTERS = {
    age: [
        { label: '청년 (19~34)', value: 'youth', keywords: ['청년', '만19-34세', '19~34'] },
        { label: '중장년', value: 'middle', keywords: ['중장년', '중년', '장년'] },
        { label: '노인 (65+)', value: 'senior', keywords: ['노인', '만65세', '어르신'] },
    ],
    status: [
        { label: '학생/구직자', value: 'jobseeker', keywords: ['학생', '구직', '취업', '실업'] },
        { label: '직장인/소상공인', value: 'worker', keywords: ['직장인', '근로자', '소상공인', '자영업', '중소기업'] },
        { label: '임신/육아', value: 'parent', keywords: ['임신', '육아', '출산', '부모', '아동', '난임'] },
    ],
    income: [
        { label: '잘 모름 (전체)', value: 'all', keywords: [] },
        { label: '저소득층', value: 'low_income', keywords: ['저소득', '기초수급', '차상위', '중위소득'] },
    ],
};

// --- Helper Functions ---
const getCategoryStyle = (category: string) => {
    if (category.includes('청년')) return 'border-blue-500 hover:shadow-blue-100';
    if (category.includes('육아')) return 'border-yellow-500 hover:shadow-yellow-100';
    if (category.includes('노인')) return 'border-green-500 hover:shadow-green-100';
    if (category.includes('중장년') || category.includes('구직')) return 'border-purple-500 hover:shadow-purple-100';
    return 'border-gray-500 hover:shadow-gray-100';
};

const getCategoryIcon = (category: string) => {
    if (category.includes('청년')) return <Briefcase className="w-4 h-4 text-blue-500" />;
    if (category.includes('육아')) return <Baby className="w-4 h-4 text-yellow-500" />;
    if (category.includes('노인')) return <Users className="w-4 h-4 text-green-500" />;
    if (category.includes('금융')) return <Wallet className="w-4 h-4 text-indigo-500" />;
    return <Coins className="w-4 h-4 text-gray-500" />;
};

// --- Sub Components ---

const FilterButton = ({
    isSelected,
    onClick,
    children,
}: {
    isSelected: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        className={`px-5 py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-200 shadow-sm border ${isSelected
            ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200 scale-105'
            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
    >
        {children}
    </button>
);

const SubsidyCard = ({ item }: { item: Subsidy }) => {
    return (
        <div
            className={`group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-t-4 ${getCategoryStyle(item.category)} h-full flex flex-col`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded-lg">
                    {getCategoryIcon(item.category)}
                    <span className="text-xs font-bold text-gray-600">
                        {item.category}
                    </span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                {item.title}
            </h3>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                {item.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
                {item.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">지원혜택</span>
                    <span className="text-blue-600 font-bold truncate max-w-[60%] text-right">{item.amount_text}</span>
                </div>
                <Link
                    href={`/money/${item.id}`}
                    className="mt-4 w-full flex items-center justify-center space-x-1 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-bold py-3 rounded-xl transition-colors text-sm"
                >
                    <span>자세히 보기</span>
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

const AdPlaceholder = () => (
    <div className="bg-gray-50 rounded-2xl p-6 text-center border border-dashed border-gray-200 flex flex-col items-center justify-center h-full min-h-[200px]">
        <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded mb-2">AD</span>
        <p className="text-gray-400 text-sm font-medium">맞춤형 광고가 표시됩니다</p>
    </div>
);

// --- Main Client Component ---

export default function SubsidyFinderClient({ subsidies }: { subsidies: Subsidy[] }) {
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedIncome, setSelectedIncome] = useState<string>('all');

    // --- Filtering Logic ---
    const filteredSubsidies = useMemo(() => {
        if (!selectedAge && !selectedStatus && selectedIncome === 'all') {
            return subsidies;
        }
        return subsidies.filter((item) => {
            let score = 0;
            let requiredMatches = 0;
            if (selectedAge) {
                requiredMatches++;
                const config = FILTERS.age.find(f => f.value === selectedAge);
                if (config) {
                    const hasMatch = config.keywords.some(k =>
                        item.tags.some(t => t.includes(k)) ||
                        item.category.includes(k) ||
                        item.title.includes(k) ||
                        (selectedAge === 'youth' && item.tags.includes('만19-34세')) ||
                        (selectedAge === 'senior' && item.tags.includes('만65세'))
                    );
                    if (hasMatch) score++;
                }
            }
            if (selectedStatus) {
                requiredMatches++;
                const config = FILTERS.status.find(f => f.value === selectedStatus);
                if (config) {
                    const hasMatch = config.keywords.some(k =>
                        item.tags.some(t => t.includes(k)) ||
                        item.category.includes(k) ||
                        item.title.includes(k)
                    );
                    if (hasMatch) score++;
                }
            }
            if (selectedIncome && selectedIncome !== 'all') {
                requiredMatches++;
                const config = FILTERS.income.find(f => f.value === selectedIncome);
                if (config) {
                    const hasMatch = config.keywords.some(k =>
                        item.tags.some(t => t.includes(k)) ||
                        item.category.includes(k) ||
                        item.title.includes(k)
                    );
                    if (hasMatch) score++;
                }
            }
            return score >= requiredMatches && requiredMatches > 0;
        });
    }, [selectedAge, selectedStatus, selectedIncome, subsidies]);

    const resetFilters = () => {
        setSelectedAge(null);
        setSelectedStatus(null);
        setSelectedIncome('all');
    }

    return (
        <>
            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-5">
                <div className="mb-0 space-y-8">
                    {/* Filter Group 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-blue-500" />
                            대상 연령
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {FILTERS.age.map((f) => (
                                <FilterButton
                                    key={f.value}
                                    isSelected={selectedAge === f.value}
                                    onClick={() => setSelectedAge(selectedAge === f.value ? null : f.value)}
                                >
                                    {f.label}
                                </FilterButton>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Filter Group 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <Briefcase className="w-5 h-5 mr-2 text-purple-500" />
                                현재 상황
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {FILTERS.status.map((f) => (
                                    <FilterButton
                                        key={f.value}
                                        isSelected={selectedStatus === f.value}
                                        onClick={() => setSelectedStatus(selectedStatus === f.value ? null : f.value)}
                                    >
                                        {f.label}
                                    </FilterButton>
                                ))}
                            </div>
                        </div>

                        {/* Filter Group 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <Wallet className="w-5 h-5 mr-2 text-green-500" />
                                소득 구간
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {FILTERS.income.map((f) => (
                                    <FilterButton
                                        key={f.value}
                                        isSelected={selectedIncome === f.value}
                                        onClick={() => setSelectedIncome(f.value)}
                                    >
                                        {f.label}
                                    </FilterButton>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subsidy Results */}
            <div className="max-w-7xl mx-auto px-5">
                <div className="mt-8">
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <Search className="w-6 h-6 mr-2 text-gray-400" />
                                맞춤 혜택
                                <span className="ml-2 bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">{filteredSubsidies.length}건</span>
                            </h2>
                            {(selectedAge || selectedStatus || selectedIncome !== 'all') && (
                                <button
                                    onClick={resetFilters}
                                    className="text-sm text-gray-500 hover:text-red-500 underline transition-colors flex items-center"
                                >
                                    필터 초기화
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredSubsidies.length > 0 ? (
                                filteredSubsidies.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <SubsidyCard item={item} />
                                        {(index + 1) % 6 === 0 && (
                                            <AdPlaceholder />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                                    <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-medium mb-2">조건에 맞는 보조금이 없습니다.</p>
                                    <p className="text-gray-400 text-sm mb-6">다른 필터 조건을 선택해보세요.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                    >
                                        전체 리스트 보기
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
