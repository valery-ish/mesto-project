import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { api } from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
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
