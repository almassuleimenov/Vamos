import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Токены должны лежать в файле .env.local
    // Укажи здесь свои данные, если не используешь .env
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8898484039:AAFjWZ-qWd2IO38NH0H-9TvRKaj55bekRSk';
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'ВАШ_CHAT_ID'; // Замени на свой ID
    const GOOGLE_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL || 'ВАШ_WEBHOOK_ИЗ_APPS_SCRIPT';

    // Формируем строгий шаблон для Telegram
    const tgText = `
🏢 <b>Новый запрос: Аль-Фараби 75/2</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Представитель:</b> ${data.name}
🏢 <b>Организация:</b> ${data.company || 'Не указана'}
📞 <b>Контакт:</b> ${data.phone}
📝 <b>Детали запроса:</b>
${data.message || 'Без комментариев'}
    `.trim();

    // Параллельная отправка запросов в TG и Sheets (экономим время ответа)
    const [tgResponse, sheetsResponse] = await Promise.allSettled([
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: tgText,
          parse_mode: 'HTML',
        }),
      }),
      // Раскомментируй, когда сделаешь Webhook в Google Sheets (инструкцию давал шагом ранее)
      fetch(GOOGLE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

    ]);

    // Проверка статуса Telegram (основной канал)
    if (tgResponse.status === 'rejected' || !tgResponse.value.ok) {
      console.error('Ошибка отправки в Telegram');
      throw new Error('Telegram API Error');
    }

    return NextResponse.json({ status: 'success', message: 'Запрос обработан' }, { status: 200 });

  } catch (error) {
    console.error('API /leads Error:', error);
    return NextResponse.json({ status: 'error', message: 'Ошибка сервера' }, { status: 500 });
  }
}