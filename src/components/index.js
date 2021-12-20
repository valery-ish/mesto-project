import '../assets/pages/index.css';
import {formValidator} from './validate.js';
import {createCard} from './сard.js';
import {offAutocomplete, resetInput} from './modal.js';
import {Popup, PopupWithForm} from './utils.js'
import {api} from './api.js'

// const cardsSection = document.querySelector('.cards');
const popups = document.querySelectorAll('.popup');
const buttonChangeProfile = document.querySelector('.profile__btn-change');
const buttonAddCard = document.querySelector('.profile__btn-add');
const buttonProfileAvatar = document.querySelector('.profile__avatar-container');
const cardsSection = document.querySelector('.cards');
const profilePopup = document.querySelector('.popup_type_profile');
const profileAvatar = document.querySelector('.profile__avatar');
const cardPopup = document.querySelector('.popup_type_card-add');
const profileAvatarPopup = document.querySelector('.popup_type_profile-avatar');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleValue = profilePopup.querySelector('#profile-title');
const profileDescriptionValue = profilePopup.querySelector('#profile-description');
const buttonSubmitAddCard = cardPopup.querySelector('.modal__save-btn');
const buttonSubmitChangeProfile = profilePopup.querySelector('.modal__save-btn');
const buttonSubmitChangeAvatar = profileAvatarPopup.querySelector('.modal__save-btn');
const profileAvatarSrc = profileAvatarPopup.querySelector('#profile-avatar-link');
const cardTitle = cardPopup.querySelector('#card-title');
const cardLink = cardPopup.querySelector('#card-link');

let userId = '';

const popupTypeProfile = new PopupWithForm (document.querySelector('.popup_type_profile'));
const popupTypeCardAdd = new PopupWithForm (document.querySelector('.popup_type_card-add'));
const popupTypeProfileAvatar = new PopupWithForm (document.querySelector('.popup_type_profile-avatar'));
const popupTypeConfirmDelete = new PopupWithForm (document.querySelector('.popup_type_confirm-delete'));

/*Создание стартовых карточек и данных профиля*/
const getInfo = Promise.all([api.getInitialCards(), api.getProfileInfo()])
getInfo.then(([cards, profile]) =>{
  userId = profile._id;
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.src = profile.avatar;
  Object.values(cards).forEach((card) => {
    cardsSection.append(createCard(card, userId));
  });
})
.catch((err) => {
  console.log(err);
});

popups.forEach((popup) => {
  if (popup.querySelector('.modal'))
  offAutocomplete(popup);
})

/*Функция изменения данных профиля*/
const profileChangeHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitChangeProfile.textContent = 'Сохранение...';
  api.renewProfileInfo(profileTitleValue.value, profileDescriptionValue.value)
    .then((profile) =>{
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonSubmitChangeProfile.textContent = 'Сохранено';
    })
};

/*Функция изменения аватара профиля*/
const profileAvatarChangeHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitChangeAvatar.textContent = 'Сохранение...';
  api.renewProfileAvatar(profileAvatarSrc.value)
    .then((profile) =>{
      profileAvatar.src = profile.avatar;
      closePopup(profileAvatarPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonSubmitChangeAvatar.textContent = 'Сохранено';
    })
};

/*Функция заполнения новой карточки из попап-формы*/
const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitAddCard.textContent = 'Сохранение...';
  api.postNewCard(cardTitle.value, cardLink.value)
  .then((card) =>{
    cardsSection.prepend(createCard(card, userId));
    closePopup(cardPopup);
    resetInput(cardPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSubmitAddCard.textContent = 'Сохранено';
  })
}

/*Открытие окна формы Редактировать профиль*/
buttonChangeProfile.addEventListener('click', function() {
  openPopup(profilePopup);
  profileTitleValue.value = profileTitle.textContent;
  profileDescriptionValue.value = profileDescription.textContent;
});

/*Открытие окна формы Добавить новое место*/
buttonAddCard.addEventListener('click', function() {
  openPopup(cardPopup);
});

/*Открытие окна формы Изменить аватар*/
buttonProfileAvatar.addEventListener('click', function() {
  openPopup(profileAvatarPopup);
});

/*Событие на изменение профиля и добавление карточки*/
document.querySelector('#card-add').addEventListener('submit', cardSubmitHandler);
document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);
document.querySelector('#profile-avatar').addEventListener('submit', profileAvatarChangeHandler);


formValidator.enableValidation();

popupTypeProfile.setEventListeners();
popupTypeCardAdd.setEventListeners();
popupTypeProfileAvatar.setEventListeners();
popupTypeConfirmDelete.setEventListeners();
