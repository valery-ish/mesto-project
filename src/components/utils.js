/*Открытие\закрытие попал окна*/

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


popups.forEach((popup) => {
  if (popup.querySelector('.modal'))
  offAutocomplete(popup);
})

function offAutocomplete(popupType) {
  popupType.querySelector('.modal').autocomplete = 'off';
}

/*Функция изменения данных профиля*/
const profileChangeHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitChangeProfile.textContent = 'Сохранение...';
  api.renewProfileInfo(profileTitleValue.value, profileDescriptionValue.value)
    .then((profile) =>{
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonSubmitChangeProfile.textContent = 'Сохранено';
    })
};

/*Функция изменения аватара профиля*/
const profileAvatarChangeHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitChangeAvatar.textContent = 'Сохранение...';
  api.renewProfileAvatar(profileAvatarSrc.value)
    .then((profile) =>{
      profileAvatar.src = profile.avatar;
      closePopup(profileAvatarPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonSubmitChangeAvatar.textContent = 'Сохранено';
    })
};

/*Функция заполнения новой карточки из попап-формы*/
const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  buttonSubmitAddCard.textContent = 'Сохранение...';
  api.postNewCard(cardTitle.value, cardLink.value)
  .then((card) =>{
    cardsSection.prepend(createCard(card, userId));
    closePopup(cardPopup);
    resetInput(cardPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSubmitAddCard.textContent = 'Сохранено';
  })
}

/*Открытие окна формы Редактировать профиль*/
buttonChangeProfile.addEventListener('click', function() {
  openPopup(profilePopup);
  profileTitleValue.value = profileTitle.textContent;
  profileDescriptionValue.value = profileDescription.textContent;
});

/*Открытие окна формы Добавить новое место*/
buttonAddCard.addEventListener('click', function() {
  openPopup(cardPopup);
});

/*Открытие окна формы Изменить аватар*/
buttonProfileAvatar.addEventListener('click', function() {
  openPopup(profileAvatarPopup);
});

/*Событие на изменение профиля и добавление карточки*/
document.querySelector('#card-add').addEventListener('submit', cardSubmitHandler);
document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);
document.querySelector('#profile-avatar').addEventListener('submit', profileAvatarChangeHandler);

