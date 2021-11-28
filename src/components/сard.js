import {putLikeCard, deleteLikeCard, deleteCardApi} from './api.js'
import {openPopup, closePopup} from './modal.js'

const imagePopup = document.querySelector('.popup_type_picture');
const imagePopupModal = imagePopup.querySelector('.modal__image');
const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
export const confirmButtonDeletePopup = confirmDeletePopup.querySelector('.modal');

/*Функция создания новой карточки*/
export const createCard = (cardData, profile) => {
  const cardTemplate = document.querySelector('.card_template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementLike = cardElement.querySelector('.card__btn');
  const cardElementDelete = cardElement.querySelector('.card__delete-btn')

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  /*проверка лайков*/
  if (checkLikeCard(cardData, profile)) {
    cardElementLike.classList.add('card__btn_active')
  };
  cardElementLike.addEventListener('click', () => {
    likeCard(event, cardData._id, cardElementLike)
  });
  cardElementLike.textContent = cardData.likes.length;

  /*проверка кнопки удалить*/
  if(cardData.owner._id === profile._id) {
    cardElementDelete.style.display = 'block'
    cardElementDelete.addEventListener('click', () => openConfirmDeletePopup(event, cardData));
  }

  cardElementImage.addEventListener('click', openImageCard);
  return cardElement;
};

/*Кнопка удалить карточку*/
function  deleteCard(cardData) {
  deleteCardApi(cardData._id)
    .then(() => {
      closePopup(confirmDeletePopup);
      document.querySelector('.card__to-remove').remove();
    })
}

export function openConfirmDeletePopup(event, cardData) {
  openPopup(confirmDeletePopup);
  event.target.closest('.card').classList.add('card__to-remove');
  confirmButtonDeletePopup.addEventListener('submit', () => {deleteCard(cardData)}, {once: true});
}

/*Функция лайк*/
const checkLikeCard = (cardData, profile) => {
  return Object.values(cardData.likes).some(like => like._id === profile._id)
}

const likeCard = (event, cardID, cardElementLike) => {
  event.target.classList.toggle('card__btn_active');

  if(event.target.classList.contains('card__btn_active')) {
    putLikeCard(cardID)
    .then((card) => {
      cardElementLike.textContent = card.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    deleteLikeCard(cardID)
    .then((card) => {
      cardElementLike.textContent = card.likes.length;
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
