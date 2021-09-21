/*Функция создания новой карточки*/
const cardTemplate = document.querySelector('.card_template').content;
const cardsSection = document.querySelector('.cards');

function createCard (cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__btn').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openImageCard);
  return cardElement;
}

/*Создание стартовых карточек при загрузки страницы*/
initialCards.forEach ((element) => {
  cardsSection.append(createCard(element));
});

const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_card-add');
const imagePopup = document.querySelector('.popup_type_picture');

/*Открытие\закрытие попал окна*/

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  popupType.classList.remove('popup_hide');
}

function closePopup(popupType) {
  popupType.classList.add('popup_hide');
  popupType.classList.remove('popup_opened');
}

/*Событие на кнопку закрытия попап окна (формы и картинки)*/
const closePopupButton = document.querySelectorAll('.popup__close-btn');
closePopupButton.forEach(element => element.addEventListener('click', () => closePopup(element.closest('.popup'))));

/*Функция изменения данных профиля*/
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function profileChangeHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = document.querySelector('#profile__title').value;
  profileDescription.textContent = document.querySelector('#profile__description').value;
  closePopup(profilePopup);
};
document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);

/*Открытие окна формы Редактировать профиль*/
const buttonChangeProfile = document.querySelector('.profile__btn-change');

buttonChangeProfile.addEventListener('click', function() {
  openPopup(profilePopup);

  document.querySelector('#profile__title').value = profileTitle.textContent;
  document.querySelector('#profile__description').value = profileDescription.textContent;
});

/*Открытие окна формы Добавить новое место*/
const buttonAddCard = document.querySelector('.profile__btn-add');

buttonAddCard.addEventListener('click', function() {
  openPopup(cardPopup);
});

/*Функция заполнения новой карточки из попап-формы*/
function cardSubmitHandler(evt) {
  evt.preventDefault();
  const popup = document.querySelector('.popup_type_card-add');
  const newCard = [];
  newCard.name = popup.querySelector('#card__title').value;
  newCard.link = popup.querySelector('#card__link').value;
  cardsSection.prepend(createCard(newCard));
  popup.querySelector('#card-add').reset();
  closePopup(cardPopup);
}

document.querySelector('#card-add').addEventListener('submit', cardSubmitHandler);

/*Функция лайк*/
function likeCard() {
  this.classList.toggle('card__btn_active');
}

/*Кнопка удалить карточку*/
function deleteCard() {
    this.closest('.card').remove();
}

/*Функция открытия картинки карточки в попап окно на весь экран*/

function openImageCard(evt) {
  openPopup(imagePopup);
  const popupImage = document.querySelector('.popup_type_picture');

  popupImage.querySelector('.modal__image').src = evt.target.src;
  popupImage.querySelector('.modal__image').alt = evt.target.alt;
  popupImage.querySelector('.modal__figcaption').textContent = evt.target.alt;
}
