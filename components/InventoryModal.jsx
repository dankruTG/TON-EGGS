// src/components/InventoryModal.jsx
import React from 'react';
import useModal from '../hooks/useModal';
import '../styles/InventoryModal.css'; // Подключаем стили

const InventoryModal = () => {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <>
      <button onClick={openModal}>Открыть инвентарь</button>
      {isOpen && (
        <div id="inventoryModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Инвентарь</h2>
            <div id="inventoryItemsContainer"></div> {/* Контейнер для яиц в инвентаре */}
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryModal;
