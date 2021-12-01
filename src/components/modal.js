export function resetInput(popupType) {
  popupType.querySelector('.modal').reset();
}

export function offAutocomplete(popupType) {
  popupType.querySelector('.modal').autocomplete = 'off';
}
