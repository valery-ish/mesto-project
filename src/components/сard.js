import {api} from './api.js';
import {PopupWithImage, PopupWithForm} from './popup.js';
import {
  confirmDeletePopup,
  imagePopup
} from './constants.js';

// let cardIDToDelete = '';
// let cardToDelete = '';

// /*Функция создания новой карточки*/
// export const createCard = (cardData, userId) => {
//   const cardTemplate = document.querySelector('.card_template').content;
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardElementImage = cardElement.querySelector('.card__image');
//   const cardElementLike = cardElement.querySelector('.card__btn');
//   const cardElementDelete = cardElement.querySelector('.card__delete-btn')

//   cardElementImage.src = cardData.link;
//   cardElementImage.alt = cardData.name;
//   cardElement.querySelector('.card__title').textContent = cardData.name;

//   /*проверка лайков*/
//   if (checkLikeCard(cardData, userId)) {
//     cardElementLike.classList.add('card__btn_active')
//   };
//   cardElementLike.addEventListener('click', (event) => {
//     likeCard(event, cardData._id, cardElementLike)
//   });
//   cardElementLike.textContent = cardData.likes.length;

//   /*проверка кнопки удалить*/
//   if(cardData.owner._id === userId) {
//     cardElementDelete.style.display = 'block';
//     cardElementDelete.addEventListener('click', (evt) => openConfirmDeletePopup(evt, cardData));
//   }

//   cardElementImage.addEventListener('click', openImageCard);
//   return cardElement;
// };

// function openConfirmDeletePopup (evt, cardData) {
//   openPopup(confirmDeletePopup);
//   cardIDToDelete = cardData._id;
//   cardToDelete = evt.target.closest('.card');
// }

// /*Функция лайк*/
// const checkLikeCard = (cardData, userId) => {
//     return Object.values(cardData.likes).some(like => like._id === userId)
// }


// const likeCard = (event, cardID, cardElementLike) => {
//     if (!event.target.classList.contains('card__btn_active')) {
//         putLikeCard(cardID)
//             .then((card) => {
//                 cardElementLike.textContent = card.likes.length;
//                 event.target.classList.add('card__btn_active');
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     } else {
//         deleteLikeCard(cardID)
//             .then((card) => {
//                 cardElementLike.textContent = card.likes.length;
//                 event.target.classList.remove('card__btn_active');
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// }


export default class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._title = data.title;
    this._link = data.link;
    this._likes = data.likes;
  }

 _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

 generate() {
    this._element = this._getElement();
    // this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._link;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__btn').textContent = this._likes.length;
    return this._element;
  }
}


const popupTypeConfirmDelete = new PopupWithForm ({
  selector: confirmDeletePopup,
  handleButtonClick: () => {
    api.deleteCardApi(cardIDToDelete)
    .then(() => {
      cardToDelete.remove();
      this.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
  }
});
popupTypeConfirmDelete.setEventListeners();
// /*Кнопка удалить карточку*/
// function  handleDelete() {
//   api.deleteCardApi(cardIDToDelete)
//     .then(() => {
//       // location.reload();
//       cardToDelete.remove();
//       closePopup(confirmDeletePopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// confirmButtonDeletePopup.addEventListener('submit', handleDelete)

const popupWithImage = new PopupWithImage (imagePopup, '.modal__image', '.modal__figcaption');
popupWithImage.setEventListeners();


    //Нужно Добавить константу popup и popupImage

    // _handleOpenPopup() {
    //     popupImage.src = this._image;
    //     openPopup(popupElement);
    // }

    // _handleClosePopup() {
    //     popupImage.src = '';
    //     openPopup(popupElement);
    // }

    // _setEventListeners() {
    //     this._image.addEventListener('click', () => {
    //         this._handleOpenPopup();
    //     });

    //     this._element.querySelector('.popup__close-btn').addEventListener('click', () => {
    //         this._handleClosePopup();
    //     });
    // }
