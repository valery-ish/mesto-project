import '../assets/pages/index.css';
import FormValidator from './validate.js';
import Card from './сard.js';
import {PopupWithForm, PopupWithImage} from './popup.js';
import {api} from './api.js';
import Section from './section.js';
import UserInfo from './userInfo.js';
import {
  profilePopup,
  cardPopup,
  profileAvatarPopup,
} from './constants.js';

// const cardsSection = document.querySelector('.cards');

const buttonChangeProfile = document.querySelector('.profile__btn-change');
const buttonAddCard = document.querySelector('.profile__btn-add');
const buttonProfileAvatar = document.querySelector('.profile__avatar-container');





// /*Создание стартовых карточек и данных профиля*/
// let userId = '';

// const getInfo = Promise.all([api.getInitialCards(), api.getProfileInfo()])
// getInfo.then(([cards, profile]) =>{
//   userId = profile._id;
//   profileTitle.textContent = profile.name;
//   profileDescription.textContent = profile.about;
//   profileAvatar.src = profile.avatar;
//   Object.values(cards).forEach((card) => {
//     cardsSection.append(createCard(card, userId));
//   });
// })
// .catch((err) => {
//   console.log(err);
// });

/*Валидация*/
const formValidator = new FormValidator({
  formSelector: '.modal',
  inputSelector: '.modal__item',
  submitButtonSelector: '.modal__save-btn',
  inactiveButtonClass: 'modal__save-btn_inactive',
  inputErrorClass: 'modal__item_type_error',
  errorClass: 'modal__item-error_active'
}, '.popup');

formValidator.enableValidation();

/*Попапы*/
const popupTypeProfile = new PopupWithForm (profilePopup);
const popupTypeCardAdd = new PopupWithForm (cardPopup);
const popupTypeProfileAvatar = new PopupWithForm (profileAvatarPopup);

popupTypeProfile.setEventListeners();
popupTypeCardAdd.setEventListeners();
popupTypeProfileAvatar.setEventListeners();

/*Открытие окна формы Редактировать профиль*/
buttonChangeProfile.addEventListener('click', function() {
  popupTypeProfile.openPopup();
  popupTypeProfile.getInputValues();
});

/*Открытие окна формы Добавить новое место*/
buttonAddCard.addEventListener('click', function() {
  popupTypeCardAdd.openPopup();
});

/*Открытие окна формы Изменить аватар*/
buttonProfileAvatar.addEventListener('click', function() {
  popupTypeProfileAvatar.openPopup();
});
