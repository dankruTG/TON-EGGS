// src/hooks/useCoins.js
import { useState } from 'react';

export const useCoins = () => {
  const [coins, setCoins] = useState(0);

  return {
    coins,
    setCoins,
  };
};
