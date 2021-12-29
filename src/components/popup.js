import {
    profileTitle,
    profileDescription,
    profileTitleValue,
    profileDescriptionValue,
    buttonSubmit
} from './constants.js';

export default class Popup {
    constructor(selector) {
        this.selector = selector;
    }

    openPopup() {
        this.selector.classList.add('popup_opened');
    }

    closePopup() {
        this.selector.classList.remove('popup_opened');
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
        document.addEventListener('keydown', () => {this._handleEscClose(event)});
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
        this._handleButtonClick = handleButtonClick
    }

    getInputValues() {
        profileTitleValue.value = profileTitle.textContent;
        profileDescriptionValue.value = profileDescription.textContent;
    }

    _resetModal() {
        this.selector.querySelector('.modal').reset();
    }

    _offAutocomplete() {
        this.selector.querySelector('.modal').autocomplete = 'off';
    }

    closePopup() {
      super.closePopup();
      this._resetModal();
    }

    handleResultBtnState() {
      this.selector.querySelector(buttonSubmit).textContent = 'Сохранено';
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.selector.querySelector(buttonSubmit).textContent = 'Сохранение...';
            this._handleButtonClick(evt)
        });
        this._offAutocomplete();
    }
}
