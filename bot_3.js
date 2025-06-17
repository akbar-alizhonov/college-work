const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7198900652:AAGhb8FB5rXzq8Q78Lqp5mfojG5d9pEvEr0'); // Замените на реальный токен

// Команда /start
bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Опция 1', 'option1')
        .text('Опция 2', 'option2')
        .row()
        .text('Помощь', 'help');

    ctx.reply('Выберите одну из опций:', { reply_markup: keyboard });
});

// Обработка нажатий кнопок
bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    try {
        if (data === 'option1') {
            await ctx.answerCallbackQuery('Вы выбрали Опцию 1');
            await ctx.reply('Это содержание для Опции 1.');
        } else if (data === 'option2') {
            await ctx.answerCallbackQuery('Вы выбрали Опцию 2');
            await ctx.reply('Это содержание для Опции 2.');
        } else if (data === 'help') {
            await ctx.answerCallbackQuery('Выберите опцию для получения информации');
            await ctx.reply('Для получения информации выберите любую из опций.');
        }
    } catch (error) {
        console.error('Ошибка обработки callback:', error);
    }
});

// Запуск бота
bot.start();
console.log('Бот запущен...');