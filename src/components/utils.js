import {closePopup, resetInput} from './modal.js';
import {createCard} from './сard.js';

  const profilePopup = document.querySelector('.popup_type_profile');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileTitleValue = profilePopup.querySelector('#profile-title');
  const profileDescriptionValue = profilePopup.querySelector('#profile-description');
  const cardPopup = document.querySelector('.popup_type_card-add');
  const cardsSection = document.querySelector('.cards');
  const cardTitle = cardPopup.querySelector('#card-title');
  const cardLink = cardPopup.querySelector('#card-link');

/*Функция изменения данных профиля*/
const profileChangeHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileTitleValue.value;
  profileDescription.textContent = profileDescriptionValue.value;
  closePopup(profilePopup);
};

/*Функция заполнения новой карточки из попап-формы*/
const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  cardsSection.prepend(createCard({
    name: cardTitle.value,
    link: cardLink.value
  }));
  closePopup(cardPopup);
  resetInput(cardPopup);
}

export {profileTitle, profileDescription, profileTitleValue, profileDescriptionValue, profileChangeHandler, cardSubmitHandler}
