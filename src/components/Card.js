import { api } from './Api.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {
    confirmDeletePopup,
    imagePopup
} from '../utils/constants.js';

export default class Card {
    constructor(data, userId, selector) {
        this._userId = userId
        this._selector = selector;
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
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
        this._deleteBtn = this._element.querySelector('.card__delete-btn');
        this._setEventListeners(this._likeBtn, this._deleteBtn, this._img, this._element);

        if (this._checkLikeCard()) {
            this._likeBtn.classList.add('card__btn_active');
        }

        this._checkDeleteCard(this._deleteBtn)

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

    _checkDeleteCard(cardElementDelete) {
        if (this._cardOwnerId === this._userId) {
            cardElementDelete.style.display = 'block';
            return Object.values(this._likes).some(like => like._id === this._userId)
        }
    }

    _setEventListeners(likeBtn, cardElementDelete, img, card) {
        const popupWithImage = new PopupWithImage(imagePopup, '.modal__image', '.modal__figcaption');
        popupWithImage.setEventListeners();

        likeBtn.addEventListener('click', () => {
            this._likeCard(likeBtn);
        });

        cardElementDelete.addEventListener('click', (evt) => {
            this._deletCard(card);

        });

        img.addEventListener('click', () => {
            popupWithImage.openPopup(img);
        });
    }

    _deletCard(card) {
        const popupTypeConfirmDelete = new PopupWithForm({
            selector: confirmDeletePopup,
            handleButtonClick: () => {
                api.deleteCardApi(this._cardId)
                    .then(() => {
                        card.remove();
                        popupTypeConfirmDelete.closePopup();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        popupTypeConfirmDelete.openPopup()
        popupTypeConfirmDelete.setEventListeners();
    }
}
