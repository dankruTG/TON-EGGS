import React, { useState } from 'react';
import { eggs } from '../data/eggsData';

const ShopModal = ({ coins, updateCoinBalance, addEggToInventory }) => {
  const [speedUpgradeLevel, setSpeedUpgradeLevel] = useState(1);
  const [speedUpgradePrice, setSpeedUpgradePrice] = useState(5);
  const [energyUpgradeLevel, setEnergyUpgradeLevel] = useState(1);
  const [energyUpgradePrice, setEnergyUpgradePrice] = useState(3);

  const buyEgg = (rarity, price) => {
    if (coins >= price) {
      const availableEggs = eggs.filter((egg) => egg.rarity === rarity);
      if (availableEggs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableEggs.length);
        const selectedEgg = availableEggs[randomIndex];
        addEggToInventory(selectedEgg);
        updateCoinBalance(-price);
      }
    } else {
      alert(`Вам не хватает ${price - coins} монет`);
    }
  };

  const buyUpgrade = (type) => {
    if (type === 'speed') {
      if (coins >= speedUpgradePrice) {
        updateCoinBalance(-speedUpgradePrice);
        setSpeedUpgradeLevel(speedUpgradeLevel + 1);
        setSpeedUpgradePrice(speedUpgradePrice * 2);
      } else {
        alert(`Вам не хватает ${speedUpgradePrice - coins} монет`);
      }
    } else if (type === 'energy') {
      if (coins >= energyUpgradePrice) {
        updateCoinBalance(-energyUpgradePrice);
        setEnergyUpgradeLevel(energyUpgradeLevel + 1);
        setEnergyUpgradePrice(energyUpgradePrice * 2);
      } else {
        alert(`Вам не хватает ${energyUpgradePrice - coins} монет`);
      }
    }
  };

  return (
    <div id="shopModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeShopModal}>&times;</span>
        <h2>Магазин</h2>
        <div id="shopItems">
          <div className="shopItem" id="buyCommonEgg">
            <button className="common-egg-button" onClick={() => buyEgg('Common', 50)}>Купить обычное яйцо - 50 монет</button>
          </div>
          <div className="shopItem" id="buyUncommonEgg">
            <button className="uncommon-egg-button" onClick={() => buyEgg('Uncommon', 1000)}>Купить необычное яйцо - 1000 монет</button>
          </div>
          <div className="shopItem" id="buyRareEgg">
            <button className="rare-egg-button" onClick={() => buyEgg('Rare', 10000)}>Купить редкое яйцо - 10000 монет</button>
          </div>
          <div className="shopItem" id="buySpeedUpgrade">
            <button className="upgrade-speed-button" onClick={() => buyUpgrade('speed')}>Улучшение скорости (Цена: {speedUpgradePrice} монет) Lv {speedUpgradeLevel}</button>
          </div>
          <div className="shopItem" id="buyEnergyUpgrade">
            <button className="upgrade-energy-button" onClick={() => buyUpgrade('energy')}>Улучшение энергии (Цена: {energyUpgradePrice} монет) Lv {energyUpgradeLevel}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
