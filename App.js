import React from 'react';
import WalletConnection from './WalletConnection'; // Убедитесь, что путь к файлу правильный

const App = () => {
  return (
    <div>
      <h1>Egg Clicker</h1>
      <WalletConnection />
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
        <div id="coinBalance">0</div>
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
      <div id="shopModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Магазин</h2>
          <div id="shopItems">
            <div className="shopItem" id="buyCommonEgg">
              <button className="common-egg-button" onClick={() => buyEgg('Common', 50)}>Купить обычное яйцо - 50 монет</button>
            </div>
            <div className="shopItem" id="buyUncommonEgg">
              <button className="uncommon-egg-button" onClick={() => buyEgg('Uncommon', 1)}>Купить необычное яйцо - 1000 монет</button>
            </div>
            <div className="shopItem" id="buyRareEgg">
              <button className="rare-egg-button" onClick={() => buyEgg('Rare', 1)}>Купить редкое яйцо - 10000 монет</button>
            </div>
            <div className="shopItem" id="buySpeedUpgrade">
              <button className="upgrade-speed-button" onClick={() => buyUpgrade('speed')}>Улучшение скорости (Цена: <span id="speedUpgradePrice">500</span> монет) <span id="speedUpgradeLevel">Lv 1</span></button>
            </div>
            <div className="shopItem" id="buyEnergyUpgrade">
              <button className="upgrade-energy-button" onClick={() => buyUpgrade('energy')}>Улучшение энергии (Цена: <span id="energyUpgradePrice">300</span> монет) <span id="energyUpgradeLevel">Lv 1</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
