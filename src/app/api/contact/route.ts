import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing name or phone' }, { status: 400 });
    }

    const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GOOGLE_SHEETS_WEBHOOK_URL } = process.env;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !GOOGLE_SHEETS_WEBHOOK_URL) {
      return NextResponse.json({ 
        error: 'Отсутствуют ENV переменные', 
        details: {
          botToken: !!TELEGRAM_BOT_TOKEN,
          chatId: !!TELEGRAM_CHAT_ID,
          webhook: !!GOOGLE_SHEETS_WEBHOOK_URL
        }
      }, { status: 500 });
    }

    const telegramText = `🔥 Новый запрос!\n\nИмя: ${name}\nТелефон: ${phone}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const results = await Promise.allSettled([
      fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText }),
      }).then(async res => {
        if (!res.ok) {
          const tgError = await res.text();
          throw new Error(`TG HTTP ${res.status}: ${tgError}`);
        }
      }),
      
      fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, 
        body: JSON.stringify({ name, phone }),
      }).then(async res => {
        if (!res.ok) {
          const gsError = await res.text();
          throw new Error(`Google HTTP ${res.status}: ${gsError}`);
        }
      })
    ]);

    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map(r => r.reason.message);

    if (errors.length > 0) {
      // Если хотя бы один сервис упал, возвращаем ошибку для понимания причины
      return NextResponse.json({ error: 'Partial/Total failure', details: errors }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal API Error', details: error.message }, { status: 500 });
  }
}