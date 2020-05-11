import { controls } from '../../constants/controls';
import { keyDownHandler, keyUpHandler } from './eventHandlers';

export const state = {
  firstFighter: {},
  secondFighter: {},
  firstFighterCurrentHealth: null,
  secondFighterCurrentHealth: null,
  initialWidthHealthIndicator: null,
  isFirstFighterBlockActivated: false,
  isSecondFighterBlockActivated: false,
  timeFirstFighterCriticalHit: null,
  timeSecondFighterCriticalHit: null,
  firstFighterKeysArray: [],
  secondFighterKeysArray: []
} 

export async function fight(firstFighter, secondFighter) {
  setInitialState(firstFighter, secondFighter);

  return new Promise((resolve) => {
    document.addEventListener('keydown', keyDownHandler.bind(null, firstFighter, secondFighter, resolve));
    document.addEventListener('keyup', keyUpHandler);
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

export function decreaseHealth(isFirstFighterAttack, damage) { 
  const currentHealth = isFirstFighterAttack ? 'secondFighterCurrentHealth' : 'firstFighterCurrentHealth'
  state[currentHealth] -= damage;
}

export function decreaseHealthIndicator(isFirstFighterAttack) {
  const defender = isFirstFighterAttack ? state.secondFighter : state.firstFighter;
  const currentHealth = isFirstFighterAttack ? state.secondFighterCurrentHealth : state.firstFighterCurrentHealth;
  const position = isFirstFighterAttack ? 'right' : 'left';

  const healthIndicator = document.getElementById(`${position}-fighter-indicator`);

  const newWidth = state.initialWidthHealthIndicator * currentHealth / defender.health;
  healthIndicator.style.width = newWidth > 0 ? newWidth + 'px' : 0;  
}

function setInitialState(firstFighter, secondFighter) {
  state.firstFighter = firstFighter;
  state.secondFighter = secondFighter;
  state.firstFighterCurrentHealth = firstFighter.health;
  state.secondFighterCurrentHealth = secondFighter.health;

  const healthIndicator = document.getElementById(`left-fighter-indicator`);
  state.initialWidthHealthIndicator = healthIndicator.clientWidth;  
}





