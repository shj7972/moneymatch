import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { error: '제목과 내용을 입력해 주세요.' },
                { status: 400 }
            );
        }

        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error('RESEND_API_KEY is not defined');
            return NextResponse.json(
                { error: '서버 설정 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
                { status: 500 }
            );
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'MoneyMatch <onboarding@resend.dev>', // Resend 기본 발송 주소 (도메인 설정 전)
                to: ['seo.hyunjong@gmail.com'],
                subject: `[MoneyMatch] ${title}`,
                html: `<p>${content.replace(/\n/g, '<br>')}</p>`,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API error:', errorData);
            return NextResponse.json(
                { error: '메일 발송 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
