/*Открытие\закрытие попал окна*/
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscKeydown);
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscKeydown);
}

function resetInput(popupType) {
  popupType.querySelector('.modal').reset();
}

function offAutocomplete(popupType) {
  popupType.querySelector('.modal').autocomplete = 'off';
}

/*Закрытие попапа по Escape*/
const closePopupEscKeydown = (event) => {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export {openPopup, closePopup, resetInput, offAutocomplete}
