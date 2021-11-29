import '../assets/pages/index.css';
import {enableValidation} from './validate.js';
import {createCard, confirmButtonDeletePopup, deleteCard} from './сard.js';
import {openPopup, closePopup, offAutocomplete} from './modal.js';
import {
  profileTitle,
  profileDescription,
  profileTitleValue,
  profileDescriptionValue,
  profileChangeHandler,
  cardSubmitHandler,
  profileAvatarChangeHandler,
  cardsSection,
  profilePopup,
  profileAvatar,
  cardPopup,
  profileAvatarPopup
} from './utils.js'
import {getInitialCards, getProfileInfo} from './api.js'

// const cardsSection = document.querySelector('.cards');
const popups = document.querySelectorAll('.popup');
const buttonChangeProfile = document.querySelector('.profile__btn-change');
const buttonAddCard = document.querySelector('.profile__btn-add');
const buttonProfileAvatar = document.querySelector('.profile__avatar-container');

/*Создание стартовых карточек и данных профиля*/
const getInfo = Promise.all([getInitialCards(), getProfileInfo()])
getInfo.then(([cards, profile]) =>{
  Object.values(cards).forEach((card) => {
    cardsSection.append(createCard(card, profile));
  });
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.src = profile.avatar;
})
.catch((err) => {
  console.log(err);
});

/*Закрыть попап окна (формы и картинки) по кнопки или оверлею*/
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup)
      }
  })
})

popups.forEach((popup) => {
  if (popup.querySelector('.modal'))
  offAutocomplete(popup);
})


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

enableValidation({
  formSelector: '.modal',
  inputSelector: '.modal__item',
  submitButtonSelector: '.modal__save-btn',
  inactiveButtonClass: 'modal__save-btn_inactive',
  inputErrorClass: 'modal__item_type_error',
  errorClass: 'modal__item-error_active',
  popup: '.popup'
});
