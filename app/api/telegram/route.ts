import { Telegraf } from 'telegraf';
import { NextResponse } from 'next/server';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');

// Обработка команды /start
bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать в TON Donation! Используйте кнопку меню для доступа к приложению.');
});

// Обработка команды /help
bot.command('help', (ctx) => {
  ctx.reply('Это бот для донатов в TON. Используйте кнопку меню для доступа к приложению.');
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error handling Telegram update:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 