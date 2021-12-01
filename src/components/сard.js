import {putLikeCard, deleteLikeCard, deleteCardApi} from './api.js'
import {openPopup} from './utils.js'

const imagePopup = document.querySelector('.popup_type_picture');
const imagePopupModal = imagePopup.querySelector('.modal__image');
const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
export const confirmButtonDeletePopup = confirmDeletePopup.querySelector('.modal');

/*Функция создания новой карточки*/
export const createCard = (cardData, userId) => {
  const cardTemplate = document.querySelector('.card_template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementLike = cardElement.querySelector('.card__btn');
  const cardElementDelete = cardElement.querySelector('.card__delete-btn')

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  /*проверка лайков*/
  if (checkLikeCard(cardData, userId)) {
    cardElementLike.classList.add('card__btn_active')
  };
  cardElementLike.addEventListener('click', (event) => {
    likeCard(event, cardData._id, cardElementLike)
  });
  cardElementLike.textContent = cardData.likes.length;

  /*проверка кнопки удалить*/
  if(cardData.owner._id === userId) {
    cardElementDelete.style.display = 'block';
    cardElementDelete.addEventListener('click', (evt) => handleDelete(evt, cardData));
  }

  cardElementImage.addEventListener('click', openImageCard);
  return cardElement;
};

/*Кнопка удалить карточку*/
function  handleDelete(evt, cardData) {
  evt.preventDefault();
  deleteCardApi(cardData._id)
    .then(() => {
      evt.target.closest('.card').remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

/*Функция лайк*/
const checkLikeCard = (cardData, userId) => {
  return Object.values(cardData.likes).some(like => like._id === userId)
}

const likeCard = (event, cardID, cardElementLike) => {
  if(!event.target.classList.contains('card__btn_active')) {
    putLikeCard(cardID)
    .then((card) => {
      cardElementLike.textContent = card.likes.length;
      event.target.classList.add('card__btn_active');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else {
    deleteLikeCard(cardID)
    .then((card) => {
      cardElementLike.textContent = card.likes.length;
      event.target.classList.remove('card__btn_active');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

/*Функция открытия картинки карточки в попап окно на весь экран*/
const openImageCard = (evt) => {
  openPopup(imagePopup);
  imagePopupModal.src = evt.target.src;
  imagePopupModal.alt = evt.target.alt;
  imagePopup.querySelector('.modal__figcaption').textContent = evt.target.alt;
}
