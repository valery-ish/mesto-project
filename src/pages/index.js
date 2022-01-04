import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { api } from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
    cardSection,
    profilePopup,
    cardPopup,
    profileAvatarPopup,
    imagePopup,
    confirmDeletePopup,
    profileTitle,
    profileDescription,
    profileTitleValue,
    profileDescriptionValue,
    profileAvatar,
    profileAvatarSrc,
    cardTitle,
    cardLink,
    buttonChangeProfile,
    buttonAddCard,
    buttonProfileAvatar,
    buttonSubmit,
    inputSelector,
    formSelector,
} from '../utils/constants.js';

// /*Создание стартовых карточек и данных профиля*/
let userId = '';

const getInfo = Promise.all([api.getInitialCards(), api.getProfileInfo()])
getInfo.then(([cards, profile]) => {
        const userInfo = new UserInfo(profile);
        userInfo.setUserInfo();
        userId = userInfo.getUserId();
        // console.log(cards)
        const cardList = new Section({
            data: cards,
            renderer: (item) => {
                const card = new Card(item, userId, '.card_template');

                const cardElement = card.generate();
                cardList.setItemList(cardElement);
            }
        }, cardSection);
        cardList.renderItems()
    })
    .catch((err) => {
        console.log(err);
    });

/*Валидация*/
const formValidator = new FormValidator({
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: buttonSubmit,
    inactiveButtonClass: 'modal__save-btn_inactive',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__item-error_active'
}, '.popup');

formValidator.enableValidation();

/*Попапы*/
const popupTypeProfile = new PopupWithForm({
  popupSelector: profilePopup,
  inputSelector: inputSelector,
  formSelector: formSelector,
  submitButtonSelector: buttonSubmit,
  handleSubmit: () => {
        api.renewProfileInfo(profileTitleValue.value, profileDescriptionValue.value)
            .then((profile) => {
                profileTitle.textContent = profile.name;
                profileDescription.textContent = profile.about;
                popupTypeProfile.closePopup();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupTypeProfile.handleResultBtnState();
            })
    }
});
popupTypeProfile.setEventListeners();

const popupTypeCardAdd = new PopupWithForm({
  popupSelector: cardPopup,
  inputSelector: inputSelector,
  formSelector: formSelector,
  submitButtonSelector: buttonSubmit,
  handleSubmit: () => {
        api.postNewCard(cardTitle.value, cardLink.value)
            .then((card) => {
                const newCard = new Card(card, userId, '.card_template');
                const cardRenderer = new Section({
                    data: []
                }, cardSection);
                const cardElement = newCard.generate();
                cardRenderer.addItem(cardElement);
                popupTypeCardAdd.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupTypeCardAdd.handleResultBtnState();
            })
    }
});
popupTypeCardAdd.setEventListeners();

const popupTypeProfileAvatar = new PopupWithForm({
  popupSelector: profileAvatarPopup,
  inputSelector: inputSelector,
  formSelector: formSelector,
  submitButtonSelector: buttonSubmit,
  handleSubmit: () => {
        api.renewProfileAvatar(profileAvatarSrc.value)
            .then((profile) => {
                profileAvatar.src = profile.avatar;
                popupTypeProfileAvatar.closePopup();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupTypeProfileAvatar.handleResultBtnState();
            })
    }
});
popupTypeProfileAvatar.setEventListeners();

const popupWithImage = new PopupWithImage(imagePopup, '.modal__image', '.modal__figcaption');
popupWithImage.setEventListeners();

const popupTypeConfirmDelete = new PopupWithForm({
  popupSelector: confirmDeletePopup,
  inputSelector: inputSelector,
  formSelector: formSelector,
  submitButtonSelector: buttonSubmit,
  handleSubmit: () => {
      api.deleteCardApi(this._cardId)
          .then(() => {
              // card.remove();
              popupTypeConfirmDelete.closePopup();
          })
          .catch((err) => {
              console.log(err);
          });
  }
});
popupTypeConfirmDelete.setEventListeners();

/*Открытие окна формы Редактировать профиль*/
buttonChangeProfile.addEventListener('click', function() {
    popupTypeProfile.openPopup();
});

/*Открытие окна формы Добавить новое место*/
buttonAddCard.addEventListener('click', function() {
    popupTypeCardAdd.openPopup();
});

/*Открытие окна формы Изменить аватар*/
buttonProfileAvatar.addEventListener('click', function() {
    popupTypeProfileAvatar.openPopup();
});
