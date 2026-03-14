'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactClient() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setTitle('');
                setContent('');
            } else {
                setStatus('error');
                setErrorMessage(data.error || '오류가 발생했습니다.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3">문의하기</h1>
                <p className="text-gray-600 leading-relaxed break-keep text-sm md:text-base">
                    서비스 이용 중 궁금한 점이 있거나, 지원금 정보에 오류를 발견하셨나요?
                    아래 양식을 작성해 보내주시면 <strong>영업일 기준 3일 이내</strong>에 답변드리겠습니다.
                </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    문의 양식
                </h2>
                
                {status === 'success' ? (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">메시지가 전송되었습니다!</h3>
                        <p className="text-gray-600 mb-6">소중한 의견 감사드립니다. 확인 후 빠르게 답변드리겠습니다.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                        >
                            추가 문의하기
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                제목
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="문의 제목을 입력해 주세요"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                                내용
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={6}
                                placeholder="상세한 문의 내용을 입력해 주세요"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                            />
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                                status === 'loading' 
                                ? 'bg-blue-400 cursor-not-allowed shadow-none' 
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98]'
                            }`}
                        >
                            {status === 'loading' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    전송 중...
                                </>
                            ) : (
                                '메시지 보내기'
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* FAQ shortcut */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">자주 묻는 문의 유형</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        {
                            icon: '🔍',
                            title: '정보 오류 신고',
                            desc: '금액, 조건 등 정보가 다른 경우 알려주세요.',
                        },
                        {
                            icon: '➕',
                            title: '지원금 추가 요청',
                            desc: '등록되지 않은 지원금을 제보해 주세요.',
                        },
                        {
                            icon: '💡',
                            title: '서비스 개선 제안',
                            desc: '불편한 점이나 제안하고 싶은 기능을 알려주세요.',
                        },
                        {
                            icon: '⚖️',
                            title: '개인정보 문의',
                            desc: '데이터 관련 문의를 남겨주세요.',
                        },
                    ].map((item) => (
                        <div key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                            <div>
                                <p className="font-semibold text-gray-900 text-xs">{item.title}</p>
                                <p className="text-[11px] text-gray-500 mt-0.5 break-keep line-clamp-2">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
