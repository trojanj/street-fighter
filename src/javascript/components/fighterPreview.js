import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter) {
    const fighterImage = createFighterImage(fighter);
    const detailsContainer = createElement({tagName: 'div', className: 'fighter-preview___details'});
    detailsContainer.insertAdjacentHTML('beforeend', `
      <h4>${fighter.name}</h4>
      <i class="fas fa-heart"><span>${fighter.health}</span></i>
      <i class="fas fa-khanda"><span>${fighter.attack}</span></i>
      <i class="fas fa-shield-alt"><span>${fighter.defense}</span></i>
    `)

    fighterElement.append(fighterImage, detailsContainer);
  }

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
