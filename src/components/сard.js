import {api} from './api.js'
import {openPopup, closePopup} from './utils.js'

const imagePopup = document.querySelector('.popup_type_picture');
const imagePopupModal = imagePopup.querySelector('.modal__image');
const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
export const confirmButtonDeletePopup = confirmDeletePopup.querySelector('.modal');

let cardIDToDelete = '';
let cardToDelete = '';

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
    cardElementDelete.addEventListener('click', (evt) => openConfirmDeletePopup(evt, cardData));
  }

  cardElementImage.addEventListener('click', openImageCard);
  return cardElement;
};

function openConfirmDeletePopup (evt, cardData) {
  openPopup(confirmDeletePopup);
  cardIDToDelete = cardData._id;
  cardToDelete = evt.target.closest('.card');
}

/*Кнопка удалить карточку*/
function  handleDelete() {
  api.deleteCardApi(cardIDToDelete)
    .then(() => {
      // location.reload();
      cardToDelete.remove();
      closePopup(confirmDeletePopup);
    })
    .catch((err) => {
      console.log(err);
    });
}
confirmButtonDeletePopup.addEventListener('submit', handleDelete)

/*Функция лайк*/
const checkLikeCard = (cardData, userId) => {
  return Object.values(cardData.likes).some(like => like._id === userId)
}

const likeCard = (event, cardID, cardElementLike) => {
  if(!event.target.classList.contains('card__btn_active')) {
    api.putLikeCard(cardID)
    .then((card) => {
      cardElementLike.textContent = card.likes.length;
      event.target.classList.add('card__btn_active');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else {
    api.deleteLikeCard(cardID)
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
