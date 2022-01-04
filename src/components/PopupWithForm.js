import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
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
