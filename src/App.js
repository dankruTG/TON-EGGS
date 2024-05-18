// src/App.js
import React, { useState } from 'react';
import WalletConnection from './components/WalletConnection';
import ShopModal from './components/ShopModal';
import { addEggToInventory } from './scripts/addEggs';
import { updateCoinBalance } from './scripts/openShop';


function App() {
  const [coins, setCoins] = useState(0);
  const handleUpdateCoinBalance = (amount) => {
    setCoins(coins + amount);
  };
  const handleAddEggToInventory = (egg) => {
    addEggToInventory(egg);
  };
  return (
    <div className="App">
      <WalletConnection />
      <h1>Egg Clicker</h1>
      <div id="eggDiggModal" className="modal">
        <div className="modal-content"></div>
      </div>
      <div id="energyContainer">
        <div id="energyContent">
          <img id="energyIcon" src="energy.png" alt="Energy Icon" />
          <span id="energyText">Text</span>
        </div>
        <div id="energyBarContainer">
          <div id="energyBar"></div>
        </div>
      </div>
      <div id="coinModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Ваш дроп</h2>
          <div id="coinInfo">
            <img id="coinImage" src="coin.png" alt="Монета eShells" />
            <span id="droppedCoinsCount"></span>
          </div>
          <div id="dropEggInfo">
            <img id="eggImageInDrop" src="egg.png" alt="Выпавшее яйцо" />
            <span id="eggNameInDrop"></span>
          </div>
        </div>
      </div>
      <div id="clickCounter">Начни добывать любое яйцо</div>
      <div id="coinBalanceContainer">
        <div id="coinBalance">{coins}</div>
        <img id="coinImage" src="coin.png" alt="Coin Image" />
      </div>
      <div id="bottomIconsContainer">
        <div className="iconContainer" onClick={openInventory}>
          <img src="inventory_icon.png" alt="Inventory Icon" />
        </div>
        <div className="iconContainer" onClick={openShopModal}>
          <img src="shop_icon.png" alt="Shop Icon" />
        </div>
        <div className="iconContainer" onClick={giveEggs}>
          <img src="rewards_icon.png" alt="Rewards Icon" />
        </div>
        <div className="iconContainer" onClick={openInvite}>
          <img src="invite_icon.png" alt="Invite Icon" />
        </div>
      </div>
      <div id="notificationModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <div id="modalMessage"></div>
        </div>
      </div>
      <div id="inventoryModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Инвентарь</h2>
          <div id="inventoryItemsContainer"></div>
        </div>
      </div>
      <div id="eggInfoModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Description</h2>
        </div>
      </div>
      <ShopModal
        coins={coins}
        updateCoinBalance={handleUpdateCoinBalance}
        addEggToInventory={handleAddEggToInventory}
      />
    </div>
  );
}

export default App;
