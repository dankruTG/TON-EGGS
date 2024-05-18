// src/components/EggInfoModal.jsx
import React from 'react';
import { getBackgroundColor } from '../utils/colorUtils';
import '../styles/EggInfoModal.css';

const EggInfoModal = ({ eggData, eggContainerId, closeEggInfoModal, removeEggFromInventory }) => {
  if (!eggData) return null;

  const startDiggEggByName = (eggName, eggContainerId) => {
    // Ваша логика для начала добычи яйца по имени и id
    closeEggInfoModal();
    removeEggFromInventory(eggContainerId);
    console.log(`Starting digg for egg: ${eggName}`);
  };

  return (
    <div id="eggInfoModal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content" style={{ backgroundColor: getBackgroundColor(eggData.rarity) }}>
        <span className="close" onClick={closeEggInfoModal}>&times;</span>
        <h2>{eggData.name}</h2>
        <div>ID в инвентаре: {eggContainerId}</div>
        <img src={eggData.icon} alt={eggData.name} style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }} />
        <button className="startDiggButton" onClick={() => startDiggEggByName(eggData.name, eggContainerId)}>
          Start Digg
          <img src="startdigg.png" alt="Start Digg" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
        </button>
        <div>Редкость: {eggData.rarity}</div>
        <div>Количество кликов для открытия: {eggData.strength}</div>
        <div>Можно ли преобразовать в NFT: {eggData.minting}</div>
      </div>
    </div>
  );
};

export default EggInfoModal;
