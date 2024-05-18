import React, { useState, useEffect } from 'react';

const Energy = () => {
  const [curEnergy, setCurEnergy] = useState(100);
  const [maxEnergy, setMaxEnergy] = useState(100);

  const decreaseEnergy = () => {
    setCurEnergy((prev) => Math.max(prev - 1, 0));
  };

  const updateEnergyBar = () => {
    const energyBar = document.getElementById('energyBar');
    if (energyBar) {
      energyBar.style.width = `${(curEnergy / maxEnergy) * 100}%`;
    }

    const energyText = document.getElementById('energyText');
    if (energyText) {
      energyText.textContent = `${curEnergy}/${maxEnergy}`;
    }

    if (curEnergy > 0) {
      enableClick();
    }
  };

  const restoreEnergy = () => {
    if (curEnergy < maxEnergy) {
      setCurEnergy((prev) => Math.min(prev + 1, maxEnergy));
    }
  };

  useEffect(() => {
    const interval = setInterval(restoreEnergy, 3000);
    return () => clearInterval(interval);
  }, [maxEnergy]);

  useEffect(() => {
    updateEnergyBar();
  }, [curEnergy, maxEnergy]);

  const disableClick = () => {
    const eggImage = document.getElementById('clickArea');
    if (eggImage) {
      eggImage.style.opacity = '0.5';
      eggImage.style.pointerEvents = 'none';
    }
  };

  const enableClick = () => {
    const eggImage = document.getElementById('clickArea');
    if (eggImage) {
      eggImage.style.opacity = '1';
      eggImage.style.pointerEvents = 'auto';
    }
  };

  return (
    <div id="energyContainer">
      <div id="energyContent">
        <img id="energyIcon" src="energy.png" alt="Energy Icon" />
        <span id="energyText">Text</span>
      </div>
      <div id="energyBarContainer">
        <div id="energyBar"></div>
      </div>
    </div>
  );
};

export default Energy;
