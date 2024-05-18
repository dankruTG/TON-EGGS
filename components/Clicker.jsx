// src/components/Clicker.jsx
import React, { useState, useEffect } from 'react';
import { useInventory } from '../hooks/useInventory';
import { eggs, findEggByName } from '../data/eggsData';
import { getBackgroundColor } from '../utils/colorUtils';
import { useEnergy } from '../hooks/useEnergy';
import '../styles/Clicker.css';

const Clicker = ({ setCoins }) => {
  const [eggAddedForDigg, setEggAddedForDigg] = useState(false);
  const [diggEggData, setDiggEggData] = useState(null);
  const { inventoryItems, removeEggFromInventory } = useInventory();
  const { decreaseEnergy } = useEnergy();

  const startDiggEggByName = (eggName, eggContainerId) => {
    const eggData = findEggByName(eggName);

    if (eggAddedForDigg) {
      showModal('Вы уже DIGG другое EGG. Завершите его сначала!');
      return;
    }

    if (eggData) {
      removeEggFromInventory(eggContainerId);
      startDiggEgg(eggData);
      setDiggEggData(eggData);
      setEggAddedForDigg(true);
      changeBackgroundByRarity(eggData.rarity);
    } else {
      console.log('Яйцо не найдено в инвентаре');
    }
  };

  const startDiggEgg = (eggData) => {
    createClickArea(eggData);
  };

  const createClickArea = (eggData) => {
    const clickArea = document.createElement('div');
    clickArea.id = 'clickArea';
    clickArea.className = 'click-area';

    const eggImage = document.createElement('img');
    eggImage.src = eggData.icon;
    eggImage.style.width = '100%';
    eggImage.style.height = '100%';
    eggImage.style.objectFit = 'contain';
    clickArea.appendChild(eggImage);

    let clickCount = eggData.strength;

    clickArea.addEventListener('click', () => {
      if (clickCount > 0) {
        clickCount -= 1;
        updateClickCounter(clickCount);
        decreaseEnergy();

        eggImage.style.transform = 'scale(1.1)';
        eggImage.style.transition = 'transform 0.3s ease';

        const damageElement = document.createElement('span');
        damageElement.textContent = `-1`;
        damageElement.className = 'damage-element';
        clickArea.appendChild(damageElement);

        damageElement.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-20px)' }], {
          duration: 1000,
          easing: 'ease',
          fill: 'forwards',
        });

        setTimeout(() => {
          damageElement.remove();
        }, 1000);

        if (clickCount <= 0) {
          finishDiggEgg(eggData);
        }

        setTimeout(() => {
          eggImage.style.transform = 'scale(1)';
        }, 100);
      }
    });

    document.body.appendChild(clickArea);
    updateClickCounter(clickCount);
  };

  const updateClickCounter = (clickCount) => {
    const clickCounterElement = document.getElementById('clickCounter');
    if (clickCounterElement) {
      clickCounterElement.textContent = `${clickCount}`;
    }
  };

  const finishDiggEgg = (eggData) => {
    setEggAddedForDigg(false);
    setDiggEggData(null);
    let coinsDropped = 0;
    let eggDropped = null;

    switch (eggData.rarity) {
      case 'Common':
        coinsDropped = getRandomInt(10, 100);
        eggDropped = getRandomEggByRarity('Common');
        break;
      case 'Uncommon':
        coinsDropped = getRandomInt(150, 1500);
        eggDropped = getRandomEggByRarity('Uncommon');
        break;
      case 'Rare':
        coinsDropped = getRandomInt(750, 7500);
        eggDropped = getRandomEggByRarity('Rare');
        break;
      default:
        coinsDropped = 0;
        break;
    }

    setCoins((prev) => prev + coinsDropped);

    const previousClickArea = document.getElementById('clickArea');
    if (previousClickArea) {
      previousClickArea.remove();
    }

    showModal(`+${coinsDropped} coins!`);
    addEggToInventory(eggDropped);
    updateClickCounter('Начни добывать любое яйцо');
    changeBackgroundByRarity(eggData.rarity);
  };

  const getRandomEggByRarity = (rarity) => {
    const rarityChances = {
      Common: { Common: 0.93, Uncommon: 0.06, Rare: 0.01 },
      Uncommon: { Common: 0.52, Uncommon: 0.41, Rare: 0.08 },
      Rare: { Common: 0.29, Uncommon: 0.51, Rare: 0.20 },
    };

    const chances = rarityChances[rarity];
    let randomValue = Math.random();
    let selectedRarity = null;

    for (const rarityType in chances) {
      if (randomValue < chances[rarityType]) {
        selectedRarity = rarityType;
        break;
      }
      randomValue -= chances[rarityType];
    }

    const filteredEggs = eggs.filter((egg) => egg.rarity === selectedRarity);
    const randomIndex = Math.floor(Math.random() * filteredEggs.length);
    return filteredEggs[randomIndex];
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const showModal = (message) => {
    const modal = document.getElementById('notificationModal');
    const modalMessage = document.getElementById('modalMessage');

    if (modal && modalMessage) {
      modalMessage.textContent = message;
      modal.style.display = 'block';
    }

    modal.onclick = function (event) {
      if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
      }
    };
  };

  const changeBackgroundByRarity = (rarity) => {
    const bodyElement = document.body;

    if (!eggAddedForDigg) {
      bodyElement.style.backgroundImage = `url('Backgrounds/DefBackground.png')`;
    } else {
      let backgroundImagePath;
      switch (rarity) {
        case 'Common':
          backgroundImagePath = 'Backgrounds/CommonBackground.png';
          break;
        case 'Uncommon':
          backgroundImagePath = 'Backgrounds/UncommonBackground.png';
          break;
        case 'Rare':
          backgroundImagePath = 'Backgrounds/RareBackground.png';
          break;
        default:
          backgroundImagePath = 'Backgrounds/DefBackground.png';
          break;
      }
      bodyElement.style.backgroundImage = `url('${backgroundImagePath}')`;
    }
  };

  useEffect(() => {
    const initialEggName = 'EggName'; // Здесь 'EggName' должно быть заменено на имя выбранного яйца
    const eggData = findEggByName(initialEggName);
    if (eggData) {
      startDiggEgg(eggData);
    }
  }, []);

  return null;
};

export default Clicker;
