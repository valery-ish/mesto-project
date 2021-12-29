import '../assets/pages/index.css';
import FormValidator from './validate.js';
import Card from './сard.js';
import { PopupWithForm } from './popup.js';
import { api } from './api.js';
import Section from './section.js';
import UserInfo from './userInfo.js';
import {
    cardSection,
    profilePopup,
    cardPopup,
    profileAvatarPopup,
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
    buttonProfileAvatar
} from './constants.js';

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
}, '.popup');

formValidator.enableValidation();

/*Попапы*/
const popupTypeProfile = new PopupWithForm({
    selector: profilePopup,
    handleButtonClick: () => {
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
    selector: cardPopup,
    handleButtonClick: () => {
        api.postNewCard(cardTitle.value, cardLink.value)
            .then((card) => {
                const newCard = new Card(card, userId, '.card_template');
                const cardRenderer = new Section({
                    data: []
                }, cardSection);
                const cardElement = newCard.generate();
                cardRenderer.addItem(cardElement);
                popupTypeCardAdd.closePopup();
                popupTypeCardAdd._resetModal();
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
    selector: profileAvatarPopup,
    handleButtonClick: () => {
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