// src/utils/colorUtils.js
export const getBackgroundColor = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'lightgrey';
      case 'Uncommon':
        return 'lightblue';
      case 'Rare':
        return 'pink';
      default:
        return 'white';
    }
  };
  