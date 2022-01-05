import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit}) {
      super(popupSelector);
      this._inputList = this.selector.querySelectorAll('.modal__item');
      this._modal = this.selector.querySelector('.modal');
      this._buttonSubmit = this.selector.querySelector('.modal__save-btn');
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
          this._buttonSubmit.textContent = 'Сохранение...';
          this._handleSubmit(this._getInputValues())
      });
      this._offAutocomplete();
  }
}
