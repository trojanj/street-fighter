import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter) {
    const fighterImage = createFighterImage(fighter);
    const name = createElement({tagName: 'p'});
    const health = createElement({tagName: 'p'});
    const atack = createElement({tagName: 'p'});
    const defense = createElement({tagName: 'p'});
    name.innerText = `Name: ${fighter.name}`;
    health.innerText = `Health: ${fighter.health}`;
    atack.innerText = `Attack: ${fighter.attack}`;
    defense.innerText = `Defense: ${fighter.defense}`;

    fighterElement.append(fighterImage, name, health, atack, defense);
  }
  

  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
