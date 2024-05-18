// src/utils/findEggByName.js
import eggs from '../data/eggs';

export function findEggByName(eggName) {
  return eggs.find((egg) => egg.name === eggName);
}
