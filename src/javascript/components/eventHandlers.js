import { controls } from '../../constants/controls';


const {PlayerOneAttack, PlayerOneBlock, PlayerTwoAttack, PlayerTwoBlock, PlayerOneCriticalHitCombination, PlayerTwoCriticalHitCombination} = controls;

export function keyDownHandler(firstFighter, secondFighter, resolve, event) {
  const key = event.code;
  let args;

  switch (key) {
    case PlayerOneAttack:  
      if (state.isFirstFighterBlockActivated) return;
      args = state.isSecondFighterBlockActivated ? [firstFighter, secondFighter] : [firstFighter];
      decreaseHealth(true, getDamage(...args));
      decreaseHealthIndicator(true);
      break;    
    case PlayerTwoAttack:  
      if (state.isSecondFighterBlockActivated) return;
      args = state.isFirstFighterBlockActivated ? [secondFighter, firstFighter] : [secondFighter];
      decreaseHealth(false, getDamage(...args));
      decreaseHealthIndicator(false);
      break;
    case PlayerOneBlock:
      state.isFirstFighterBlockActivated = true; 
      break;
    case PlayerTwoBlock:      
      state.isSecondFighterBlockActivated = true;
      break;
  }

  if (PlayerOneCriticalHitCombination.includes(key) && !state.firstFighterKeysArray.includes(key)) {
    state.firstFighterKeysArray.push(key)
  } else if (PlayerTwoCriticalHitCombination.includes(key) && !state.secondFighterKeysArray.includes(key)) {
    state.secondFighterKeysArray.push(key)
  }

  if (state.firstFighterKeysArray.length === 3 && state.timeFirstFighterCriticalHit + 10000 < Date.now()) {
    decreaseHealth(true, getCriticalHitPower(firstFighter));
    decreaseHealthIndicator(true);
    state.timeFirstFighterCriticalHit = Date.now();
  } else if (state.secondFighterKeysArray.length === 3 && state.timeSecondFighterCriticalHit + 10000 < Date.now()) {
    decreaseHealth(false, getCriticalHitPower(secondFighter));
    decreaseHealthIndicator(false);
    state.timeSecondFighterCriticalHit = Date.now();
  }

  if (state.firstFighterCurrentHealth < 0) {
    resolve(secondFighter)
  } else if (state.secondFighterCurrentHealth < 0) {
    resolve(firstFighter)
  }
}

export function keyUpHandler(event) {
  const key = event.code;

  switch (key) {
    case PlayerOneBlock:
      state.isFirstFighterBlockActivated = false;  
      break; 
    case PlayerTwoBlock:      
      state.isSecondFighterBlockActivated = false;
      break;
  }

  if (state.firstFighterKeysArray.includes(key)) {
    const pos = state.firstFighterKeysArray.indexOf(key);
    state.firstFighterKeysArray.splice(pos, 1);
  } else if (state.secondFighterKeysArray.includes(key)) {
    const pos = state.secondFighterKeysArray.indexOf(key);
    state.secondFighterKeysArray.splice(pos, 1);
  }
}