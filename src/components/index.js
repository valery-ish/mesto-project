import '../assets/pages/index.css';
import {enableValidation} from './validate.js';
import {initialCards, createCard} from './сard.js';
import {openPopup, closePopup, offAutocomplete} from './modal.js';

const cardsSection = document.querySelector('.cards');
const buttonChangeProfile = document.querySelector('.profile__btn-change');
const profilePopup = document.querySelector('.popup_type_profile');
const buttonAddCard = document.querySelector('.profile__btn-add');
const cardPopup = document.querySelector('.popup_type_card-add');
const popups = document.querySelectorAll('.popup');

/*Создание стартовых карточек при загрузки страницы*/
initialCards.forEach ((element) => {
  cardsSection.append(createCard(element));
});

/*Закрыть попап окна (формы и картинки) по кнопки или оверлею*/
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup)
      }
  })
})

popups.forEach((popup) => {
  if (popup.querySelector('.modal'))
  offAutocomplete(popup);
})

/*Открытие окна формы Редактировать профиль*/
import {profileTitle, profileDescription, profileTitleValue, profileDescriptionValue, profileChangeHandler, cardSubmitHandler} from './utils.js'

buttonChangeProfile.addEventListener('click', function() {
  openPopup(profilePopup);
  profileTitleValue.value = profileTitle.textContent;
  profileDescriptionValue.value = profileDescription.textContent;
});

/*Открытие окна формы Добавить новое место*/
buttonAddCard.addEventListener('click', function() {
  openPopup(cardPopup);
});

/*Событие на изменение профиля и добавление карточки*/
document.querySelector('#card-add').addEventListener('submit', cardSubmitHandler);
document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);

enableValidation({
  formSelector: '.modal',
  inputSelector: '.modal__item',
  submitButtonSelector: '.modal__save-btn',
  inactiveButtonClass: 'modal__save-btn_inactive',
  inputErrorClass: 'modal__item_type_error',
  errorClass: 'modal__item-error_active',
  popup: '.popup'
});
