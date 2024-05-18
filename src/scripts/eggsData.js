const eggs = [
    { name: "Rubin Egg", icon: "rareEggs/RubinEgg.png", rarity: "Rare", strength: 10, minting: "no" },
    { name: "Golden Egg", icon: "uncommonEggs/goldenEgg.png", rarity: "Uncommon", strength: 10, minting: "no" },
    { name: "Silver Egg", icon: "uncommonEggs/silverEgg.png", rarity: "Uncommon", strength: 10, minting: "no" },
    { name: "Bronze Egg", icon: "commonEggs/bronzeEgg.png", rarity: "Common", strength: 10, minting: "no" }
    // Добавьте сколько угодно объектов с данными о яйцах
];
function findEggByName(eggName) {
    return eggs.find((egg) => egg.name === eggName);
}