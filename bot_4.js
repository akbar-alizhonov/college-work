const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7198900652:AAGhb8FB5rXzq8Q78Lqp5mfojG5d9pEvEr0'); // Замените на токен от @BotFather

// Обработчик ошибок
bot.catch((err) => {
    console.error('Ошибка в боте:', err);
});

// Команда /start
bot.command('start', (ctx) => {
    ctx.reply(`
🎲 Добро пожаловать в игру "Орел и решка"!
📜 Правила:
1. Нажми /play чтобы начать
2. Выбери ставку: "Орел" или "Решка"
3. Бот подбросит монету
4. Если угадал - победа! Если нет - попробуй еще раз

🔄 Чтобы начать, нажми /play
❓ Помощь - /help
    `);
});

// Команда /help
bot.command('help', (ctx) => {
    ctx.reply(`
📌 Доступные команды:
/start - Начать игру
/play - Подбросить монету
/help - Правила игры

🎯 Как играть?
1. Нажми /play
2. Выбери "Орел" или "Решка"
3. Узнай результат!
    `);
});

// Команда /play
bot.command('play', async (ctx) => {
    try {
        const betKeyboard = new InlineKeyboard()
            .text('Орел', 'heads')
            .text('Решка', 'tails');

        await ctx.reply('Выбери ставку:', { reply_markup: betKeyboard });
    } catch (error) {
        console.error('Ошибка в /play:', error);
    }
});

// Обработка ставок
bot.on('callback_query:data', async (ctx) => {
    try {
        // Сначала отвечаем на callback, чтобы Telegram знал, что запрос обработан
        await ctx.answerCallbackQuery();
        
        const userChoice = ctx.callbackQuery.data;
        
        // Если нажали "Еще раз" или "Выйти"
        if (userChoice === 'play_again') {
            const betKeyboard = new InlineKeyboard()
                .text('Орел', 'heads')
                .text('Решка', 'tails');
            
            await ctx.editMessageText('Выбери ставку:', { reply_markup: betKeyboard });
            return;
        }
        
        if (userChoice === 'exit') {
            await ctx.editMessageText('Спасибо за игру! Нажми /play если захочешь сыграть снова.');
            return;
        }
        
        // Основная логика игры
        const coinFlip = Math.random() < 0.5 ? 'heads' : 'tails';
        const result = userChoice === coinFlip ? '🎉 Ты выиграл!' : '😢 Ты проиграл!';
        
        const playAgainKeyboard = new InlineKeyboard()
            .text('Еще раз', 'play_again')
            .text('Выйти', 'exit');
        
        await ctx.editMessageText(
            `🪙 Результат: ${coinFlip === 'heads' ? 'Орел' : 'Решка'}\n${result}`,
            { reply_markup: playAgainKeyboard }
        );
        
    } catch (error) {
        console.error('Ошибка обработки callback:', error);
        
        // Попытка отправить сообщение об ошибке пользователю
        try {
            await ctx.reply('Произошла ошибка. Попробуйте начать заново /play');
        } catch (e) {
            console.error('Не удалось отправить сообщение об ошибке:', e);
        }
    }
});

// Запуск бота
bot.start();
console.log('🪙 Бот "Орел и решка" запущен!');