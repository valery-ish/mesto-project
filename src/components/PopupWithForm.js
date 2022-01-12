import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ selector, handleSubmit }) {
        super(selector);
        this._selector = selector;
        this._popup = document.querySelector(selector)
        this._inputList = this._popup.querySelectorAll('.modal__item');
        this._form = this._popup.querySelector('.modal');
        this._buttonSubmit = this._popup.querySelector('.modal__save-btn');
        this._handleSubmit = handleSubmit;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    _resetModal() {
        this._form.reset();
    }

    _offAutocomplete() {
        this._form.autocomplete = 'off';
    }

    openPopup(data) {
        super.openPopup();
        if (this._selector === '.popup_type_profile') {
            this._inputList[0].value = data.title;
            this._inputList[1].value = data.description;
        }
    }

    closePopup() {
        super.closePopup();
        this._resetModal();
    }

    renderLoading (isLoading, buttonText = 'Сохранить') {
      if (!isLoading) {
        this._buttonSubmit.textContent = buttonText;
      }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading('Сохранение...');
            this._handleSubmit(this._getInputValues())
        });
        this._offAutocomplete();
    }
}
