/*Открытие\закрытие попал окна*/
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  popupType.classList.remove('popup_hide');
  offAutocomplete(popupType);
  setClosePopupOverlayClick(popupType);
  setClosePopupEscKeydown();
}

function closePopup(popupType) {
  popupType.classList.add('popup_hide');
  popupType.classList.remove('popup_opened');
  resetInput(popupType);
}

function resetInput(popupType) {
  if (popupType.querySelector('.modal')) {
    popupType.querySelector('.modal').reset();
  }
}

function offAutocomplete(popupType) {
  if (popupType.querySelector('.modal')) {
    popupType.querySelector('.modal').autocomplete = 'off';
  }
}

/*Закрытие попапа по оверлею*/
const closePopupOverlayClick = (event) => {
  if(event.target.closest('.modal') || event.target.closest('.modal__figure')) return;
  closePopup(event.target.closest('.popup'));
}

const setClosePopupOverlayClick = (target) => {
  target.addEventListener('click', closePopupOverlayClick);
}

/*Закрытие попапа по Escape*/
const closePopupEscKeydown = (event) => {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    document.removeEventListener('keydown', closePopupEscKeydown);
  }
}

const setClosePopupEscKeydown = () => {
  document.addEventListener('keydown', closePopupEscKeydown);
}

export {openPopup, closePopup}
