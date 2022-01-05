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
    profileAvatar,
    buttonChangeProfile,
    buttonAddCard,
    buttonProfileAvatar
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
    formSelector: '.modal',
    inputSelector: '.modal__item',
    submitButtonSelector: '.modal__save-btn',
    inactiveButtonClass: 'modal__save-btn_inactive',
    inputErrorClass: 'modal__item_type_error',
    errorClass: 'modal__item-error_active'
}, '.popup_type_profile');

formValidator.enableValidation();

/*Попапы*/
const popupTypeProfile = new PopupWithForm({
  popupSelector: profilePopup,
  handleSubmit: (formData) => {
        api.renewProfileInfo(formData['profile-title'], formData['profile-description'])
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
  handleSubmit: (formData) => {
        api.postNewCard(formData['card-title'], formData['card-link'])
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
  handleSubmit: (formData) => {
        api.renewProfileAvatar(formData['profile-avatar-link'])
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
