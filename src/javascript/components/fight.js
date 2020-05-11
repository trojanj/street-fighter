import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    
  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender); 
  return damage > 0 ? damage : 0
}

export function getHitPower(fighter) {
  const hitPower = fighter.attack * (Math.random() + 1);
  return hitPower
}

export function getBlockPower(fighter) {
  if (!fighter) return 0
  const blockPower = fighter.defense * (Math.random() + 1);
  return blockPower
}

export function getCriticalHitPower(fighter) {
  const criticalHitPower = fighter.attack * 2
  return criticalHitPower
}





