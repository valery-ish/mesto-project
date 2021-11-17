import './assets/pages/index.css';
import {enableValidation} from './components/validate.js';
const setEnableValidation = () => {
  enableValidation({
    formSelector: '.modal',
    inputSelector: '.modal__item',
    submitButtonSelector: '.modal__save-btn',
    inactiveButtonClass: 'modal__save-btn_inactive',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__item-error_active'
  });
}

/*Создание стартовых карточек при загрузки страницы*/
import {initialCards, createCard} from './components/сard.js';
initialCards.forEach ((element) => {
  const cardsSection = document.querySelector('.cards');
  cardsSection.append(createCard(element));
});

/*Событие на кнопку закрытия попап окна (формы и картинки)*/
import {openPopup, closePopup} from './components/modal.js';
const closePopupButton = document.querySelectorAll('.popup__close-btn');
closePopupButton.forEach(element => element.addEventListener('click', () => closePopup(element.closest('.popup'))));


/*Открытие окна формы Редактировать профиль*/
import {profileTitle, profileDescription, profileTitleValue, profileDescriptionValue, profileChangeHandler, cardSubmitHandler} from './components/utils.js'
const buttonChangeProfile = document.querySelector('.profile__btn-change');
buttonChangeProfile.addEventListener('click', function() {
  const profilePopup = document.querySelector('.popup_type_profile');
  openPopup(profilePopup);
  profileTitleValue.value = profileTitle.textContent;
  profileDescriptionValue.value = profileDescription.textContent;
  setEnableValidation();
});

/*Открытие окна формы Добавить новое место*/
const buttonAddCard = document.querySelector('.profile__btn-add');
buttonAddCard.addEventListener('click', function() {
  const cardPopup = document.querySelector('.popup_type_card-add');
  openPopup(cardPopup);
  setEnableValidation();
});

/*Событие на изменение профиля и добавление карточки*/
document.querySelector('#card-add').addEventListener('submit', cardSubmitHandler);
document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);
