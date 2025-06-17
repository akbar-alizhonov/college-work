const { Bot } = require('grammy');

const bot = new Bot('7198900652:AAGhb8FB5rXzq8Q78Lqp5mfojG5d9pEvEr0'); // Замените на ваш токен

// Хранилище загаданных чисел для каждого пользователя
const games = {};

// Команда /play - начало игры
bot.command('play', (ctx) => {
    const userId = ctx.from.id;
    games[userId] = Math.floor(Math.random() * 100) + 1; // Загадываем число от 1 до 100
    ctx.reply('🎮 Я загадал число от 1 до 100! Попробуй угадать!');
});

// Обработка всех текстовых сообщений
bot.on('message:text', (ctx) => {
    const userId = ctx.from.id;
    const message = ctx.message.text;
    
    // Если пользователь не начал игру
    if (!games[userId]) {
        ctx.reply('Начни игру командой /play!');
        return;
    }

    // Проверяем, является ли сообщение числом
    const guess = parseInt(message);
    if (isNaN(guess)) {
        ctx.reply('Пожалуйста, введи число!');
        return;
    }

    // Сравниваем с загаданным числом
    const secretNumber = games[userId];
    if (guess < secretNumber) {
        ctx.reply('⬆️ Больше!');
    } else if (guess > secretNumber) {
        ctx.reply('⬇️ Меньше!');
    } else {
        ctx.reply('🎉 Ты угадал! Молодец!');
        delete games[userId]; // Удаляем игру после угадывания
    }
});

bot.start();
console.log('Бот "Угадай число" запущен!');