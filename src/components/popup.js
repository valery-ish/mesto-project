export default class Popup {
    constructor(popupSelector) {
        this.selector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    openPopup() {
        this.selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    closePopup() {
        this.selector.classList.remove('popup_opened');
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.closePopup();
            document.removeEventListener('keydown', this._handleEscClose)
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
