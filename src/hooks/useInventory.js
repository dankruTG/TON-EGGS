// src/hooks/useInventory.js
import { useState } from 'react';

export const useInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  const addEggToInventory = (egg) => {
    setInventoryItems((prev) => [...prev, { ...egg, id: Date.now() }]);
  };

  const removeEggFromInventory = (id) => {
    setInventoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { inventoryItems, addEggToInventory, removeEggFromInventory };
};
