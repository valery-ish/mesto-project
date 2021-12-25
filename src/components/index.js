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

formValidator.enableValidation();

popupTypeProfile.setEventListeners();
popupTypeCardAdd.setEventListeners();
popupTypeProfileAvatar.setEventListeners();
popupTypeConfirmDelete.setEventListeners();
