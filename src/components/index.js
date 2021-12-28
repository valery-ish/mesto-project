import '../assets/pages/index.css';
import FormValidator from './validate.js';
import Card from './сard.js';
import {PopupWithForm} from './popup.js';
import {api} from './api.js';
import Section from './section.js';
import UserInfo from './userInfo.js';
import {
  profilePopup,
  cardPopup,
  profileAvatarPopup,
  profileTitle,
  profileDescription,
  profileTitleValue,
  profileDescriptionValue,
  buttonSubmitChangeProfile,
  buttonSubmitChangeAvatar,
  profileAvatar,
  profileAvatarSrc,
  buttonSubmitAddCard,
  cardTitle,
  cardLink
} from './constants.js';

const buttonChangeProfile = document.querySelector('.profile__btn-change');
const buttonAddCard = document.querySelector('.profile__btn-add');
const buttonProfileAvatar = document.querySelector('.profile__avatar-container');

// /*Создание стартовых карточек и данных профиля*/
let userId = '';

const getInfo = Promise.all([api.getInitialCards(), api.getProfileInfo()])
getInfo.then(([cards, profile]) =>{
  const userInfo = new UserInfo(profile);
  userInfo.setUserInfo();
  userId = userInfo.getUserId();

  const cardList = new Section({
    data: cards,
    renderer: (item) => {
      const card = new Card(item, '.card_template');
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    }
  }, '.cards');
  cardList.renderItems()
})
.catch((err) => {
  console.log(err);
});

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
const popupTypeProfile = new PopupWithForm ({
  selector: profilePopup,
  handleButtonClick: (evt) => {
    evt.preventDefault();
    buttonSubmitChangeProfile.textContent = 'Сохранение...';
    api.renewProfileInfo(profileTitleValue.value, profileDescriptionValue.value)
      .then((profile) =>{
        profileTitle.textContent = profile.name;
        profileDescription.textContent = profile.about;
        this.closePopup();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        buttonSubmitChangeProfile.textContent = 'Сохранено';
      })
  }
});
popupTypeProfile.setEventListeners();

const popupTypeCardAdd = new PopupWithForm ({
  selector: cardPopup,
  handleButtonClick: (evt) => {
    evt.preventDefault();
    buttonSubmitAddCard.textContent = 'Сохранение...';
    api.postNewCard(cardTitle.value, cardLink.value)
    .then((card) =>{
      // cardsSection.prepend(createCard(card, userId));
      this.closePopup();
      this._resetModal();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitAddCard.textContent = 'Сохранено';
    })
  }
});
popupTypeCardAdd.setEventListeners();

const popupTypeProfileAvatar = new PopupWithForm ({
  selector: profileAvatarPopup,
  handleButtonClick: (evt) => {
    evt.preventDefault();
    buttonSubmitChangeAvatar.textContent = 'Сохранение...';
    api.renewProfileAvatar(profileAvatarSrc.value)
      .then((profile) =>{
        profileAvatar.src = profile.avatar;
        this.closePopup();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        buttonSubmitChangeAvatar.textContent = 'Сохранено';
      })
  }
});
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
