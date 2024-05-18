import { useState, useEffect } from 'react';

const useEnergy = (initialEnergy, maxEnergy) => {
  const [curEnergy, setCurEnergy] = useState(initialEnergy);
  const [maxEnerg, setMaxEnerg] = useState(maxEnergy);

  const decreaseEnergy = () => {
    setCurEnergy((prev) => Math.max(prev - 1, 0));
  };

  const restoreEnergy = () => {
    setCurEnergy((prev) => Math.min(prev + 1, maxEnerg));
  };

  useEffect(() => {
    const interval = setInterval(restoreEnergy, 3000);
    return () => clearInterval(interval);
  }, [maxEnerg]);

  return {
    curEnergy,
    maxEnerg,
    decreaseEnergy,
    setMaxEnerg,
  };
};

export default useEnergy;
