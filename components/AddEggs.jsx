// src/components/AddEggs.jsx
import React, { useState } from 'react';
import { eggs } from '../data/eggsData';
import { getBackgroundColor } from '../utils/colorUtils';
import { useInventory } from '../hooks/useInventory';
import EggInfoModal from './EggInfoModal';
import '../styles/AddEggs.css';

const AddEggs = () => {
  const { inventoryItems, addEggToInventory, removeEggFromInventory } = useInventory();
  const [selectedEgg, setSelectedEgg] = useState(null);
  const [eggContainerId, setEggContainerId] = useState(null);

  const giveEggs = () => {
    const commonEggs = eggs.filter((egg) => egg.rarity === 'Common');
    if (commonEggs.length > 0) {
      const randomIndex = Math.floor(Math.random() * commonEggs.length);
      const selectedEgg = commonEggs[randomIndex];
      addEggToInventory(selectedEgg);
    } else {
      console.log('Нет яиц категории Common');
    }
  };

  const openEggInfoModal = (egg, id) => {
    setSelectedEgg(egg);
    setEggContainerId(id);
  };

  const closeEggInfoModal = () => {
    setSelectedEgg(null);
    setEggContainerId(null);
  };

  return (
    <div>
      <button onClick={giveEggs}>Give Eggs</button>
      <div id="inventoryItemsContainer">
        {Object.values(inventoryItems).map((item) => (
          <div
            key={item.id}
            className="eggContainer"
            style={{ backgroundColor: getBackgroundColor(item.rarity) }}
            onClick={() => openEggInfoModal(item, item.id)}
          >
            <img src={item.icon} alt={item.name} />
          </div>
        ))}
      </div>
      {selectedEgg && (
        <EggInfoModal
          eggData={selectedEgg}
          eggContainerId={eggContainerId}
          closeEggInfoModal={closeEggInfoModal}
          removeEggFromInventory={removeEggFromInventory}
        />
      )}
    </div>
  );
};

export default AddEggs;
