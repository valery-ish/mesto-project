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
