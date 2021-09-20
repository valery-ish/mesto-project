/*Функция создания новой карточки*/
const cardTemplate = document.querySelector('.card_template').content;
const cardsSection = document.querySelector('.cards');

function createCard (title, link, imageAlt) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = imageAlt;
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__btn').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openImageCard);
  cardsSection.prepend(cardElement);
}

/*Создание стартовых карточек при загрузки страницы*/
initialCards.forEach ((element) => {
  createCard (element.name, element.link, element.name);
});

/*Открытие\закрытие попал окна*/

function openPopup(popupClass) {
  let currentPopup = document.querySelector(popupClass);
  currentPopup.classList.add('popup_opened');
  currentPopup.classList.remove('popup_hide');
}

function closePopup() {
  const popup = document.querySelectorAll('.popup');
  for (let i=0; i<popup.length; i++) {
    popup[i].classList.add('popup_hide');
    popup[i].classList.remove('popup_opened');
    popup[i].classList.remove('popup_dark');
  }
}

/*Событие на кнопку закрытия попап окна (формы и картинки)*/
const closePopupButton = document.querySelectorAll('.popup__close-btn');
for (let i=0; i<closePopupButton.length; i++) {
  closePopupButton[i].addEventListener('click', closePopup);
}

/*Функция изменения данных профиля*/
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function profileChangeHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = document.querySelector('#profile__title').value;
  profileDescription.textContent = document.querySelector('#profile__description').value;
  closePopup();
};
document.querySelector('#profile-change').addEventListener('submit', profileChangeHandler);

/*Открытие окна формы Редактировать профиль*/
const buttonChangeProfile = document.querySelector('.profile__btn-change');

buttonChangeProfile.addEventListener('click', function() {
  openPopup('.popup_type_profile');

  document.querySelector('#profile-change').style.display = 'flex';
  document.querySelector('#profile__title').value = profileTitle.textContent;
  document.querySelector('#profile__description').value = profileDescription.textContent;
});

/*Открытие окна формы Добавить новое место*/
const buttonAddCard = document.querySelector('.profile__btn-add');

buttonAddCard.addEventListener('click', function() {
  openPopup('.popup_type_card-add');
});

/*Функция заполнения новой карточки из попап-формы*/
function cardSubmitHandler(evt) {
  evt.preventDefault();
  const popup = document.querySelector('.popup_type_card-add');
  const titleValue = popup.querySelector('#card__title');
  const linkValue = popup.querySelector('#card__link');
  const imageAltValue = popup.querySelector('#card__title');
  createCard (titleValue.value, linkValue.value, imageAltValue.value);
  titleValue.value = '';
  linkValue.value = '';
  imageAltValue.value = '';
  closePopup();
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
  openPopup('.popup_type_picture');
  const popupImage = document.querySelector('.popup_type_picture');
  popupImage.classList.add('popup_dark');

  popupImage.querySelector('.modal__image').src = evt.target.src;
  popupImage.querySelector('.modal__image').alt = evt.target.alt;
  popupImage.querySelector('.modal__figcaption').textContent = evt.target.alt;
}
