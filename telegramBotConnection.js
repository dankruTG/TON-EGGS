const TelegramBot = require('node-telegram-bot-api');
const { Client } = require('pg');

// Параметры подключения к базе данных PostgreSQL
const dbClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users_db',
    password: '1q2w3e4r5t4r3e2w1q',
    port: 5432,
});

// Подключение к базе данных
dbClient.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database', err));

// Токен вашего телеграм бота
const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(botToken, { polling: true });

// Обработчик команды /start от пользователя
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id; // ID чата пользователя (уникальный идентификатор)
    const username = msg.chat.username; // Имя пользователя в Telegram

    // Добавление нового пользователя в базу данных
    try {
        await dbClient.query('INSERT INTO users (telegram_id, username, coins, wallet_address, inventory_id) VALUES ($1, $2, $3, $4, $5)', [chatId, username, 0, '', []]);
        console.log(`User ${username} (${chatId}) added to database`);
        bot.sendMessage(chatId, 'Добро пожаловать! Вы успешно вошли в приложение.');
    } catch (err) {
        console.error('Error adding user to database:', err);
        bot.sendMessage(chatId, 'Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.');
    }
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
    console.error('Telegram polling error:', error);
});
