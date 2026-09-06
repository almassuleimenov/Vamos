import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const GOOGLE_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!CHAT_ID || !BOT_TOKEN) {
      console.error('❌ ОШИБКА: Не заданы ключи Telegram.');
      return NextResponse.json({ status: 'error', message: 'TG config error' }, { status: 500 });
    }

    const tgText = `
🏢 <b>Новый запрос: Аль-Фараби 75/2</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Представитель:</b> ${data.name}
🏢 <b>Организация:</b> ${data.company || 'Не указана'}
📞 <b>Контакт:</b> ${data.phone}
📝 <b>Детали запроса:</b>
${data.message || 'Без комментариев'}
    `.trim();

    // 1. Отправляем в Telegram
    const tgRequest = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: tgText, parse_mode: 'HTML' }),
    });

    // 2. Отправляем в Google Sheets
    let sheetsRequest = null;
    if (GOOGLE_WEBHOOK) {
      sheetsRequest = fetch(GOOGLE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        redirect: 'follow' // КРИТИЧНО ДЛЯ GOOGLE APPS SCRIPT! Без этого будет ошибка
      });
    }

    // Ждем выполнения обоих запросов параллельно
    const [tgResponse, sheetsResponse] = await Promise.allSettled([
      tgRequest,
      ...(sheetsRequest ? [sheetsRequest] : [])
    ]);

    // Проверка Telegram
    if (tgResponse.status === 'rejected' || !tgResponse.value.ok) {
      console.error('❌ Ошибка отправки в Telegram');
      throw new Error('Telegram API Error');
    }

    // Проверка Google Sheets
    if (sheetsResponse && sheetsResponse.status === 'fulfilled') {
      if (sheetsResponse.value.ok) {
        console.log('✅ Данные успешно ушли в Google Sheets');
      } else {
        const errorText = await sheetsResponse.value.text();
        console.error('❌ Google Sheets вернул ошибку:', sheetsResponse.value.status, errorText);
      }
    } else if (sheetsResponse && sheetsResponse.status === 'rejected') {
      console.error('❌ Ошибка сети при обращении к Google Sheets:', sheetsResponse.reason);
    }

    return NextResponse.json({ status: 'success', message: 'Запрос обработан' }, { status: 200 });

  } catch (error) {
    console.error('API /leads Error:', error);
    return NextResponse.json({ status: 'error', message: 'Ошибка сервера' }, { status: 500 });
  }
}