import {
  profileTitle,
  profileDescription,
  profileTitleValue,
  profileDescriptionValue,
  buttonSubmitChangeProfile,
  buttonSubmitChangeAvatar,
  profileAvatar,
  profileAvatarSrc,
  buttonSubmitAddCard,
  cardTitle,
  cardLink
} from './constants.js';
import {api} from './api.js';

export default class Popup {
  constructor(selector) {
    this.selector = selector;
  }

  openPopup() {
    this.selector.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  closePopup() {
    this.selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
  }

  _handleEscClose (event) {
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

export default class PopupWithImage extends Popup {
  constructor(selector, imageModal, imageFigcaption) {
    super(selector);
    this.imageModal = imageModal;
    this.imageFigcaption = imageFigcaption;
  }

  openPopup(evt) {
    super.openPopup();
    const currentImageModal = this.selector.querySelector(this.imageModal);
    const currentIimageFigcaption = this.selector.querySelector(this.imageFigcaption)
    currentImageModal.src = evt.target.src;
    currentImageModal.alt = evt.target.alt;
    currentIimageFigcaption.textContent = evt.target.alt;
  }
}

export default class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);
  }

    getInputValues() {
      profileTitleValue.value = profileTitle.textContent;
      profileDescriptionValue.value = profileDescription.textContent;
    }

    setEventListeners() {
      super.setEventListeners();
      this.selector.addEventListener('submit', () => {
        // this.renderer
      });
    }

    closePopup() {
      this._getInputValues();
      super.closePopup();
      this._resetModal();
    }

    _resetModal() {
      this.selector.querySelector('.modal').reset();
    }

    offAutocomplete() {
      this.selector.querySelector('.modal').autocomplete = 'off';
    }

    profileChangeHandler(evt) {
      evt.preventDefault();
      buttonSubmitChangeProfile.textContent = 'Сохранение...';
      api.renewProfileInfo(profileTitleValue.value, profileDescriptionValue.value)
        .then((profile) =>{
          profileTitle.textContent = profile.name;
          profileDescription.textContent = profile.about;
          this.closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          buttonSubmitChangeProfile.textContent = 'Сохранено';
        })
    };

    profileAvatarChangeHandler(evt) {
      evt.preventDefault();
      buttonSubmitChangeAvatar.textContent = 'Сохранение...';
      api.renewProfileAvatar(profileAvatarSrc.value)
        .then((profile) =>{
          profileAvatar.src = profile.avatar;
          this.closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          buttonSubmitChangeAvatar.textContent = 'Сохранено';
        })
    };

    cardSubmitHandler (evt) {
      evt.preventDefault();
      buttonSubmitAddCard.textContent = 'Сохранение...';
      api.postNewCard(cardTitle.value, cardLink.value)
      .then((card) =>{
        // cardsSection.prepend(createCard(card, userId));
        this.closePopup();
        this._resetModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonSubmitAddCard.textContent = 'Сохранено';
      })
    }
}

/*Событие на изменение профиля и добавление карточки*/
// document.querySelector('#card-add').addEventListener('submit', cardSubmitHandler);
// document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);
// document.querySelector('#profile-avatar').addEventListener('submit', profileAvatarChangeHandler);
