let clickCount = 0;
let curenerg = 20; // Начальная энергия
const maxenerg = 100; // Максимальная энергия

function handleClickEgg() {
    clickCount++;
    updateClickCounter();
    animateEggClick();
    decreaseEnergy();

    if (clickCount >= 10) {
        breakEgg(); // Вызываем функцию разрушения яйца
    }
}
function breakEgg() {
    const eggContainer = document.getElementById('eggContainer');
    if (eggContainer) {
        // Создаем новый элемент для анимации разрушения
        const boomAnimation = document.createElement('img');
        boomAnimation.src = 'brkanim2.gif';
        boomAnimation.style.width = '400px'; // Устанавливаем ширину анимации
        boomAnimation.style.height = '400px'; // Устанавливаем высоту анимации
        boomAnimation.style.position = 'absolute';
        boomAnimation.style.top = '50%'; // Располагаем по вертикали в середине
        boomAnimation.style.left = '50%'; // Располагаем по горизонтали в середине
        boomAnimation.style.transform = 'translate(-50%, -50%)'; // Центрируем точку позиционирования

        // Добавляем анимацию разрушения в контейнер с изображением яйца
        eggContainer.appendChild(boomAnimation);

        // Добавляем обработчик события для удаления анимации после завершения
        boomAnimation.addEventListener('animationend', () => {
            boomAnimation.remove(); // Удаляем анимацию после завершения
        });

        // Добавляем небольшую задержку перед вызовом функции openEgg()
        setTimeout(() => {
            boomAnimation.remove(); // Удаляем анимацию перед вызовом openEgg()
            openEgg(); // Вызываем функцию openEgg() после задержки
        }, 1700); // Указываем задержку в миллисекундах (здесь 2000 мс = 2 секунды)
    }
}

function updateClickCounter() {
    const clickCounterElement = document.getElementById('counter');
    if (clickCounterElement) {
        clickCounterElement.textContent = clickCount;
    }
}

function animateEggClick() {
    const eggImage = document.getElementById('eggImage');
    if (eggImage) {
        eggImage.style.transform = 'scale(1.1)';
        setTimeout(() => {
            eggImage.style.transform = 'scale(1)';
        }, 100);
    }
}

function openEgg() {
    const coinsDropped = getRandomInt(10, 100);
    const coinBalanceElement = document.getElementById('coinBalance');
    const droppedCoinsCount = document.getElementById('droppedCoinsCount');
    clickCount = 0;
    updateClickCounter();

    if (coinBalanceElement) {
        const currentBalance = parseInt(coinBalanceElement.textContent);
        const newBalance = currentBalance + coinsDropped;
        coinBalanceElement.textContent = newBalance;
    }
    if (droppedCoinsCount) {
        droppedCoinsCount.textContent = `+${coinsDropped}`;

        // Отображение модального окна
        const modal = document.getElementById('coinModal');
        modal.style.display = 'block';

        // Закрытие модального окна при щелчке на крестик
        const closeButton = document.querySelector('.close');
        if (closeButton) {
            closeButton.onclick = function () {
                modal.style.display = 'none';
            };
        }

        // Закрытие модального окна при щелчке вне модального окна
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

function updateCoinBalance(coins) {
    const coinBalanceElement = document.getElementById('coinBalance');
    if (coinBalanceElement) {
        coinBalanceElement.textContent = parseInt(coinBalanceElement.textContent) + coins;
    }
}


function updateEnergyBar() {
    const energyBar = document.getElementById('energyBar');
    if (energyBar) {
        energyBar.style.width = `${(curenerg / maxenerg) * 100}%`;
    }
    
    const energyText = document.getElementById('energyText');
    if (energyText) {
        energyText.textContent = `${curenerg}/${maxenerg}`;
    }

    if (curenerg > 0) {
        enableClick(); // Если энергия иссякла, блокируем возможность кликать
    }
}

function disableClick() {
    const eggImage = document.getElementById('eggImage');
    if (eggImage) {
        eggImage.style.opacity = '0.5'; // Уменьшаем прозрачность, чтобы показать, что яйцо заблокировано
        eggImage.style.pointerEvents = 'none'; // Отключаем события на изображении
    }
}

function enableClick() {
    const eggImage = document.getElementById('eggImage');
    if (eggImage) {
        eggImage.style.opacity = '1'; // Восстанавливаем прозрачность
        eggImage.style.pointerEvents = 'auto'; // Включаем события на изображении
    }
}

function restoreEnergy() {
    if (curenerg < maxenerg) {
        curenerg++; // Увеличиваем текущую энергию
        updateEnergyBar();
    }
}

// Восстановление энергии каждые 5 секунд
setInterval(restoreEnergy, 3000);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateEnergyBar(); // Обновляем состояние энергии при загрузке страницы
});
