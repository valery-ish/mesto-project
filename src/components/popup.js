import {
    profileTitle,
    profileDescription,
    profileTitleValue,
    profileDescriptionValue
} from './constants.js';

export default class Popup {
    constructor(selector) {
        this.selector = selector;
    }

    openPopup() {
        this.selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this.selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        this.selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
                this.closePopup()
            }
        })
    }
}

export class PopupWithImage extends Popup {
    constructor(selector, imageModal, imageFigcaption) {
        super(selector);
        this.imageModal = imageModal;
        this.imageFigcaption = imageFigcaption;
    }

    openPopup(evt) {
        super.openPopup();
        const currentImageModal = this.selector.querySelector(this.imageModal);
        const currentIimageFigcaption = this.selector.querySelector(this.imageFigcaption);
        currentImageModal.src = evt.src;
        currentImageModal.alt = evt.alt;
        currentIimageFigcaption.textContent = evt.alt;
    }
}

export class PopupWithForm extends Popup {
    constructor({ selector, handleButtonClick }) {
        super(selector);
        this._handleButtonClick = handleButtonClick;
    }

    getInputValues() {
        profileTitleValue.value = profileTitle.textContent;
        profileDescriptionValue.value = profileDescription.textContent;
    }

    _resetModal() {
        this.selector.querySelector('.modal').reset();
    }

    offAutocomplete() {
        this.selector.querySelector('.modal').autocomplete = 'off';
    }

    closePopup() {
      super.closePopup();
      this._resetModal();
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', (evt) => {
            this._handleButtonClick(evt);
        });
        this.offAutocomplete();
    }
}
