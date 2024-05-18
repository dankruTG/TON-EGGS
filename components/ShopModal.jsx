// src/components/ShopModal.jsx
import React, { useState } from 'react';
import { buyEgg, buyUpgrade } from '../scripts/openShop';

const ShopModal = ({ coins, updateCoinBalance, addEggToInventory }) => {
  const [speedUpgradeLevel, setSpeedUpgradeLevel] = useState(1);
  const [speedUpgradePrice, setSpeedUpgradePrice] = useState(5);
  const [energyUpgradeLevel, setEnergyUpgradeLevel] = useState(1);
  const [energyUpgradePrice, setEnergyUpgradePrice] = useState(3);

  const handleBuyUpgrade = (type) => {
    buyUpgrade(type, {
      coins,
      updateCoinBalance,
      speedUpgradeLevel,
      setSpeedUpgradeLevel,
      speedUpgradePrice,
      setSpeedUpgradePrice,
      energyUpgradeLevel,
      setEnergyUpgradeLevel,
      energyUpgradePrice,
      setEnergyUpgradePrice
    });
  };

  const handleBuyEgg = (rarity, price) => {
    buyEgg(rarity, price, { coins, updateCoinBalance, addEggToInventory });
  };

  return (
    <div id="shopModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => document.getElementById('shopModal').style.display = 'none'}>&times;</span>
        <h2>Магазин</h2>
        <div id="shopItems">
          <div className="shopItem" id="buyCommonEgg">
            <button className="common-egg-button" onClick={() => handleBuyEgg('Common', 50)}>Купить обычное яйцо - 50 монет</button>
          </div>
          <div className="shopItem" id="buyUncommonEgg">
            <button className="uncommon-egg-button" onClick={() => handleBuyEgg('Uncommon', 1000)}>Купить необычное яйцо - 1000 монет</button>
          </div>
          <div className="shopItem" id="buyRareEgg">
            <button className="rare-egg-button" onClick={() => handleBuyEgg('Rare', 10000)}>Купить редкое яйцо - 10000 монет</button>
          </div>
          <div className="shopItem" id="buySpeedUpgrade">
            <button className="upgrade-speed-button" onClick={() => handleBuyUpgrade('speed')}>Улучшение скорости (Цена: <span id="speedUpgradePrice">{speedUpgradePrice}</span> монет) <span id="speedUpgradeLevel">Lv {speedUpgradeLevel}</span></button>
          </div>
          <div className="shopItem" id="buyEnergyUpgrade">
            <button className="upgrade-energy-button" onClick={() => handleBuyUpgrade('energy')}>Улучшение энергии (Цена: <span id="energyUpgradePrice">{energyUpgradePrice}</span> монет) <span id="energyUpgradeLevel">Lv {energyUpgradeLevel}</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
