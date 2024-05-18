// Счетчик кликов
let clickCount = 0;
let coinBalance = 0;

// Функция для обработки клика
function handleClick() {
    clickCount++; // Увеличиваем счетчик кликов
    document.getElementById('counter').textContent = clickCount; // Обновляем отображение счетчика

    // Анимация на изображении при каждом клике
    gsap.fromTo('#clickImage', { scale: 1 }, { duration: 0.1, scale: 1.1, yoyo: true, repeat: 1 });
    
    // Проверяем, достигли ли мы 20 кликов для замены на egg2.png
    if (clickCount === 20) {
        replaceWithNewEgg('egg2.png'); // Заменяем на egg2.png
    }

    // Проверяем, достигли ли мы 100 кликов для замены на egg3.jpg
    if (clickCount === 100) {
        replaceWithNewEgg('egg3.jpg'); // Заменяем на egg3.jpg
    }
    // При каждом 10-ом клике увеличиваем баланс монет
    if (clickCount % 10 === 0) {
        coinBalance += 1; // Увеличиваем баланс монет
        updateCoinBalance(); // Обновляем отображение баланса монет
    }
}
// Функция для обновления отображения баланса монет
function updateCoinBalance() {
    document.getElementById('coinBalance').textContent = coinBalance; // Обновляем отображение баланса монет
}
// Функция для замены изображения
function replaceWithNewEgg(newImageSrc) {
    // Скрываем текущее изображение
    let clickImage = document.getElementById('clickImage');
    clickImage.style.display = 'none';

    // Заменяем src у изображения
    clickImage.src = newImageSrc;

    // Плавно показываем новое изображение
    gsap.to(clickImage, { duration: 1, opacity: 1, onComplete: function() {
        // По завершении показа нового изображения
        clickImage.style.display = 'inline';
    }});
}

// Назначаем обработчик события клика на изображение
document.getElementById('clickImage').addEventListener('click', handleClick);
