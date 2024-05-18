const TelegramBot = require('node-telegram-bot-api');

// Токен вашего телеграм бота
const botToken = '6756739246:AAHDPX6gnnUdwQiF3rkHs-t9NacF6qAiEy4';
const bot = new TelegramBot(botToken, { polling: true });

// Обработчик команды /start от пользователя
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Отправляем сообщение с приветствием и inline-клавиатурой
    const welcomeMessage = 'Добро пожаловать в TON EGGS DIGGER!\n' +
                           'Выберите действие:';
    const keyboardOptions = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Запуск', callback_data: 'launch_app' },
                    { text: 'Отправить в ТГ-канал', callback_data: 'send_to_channel' }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, `${welcomeMessage}`, keyboardOptions);
});

// Обработчик нажатий на inline-кнопки
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const action = callbackQuery.data;

    // Обрабатываем действие в зависимости от нажатой кнопки
    if (action === 'launch_app') {
        const appLink = 'https://your-web-app-url.com'; // Замените на ссылку на ваше веб-приложение
        bot.answerCallbackQuery(callbackQuery.id, { url: appLink });
    } else if (action === 'send_to_channel') {
        const channelLink = 'https://t.me/NotFrensOfficial'; // Замените на ссылку на ваш ТГ-канал
        bot.sendMessage(chatId, `Переход в Телеграм-канал: ${channelLink}`);
    }
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
    console.error('Telegram polling error:', error);
});
