/*Массив стартовых карточек*/
const initialCards = [
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1504615458222-979e04d69a27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1355&q=80'
  },
  {
    name: 'Магадан',
    link: 'https://images.unsplash.com/photo-1471609830806-bf4bc7f6ff02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Республика Алтай',
    link: 'https://images.unsplash.com/photo-1589122758779-0df750e72d2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1484&q=80'
  },
  {
    name: 'Кижи',
    link: 'https://images.unsplash.com/photo-1615529610458-1801dfce0a6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1401&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588353-e1011c0269ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=635&q=80'
  }
];

/*Функция создания новой карточки*/
const createCard = (cardData) => {
  const cardTemplate = document.querySelector('.card_template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__btn').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openImageCard);
  return cardElement;
};

/*Функция лайк*/
const likeCard = (event) => {
  event.target.classList.toggle('card__btn_active');
}

/*Кнопка удалить карточку*/
const  deleteCard = (event) => {
  event.target.closest('.card').remove();
}

/*Функция открытия картинки карточки в попап окно на весь экран*/
import {openPopup} from './modal.js'
const openImageCard = (evt) => {
  const imagePopup = document.querySelector('.popup_type_picture');
  openPopup(imagePopup);

  imagePopup.querySelector('.modal__image').src = evt.target.src;
  imagePopup.querySelector('.modal__image').alt = evt.target.alt;
  imagePopup.querySelector('.modal__figcaption').textContent = evt.target.alt;
}

export {initialCards, createCard};
