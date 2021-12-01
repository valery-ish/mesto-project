/*Открытие\закрытие попал окна*/
export function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscKeydown);
}

export function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscKeydown);
}

/*Закрытие попапа по Escape*/
const closePopupEscKeydown = (event) => {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
