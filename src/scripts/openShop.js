// src/scripts/openShop.js
export function buyEgg(rarity, price, { coins, updateCoinBalance, addEggToInventory }) {
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
  }
  
  export function buyUpgrade(type, {
    coins, updateCoinBalance,
    speedUpgradeLevel, setSpeedUpgradeLevel,
    speedUpgradePrice, setSpeedUpgradePrice,
    energyUpgradeLevel, setEnergyUpgradeLevel,
    energyUpgradePrice, setEnergyUpgradePrice
  }) {
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
  }
  