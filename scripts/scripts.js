/*Открытие\закрытие попал окна*/
const popup = document.querySelector('.popup');

function openPopup() {
  popup.classList.add('popup_opened');
  if(popup.classList.contains('popup_hide'))
  popup.classList.remove('popup_hide');
}

function closePopup() {
  popup.classList.add('popup_hide');
  popup.classList.remove('popup_opened');
  if (popup.classList.contains('popup_dark')) {
    popup.classList.remove('popup_dark');
  }
  popup.querySelector('.popup__container').removeChild(popup.querySelector('.popup__element'));
}

/*Создание окна формы Редактировать профить из заготовки*/
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonChangeProfile = document.querySelector('.profile__btn-change');

const popupTemplateForm = document.querySelector('.popup__template-form').content;

buttonChangeProfile.addEventListener('click', function() {
  openPopup();

  const popupElement = popupTemplateForm.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = "Редактировать профиль";
  const popupForm = popupElement.querySelector('.popup__form');
  popupForm.name = "profile-change";
  popupForm.children[1].value = profileTitle.textContent;
  popupForm.children[1].id = "profile__title";
  popupForm.children[1].name = "profile__title";
  popupForm.children[2].value = profileDescription.textContent;
  popupForm.children[2].id = "profile__description";
  popupForm.children[2].name = "profile__description";
  popupElement.querySelector('.popup__save-btn').id = "profile__change";
  popupElement.querySelector('.popup__save-btn').textContent = "Сохранить";

  popup.querySelector('.popup__container').append(popupElement);

  popup.querySelector('.popup__form').addEventListener("submit", formSubmitHandler);
});

/*Создание окна формы добавить новое место из заготовки*/
const buttonAddCard = document.querySelector('.profile__btn-add');

buttonAddCard.addEventListener('click', function() {
  openPopup();
  const popupElement = popupTemplateForm.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = "Новое место";
  const popupForm = popupElement.querySelector('.popup__form');
  popupForm.name = "card-add";
  popupForm.children[1].placeholder = "Название";
  popupForm.children[1].id = "card__title";
  popupForm.children[1].name = "card__title";
  popupForm.children[2].placeholder = "Ссылка на картинку";
  popupForm.children[2].id = "card__link";
  popupForm.children[2].name = "card__link";
  popupElement.querySelector('.popup__save-btn').id = "card-add";
  popupElement.querySelector('.popup__save-btn').textContent = "Создать";

  popup.querySelector('.popup__container').append(popupElement);

  popup.querySelector('.popup__form').addEventListener("submit", cardSubmitHandler);
});

/*Событие на кнопку закрытия попап окна (формы и картинки)*/
const closePopupButton = document.querySelector('.popup__close-btn');
closePopupButton.addEventListener('click', closePopup);

/*Функция изменения данных профиля*/
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = popup.querySelector('#profile__title').value;
  profileDescription.textContent = popup.querySelector('#profile__description').value;
  closePopup();
};

/*Функция добавления новой карточки с новым местом*/
function cardSubmitHandler (evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = popup.querySelector('#card__title').value;
  cardElement.querySelector('.card__image').src = popup.querySelector('#card__link').value;
  cardElement.querySelector('.card__image').alt = popup.querySelector('#card__title').value;
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__btn').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openImageCard);
  cardsSection.prepend(cardElement);
  closePopup();
}

/*Массив стартовых карточек*/
const initialCards = [
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1504615458222-979e04d69a27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1355&q=80'
  },
  {
    name: 'Магадан',
    link: 'https://images.unsplash.com/photo-1471609830806-bf4bc7f6ff02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Республика Алтай',
    link: 'https://images.unsplash.com/photo-1589122758779-0df750e72d2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1484&q=80'
  },
  {
    name: 'Кижи',
    link: 'https://images.unsplash.com/photo-1615529610458-1801dfce0a6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1401&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588353-e1011c0269ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=635&q=80'
  }
  ];

/*Создание стартовых карточек при загрузки страницы*/
const cardTemplate = document.querySelector('.card_template').content;
const cardsSection = document.querySelector('.cards');

initialCards.forEach (function(element) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__btn').addEventListener('click', likeCard);
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', openImageCard);

  cardsSection.append(cardElement);
});

/*Функция лайк*/
function likeCard() {
  this.classList.toggle('card__btn_active');
}

/*Кнопка удалить карточку*/
function deleteCard() {
    let currentCard = this.parentNode;
    currentCard.parentNode.removeChild(currentCard);
}

/*Функция открытия картинки карточки в попап окно на весь экран*/

function openImageCard(evt) {
  openPopup();
  popup.classList.add('popup_dark');
  const figureTemplate = document.querySelector('.popup__template-image').content;
  const figureElement = figureTemplate.cloneNode(true);

  figureElement.querySelector('.popup__image').src = evt.target.src;
  figureElement.querySelector('.popup__image').alt = evt.target.alt;
  figureElement.querySelector('.popup__figcaption').textContent = evt.target.parentElement.querySelector('.card__title').textContent;

  popup.querySelector('.popup__container').append(figureElement);
}
