import { api } from './api.js';
import { PopupWithImage, PopupWithForm } from './popup.js';
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



//   /*проверка кнопки удалить*/


//   cardElementImage.addEventListener('click', openImageCard);
//   return cardElement;
// };

// function openConfirmDeletePopup (evt, cardData) {
//   openPopup(confirmDeletePopup);
//   cardIDToDelete = cardData._id;
//   cardToDelete = evt.target.closest('.card');
// }

export default class Card {
    constructor(data, userId, selector) {
        this._userId = userId
        this._selector = selector;
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        // this._likeBtn = selector.querySelector('.card__btn')
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
        this._img = this._element.querySelector('.card__image');
        this._img.src = this._link;
        this._img.alt = this._title;
        this._element.querySelector('.card__title').textContent = this._title;
        this._likeBtn = this._element.querySelector('.card__btn')
        this._likeBtn.textContent = this._likes.length;
        this._deleteBtn = this._element.querySelector('.card__delete-btn')
        this._setEventListeners(this._likeBtn, this._deleteBtn, this._img);

        if (this._checkLikeCard()) {
            this._likeBtn.classList.add('card__btn_active');
        }
        return this._element;
    }

    _checkLikeCard() {
        return Object.values(this._likes).some(like => like._id === this._userId)
    }

    _likeCard(likeBtn) {
        if (!likeBtn.classList.contains('card__btn_active')) {
            api.putLikeCard(this._cardId)
                .then((card) => {
                    likeBtn.textContent = card.likes.length;
                    likeBtn.classList.add('card__btn_active');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(this._cardId)
                .then((card) => {
                    likeBtn.textContent = card.likes.length;
                    likeBtn.classList.remove('card__btn_active');
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }

    _checkDeleteCard() {
        if (cardData.owner._id === userId) {
            cardElementDelete.style.display = 'block';
            return Object.values(this._likes).some(like => like._id === this._userId)
        }
    }

    // _handleOpenPopup(popupImage) {
    //     popupImage.src = this._image;
    //     openPopup(popupElement);
    // }

    // _handleClosePopup() {
    //     popupImage.src = '';
    //     openPopup(popupElement);
    // }

    _setEventListeners(likeBtn, cardElementDelete, img) {
        const popupWithImage = new PopupWithImage(imagePopup, '.modal__image', '.modal__figcaption');
        popupWithImage.setEventListeners();

        likeBtn.addEventListener('click', () => {
            this._likeCard(likeBtn);
        });

        cardElementDelete.addEventListener('click', (evt) => {
            popupTypeConfirmDelete.openPopup()
        });

        img.addEventListener('click', () => {
            popupWithImage.openPopup(img);
        });
    }
}

const popupTypeConfirmDelete = new PopupWithForm({
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
