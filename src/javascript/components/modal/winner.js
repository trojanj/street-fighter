import { showModal } from './modal';

export function showWinnerModal(fighter) {
  showModal({
    title: `${fighter.name} won!!!`,
    bodyElement: ''
  })
}
