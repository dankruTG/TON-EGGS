let eggAddedForDigg = false; // Флаг для отслеживания добавления яйца для добычи
let diggEggData = null; // Данные текущего яйца для добычи

function startDiggEggByName(eggName, eggContainerId) {
    const eggData = eggs.find((egg) => egg.name === eggName);

    // Проверяем, есть ли уже активное яйцо для клика
    if (eggAddedForDigg) {
        // Показываем модальное окно, что уже идет добыча другого яйца
        showModal('Вы уже DIGG другое EGG. Завершите его сначала!');
        return;
    }

    if (eggData) {
        // Удаляем новое яйцо из инвентаря
        removeEggFromInventory(eggContainerId);

        // Начинаем добычу нового яйца
        startDiggEgg(eggData);
        diggEggData = eggData;
        eggAddedForDigg = true;
    } else {
        console.log('Яйцо не найдено в инвентаре');
    }
}
function removeEggFromInventory(eggContainerId) {
    const inventoryContainer = document.getElementById('inventoryItemsContainer');
    if (inventoryContainer) {
        const eggContainer = document.getElementById(eggContainerId);
        if (eggContainer) {
            eggContainer.remove(); // Удаление контейнера из инвентаря
        }
    }
}

function showModal(message) {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.textContent = message;
            modal.style.display = 'block';
        }
    }
}

// Функция начала добычи яйца
function startDiggEgg(eggData) {
    // Удаление предыдущей зоны для клика, если она была добавлена
    const previousClickArea = document.getElementById('clickArea');
    if (previousClickArea) {
        previousClickArea.remove();
    }

    if (!eggAddedForDigg) {
        createClickArea(eggData); // Создание области для клика (добычи) яйца
        eggAddedForDigg = true; // Устанавливаем флаг, что яйцо добавлено для добычи
    } else {
        console.log('Яйцо уже добавлено для добычи');
    }
}

// Функция создания области для клика (добычи) яйца
function createClickArea(eggData) {
    const clickArea = document.createElement('div');
    clickArea.id = 'clickArea';
    clickArea.style.width = '200px';
    clickArea.style.height = '200px';
    clickArea.style.backgroundColor = 'transparent';
    clickArea.style.position = 'relative';

    const eggImage = document.createElement('img');
    eggImage.src = eggData.icon;
    eggImage.style.width = '100%';
    eggImage.style.height = '100%';
    eggImage.style.objectFit = 'contain';
    clickArea.appendChild(eggImage);

    let clickCount = eggData.strength; // Начальное количество кликов для открытия

    clickArea.addEventListener('click', () => {
        if (clickCount > 0) {
            clickCount--;
            updateClickCounter(clickCount);
            decreaseEnergy(); // Уменьшение энергии при клике

            if (clickCount === 0) {
                finishDiggEgg(eggData); // Завершение добычи яйца
            }
        }
    });

    document.body.appendChild(clickArea);
    updateClickCounter(clickCount);
}

// Функция завершения добычи яйца
function finishDiggEgg() {
    const coinsDropped = getCoinsDropped(diggEggData.rarity);
    dropCoin(coinsDropped); // Падение монет после добычи яйца

    // Отображение модального окна с результатом добычи
    showModal(`Вы добыли ${coinsDropped} монет из ${diggEggData.name}!`);
    
    // Сбрасываем состояние добычи яйца
    resetDiggState();
}
function resetDiggState() {
    eggAddedForDigg = false;
    diggEggData = null;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Пример вызова начала добычи при загрузке страницы
    const initialEggName = 'EggName'; // Здесь 'EggName' должно быть заменено на имя выбранного яйца
    const eggData = findEggByName(initialEggName);
    if (eggData) {
        startDiggEgg(eggData); // Начало добычи выбранного яйца при загрузке
    }
});
