import {closePopup, resetInput} from './modal.js';
import {createCard} from './сard.js';
import {renewProfileInfo, postNewCard, getProfileInfo, renewProfileAvatar} from './api.js'

export const cardsSection = document.querySelector('.cards');
export const profilePopup = document.querySelector('.popup_type_profile');
export const profileAvatar = document.querySelector('.profile__avatar');
export const cardPopup = document.querySelector('.popup_type_card-add');
export const profileAvatarPopup = document.querySelector('.popup_type_profile-avatar');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileTitleValue = profilePopup.querySelector('#profile-title');
export const profileDescriptionValue = profilePopup.querySelector('#profile-description');
const buttonSubmitAddCard = cardPopup.querySelector('.modal__save-btn');
const buttonSubmitChangeProfile = profilePopup.querySelector('.modal__save-btn');
const buttonSubmitChangeAvatar = profileAvatarPopup.querySelector('.modal__save-btn');
const profileAvatarSrc = profileAvatarPopup.querySelector('#profile-avatar-link');
const cardTitle = cardPopup.querySelector('#card-title');
const cardLink = cardPopup.querySelector('#card-link');

/*Функция изменения данных профиля*/
export const profileChangeHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitChangeProfile.textContent = 'Сохранение...';
  renewProfileInfo(profileTitleValue.value, profileDescriptionValue.value)
    .then((profile) =>{
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonSubmitChangeProfile.textContent = 'Сохранено';
      closePopup(profilePopup);
    })
};

/*Функция изменения аватара профиля*/
export const profileAvatarChangeHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitChangeAvatar.textContent = 'Сохранение...';
  renewProfileAvatar(profileAvatarSrc.value)
    .then((profile) =>{
      profileAvatar.src = profile.avatar;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonSubmitChangeAvatar.textContent = 'Сохранено';
      closePopup(profileAvatarPopup);
    })
};

/*Функция заполнения новой карточки из попап-формы*/
export const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitAddCard.textContent = 'Сохранение...';
  const promise = Promise.all([postNewCard(cardTitle.value, cardLink.value), getProfileInfo()])
  promise.then(([card, profile]) =>{
    cardsSection.prepend(createCard(card, profile));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSubmitAddCard.textContent = 'Сохранено';
    closePopup(cardPopup);
    resetInput(cardPopup);
  })
}
