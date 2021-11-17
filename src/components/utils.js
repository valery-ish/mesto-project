import {closePopup} from './modal.js';
import {createCard} from './сard.js';
/*Функция изменения данных профиля*/
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileTitleValue = document.querySelector('#profile-title');
  const profileDescriptionValue = document.querySelector('#profile-description');
const profileChangeHandler = (evt) => {
  const popup = document.querySelector('.popup_type_profile');
  evt.preventDefault();
  profileTitle.textContent = profileTitleValue.value;
  profileDescription.textContent = profileDescriptionValue.value;
  closePopup(popup);
};

/*Функция заполнения новой карточки из попап-формы*/
const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  const popup = document.querySelector('.popup_type_card-add');
  const cardsSection = document.querySelector('.cards');
  cardsSection.prepend(createCard({
    name: popup.querySelector('#card-title').value,
    link: popup.querySelector('#card-link').value
  }));
  closePopup(popup);
}

export {profileTitle, profileDescription, profileTitleValue, profileDescriptionValue, profileChangeHandler, cardSubmitHandler}
