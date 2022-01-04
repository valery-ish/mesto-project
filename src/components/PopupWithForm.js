import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit, inputSelector, formSelector, submitButtonSelector }) {
      super(popupSelector);
      this._inputList = this.selector.querySelectorAll(inputSelector);
      this._modal = this.selector.querySelector(formSelector);
      this._buttonSubmit = this.selector.querySelector(submitButtonSelector);
      this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  _resetModal() {
    this._modal.reset();
  }

  _offAutocomplete() {
    this._modal.autocomplete = 'off';
  }

  closePopup() {
    super.closePopup();
    this._resetModal();
  }

  handleResultBtnState() {
    this._buttonSubmit.textContent = 'Сохранено';
  }

  setEventListeners() {
      super.setEventListeners();
      this.selector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.selector.querySelector(buttonSubmit).textContent = 'Сохранение...';
          this._handleSubmit(evt)
      });
      this._offAutocomplete();
      this._getInputValues();
  }
}
