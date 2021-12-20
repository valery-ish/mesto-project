/*Открытие\закрытие попал окна*/

export default class Popup {
  constructor(selector) {
    this.selector = selector;
  }

  openPopup() {
    this.selector.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscKeydown);
  }

  closePopup() {
    this.selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', _closePopupEscKeydown);
  }

  _closePopupEscKeydown (event) {
    if(event.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    }
  }

  setEventListeners() {
    this.selector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
        closePopup()
      }
    })
  }
}

export default class PopupWithForm extends Popup {
  constructor(selector, renderer) {
    super(selector);
    this.renderer = function() {
      const newCard = new Api({
        baseURL: 'https://nomoreparties.co/v1/plus-cohort-4',
        headers: {
          authorization: 'eecc904e-92e4-4ede-8c36-0f8f370ca546',
          'Content-Type': 'application/json'
        }
      });
      newCard.postNewCard()
    }
  }

    _getInputValues() {

    }

    setEventListeners() {
      super.setEventListeners();
      this.selector.addEventListener('submit', (evt) => {
        if (evt.target.classList.contains('modal')){
          // сабмит карточки.. разные функции
        }
      });
    }

    closePopup() {
      super.closePopup();
      this.selector.querySelector('.modal').reset();
    }
}

