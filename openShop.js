let speedUpgradeLevel = 1;
let speedUpgradePrice = 5;
let energyUpgradeLevel = 1;
let energyUpgradePrice = 3;

function buyUpgrade(type) {
    const coinBalance = parseInt(document.getElementById('coinBalance').textContent);

    if (type === 'speed') {
        if (coinBalance >= speedUpgradePrice) {
            // Покупка улучшения скорости
            upgradeSpeed();
            updateCoinBalance(-speedUpgradePrice);
            speedUpgradeLevel++;
            speedUpgradePrice *= 2;
            updateShopDisplay();
        } else {
            showNotEnoughCoinsModal(speedUpgradePrice, coinBalance);
        }
    } else if (type === 'energy') {
        if (coinBalance >= energyUpgradePrice) {
            // Покупка улучшения энергии
            upgradeEnergy();
            updateCoinBalance(-energyUpgradePrice);
            energyUpgradeLevel++;
            energyUpgradePrice *= 2;
            updateShopDisplay();
        } else {
            showNotEnoughCoinsModal(energyUpgradePrice, coinBalance);
        }
    }
}

function updateShopDisplay() {
    // Обновление уровня и цены улучшения скорости
    document.getElementById('speedUpgradeLevel').textContent = `Lv ${speedUpgradeLevel}`;
    document.getElementById('speedUpgradePrice').textContent = speedUpgradePrice;

    // Обновление уровня и цены улучшения энергии
    document.getElementById('energyUpgradeLevel').textContent = `Lv ${energyUpgradeLevel}`;
    document.getElementById('energyUpgradePrice').textContent = energyUpgradePrice;
}

function upgradeSpeed() {
    // Увеличиваем значение одного клика на 1 за каждый уровень
    clickValue = speedUpgradeLevel;
}

function upgradeEnergy() {
    // Увеличиваем максимальную энергию на 10 за каждый уровень
    maxenerg += 10;
    updateEnergyBar(); // Обновляем отображение энергии после увеличения
}

// Начальное отображение уровней и цен
updateShopDisplay();











// Функция для открытия модального окна магазина
function openShopModal() {
    const shopModal = document.getElementById('shopModal');
    if (shopModal) {
        shopModal.style.display = 'block'; // Показать модальное окно
    }
}

// Функция для закрытия модального окна магазина
function closeShopModal() {
    const shopModal = document.getElementById('shopModal');
    if (shopModal) {
        shopModal.style.display = 'none'; // Скрыть модальное окно
    }
}

// Функция для покупки яйца
function buyEgg(rarity, price) {
    const coinBalance = parseInt(document.getElementById('coinBalance').textContent);
    if (coinBalance >= price) {
        const availableEggs = eggs.filter((egg) => egg.rarity === rarity);
        if (availableEggs.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableEggs.length);
            const selectedEgg = availableEggs[randomIndex];

            // Добавить выбранное яйцо в инвентарь
            addEggToInventory(selectedEgg);

            // Вычесть стоимость из баланса монет
            updateCoinBalance(-price);
        }
    } else {
        showNotEnoughCoinsModal(price, coinBalance);
    }
}
function showNotEnoughCoinsModal(price, coinBalance) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'block';
    modal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.textContent = '×';
    modalContent.appendChild(closeButton);

    const message = document.createElement('p');
    message.textContent = `Вам не хватает ${price - coinBalance} монет`;
    modalContent.appendChild(message);

    document.body.appendChild(modal);

    // Закрытие модального окна при клике на крестик
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Функция для обновления баланса монет
function updateCoinBalance(amount) {
    const coinBalanceElement = document.getElementById('coinBalance');
    if (coinBalanceElement) {
        let currentBalance = parseInt(coinBalanceElement.textContent);
        currentBalance += amount;
        coinBalanceElement.textContent = currentBalance;
    }
}

// Назначаем обработчик клика на иконку магазина
document.querySelector('.iconContainer img[src="shop_icon.png"]').parentElement.addEventListener('click', openShopModal);

// Назначаем обработчик клика на крестик для закрытия магазина
document.querySelector('#shopModal .close').addEventListener('click', closeShopModal);
