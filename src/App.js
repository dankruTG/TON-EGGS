// src/App.js
import React, {useState} from 'react';
import WalletConnection from '../components/WalletConnection';
import InventoryModal from '../components/InventoryModal';
import Energy from './components/Energy';
import { eggs } from './data/eggsData';
import ShopModal from './components/ShopModal';
import AddEggs from './components/AddEggs';
import Clicker from './components/Clicker';
import { useCoins } from './hooks/useCoins';

function App() {
  const [coins, setCoins] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);

  const updateCoinBalance = (amount) => {
    setCoins((prev) => prev + amount);
  };

  const addEggToInventory = (egg) => {
    setInventoryItems((prev) => [...prev, egg]);
  };
  return (
    <div className='App'>
      <WalletConnection />
      <h1>Egg Clicker</h1>
      <InventoryModal />
      <ShopModal
        coins={coins}
        updateCoinBalance={updateCoinBalance}
        addEggToInventory={addEggToInventory}
      />
      <Energy />
      <Inventory />
      <AddEggs />
      <Clicker setCoins={setCoins} />
      <div id="coinBalanceContainer">
        <div id="coinBalance">{coins}</div>
        <img id="coinImage" src="coin.png" alt="Coin Image" />
      </div>
      <div id="notificationModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <div id="modalMessage"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
