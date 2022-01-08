export default class Card {
    constructor({data, userId, selector, putLikeCardRender, deleteLikeCardRender, openImage, deleteCard}) {
        this._userId = userId
        this._selector = selector;
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
        this._putLikeCardRender = putLikeCardRender;
        this._deleteLikeCardRender = deleteLikeCardRender;
        this._openImage = openImage;
        this._deleteCard = deleteCard;
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
        if (this._checkLikeCard()) {
            this._likeBtn.classList.add('card__btn_active');
        }
        this._checkDeleteCard()
        this._setEventListeners();
        return this._element;
    }

    _checkLikeCard() {
        return Object.values(this._likes).some(like => like._id === this._userId)
    }


    _likeCard() {
        if (!this._likeBtn.classList.contains('card__btn_active')) {
          this._putLikeCardRender(this._likeBtn);
        } else {
          this._deleteLikeCardRender(this._likeBtn);
        }

    }

    _checkDeleteCard() {
        if (this._cardOwnerId === this._userId) {
          this._deleteBtn.style.display = 'block';
          return Object.values(this._likes).some(like => like._id === this._userId)
        }
    }

    _setEventListeners() {
        this._likeBtn.addEventListener('click', () => {
            this._likeCard();
        });

        this._deleteBtn.addEventListener('click', () => {
            this._deleteCard();
        });

        this._img.addEventListener('click', () => {
            this._openImage(this._title, this._link);
        });
    }
}
