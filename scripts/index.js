const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit-button");
const closePopupButton = document.querySelector(".popup__close-icon");
const formName = document.querySelector(".popup__form-input_data_user-name");
const profileName = document.querySelector(".profile-info__title");
const formProfession = document.querySelector(
  ".popup__form-input_data_user-profession"
);
const profileProfession = document.querySelector(".profile-info__subtitle");
const popupForm = document.querySelector(".popup__form");
const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".photo-cards-list");

const initialCards = [
  {
    name: "Москва",
    link: "./images/Moscow.jpg",
  },
  {
    name: "Нижний Новгород",
    link: "./images/n_novgorod.jpg",
  },
  {
    name: "Новосибирск",
    link: "./images/novosibirsk.jpg",
  },
  {
    name: "Казань",
    link: "./images/Kazan_Kremlin.jpg",
  },
  {
    name: "Санкт-Петербург",
    link: "./images/st_petersburg.jpg",
  },
  {
    name: "Екатеринбург",
    link: "./images/ekaterinburg.jpg",
  },
];

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
  });
};

const createCard = (cardData) => {
  const newCard = cardTemplate.content
    .querySelector(".photo-card")
    .cloneNode(true);

  newCard.querySelector(".photo-card__image").src = cardData.link;
  newCard.querySelector(".photo-card__image").alt = cardData.name;
  newCard.querySelector(".photo-card__title").textContent = cardData.name;

  return newCard;
};

const openPopup = () => {
  if (!isOpened()) {
    formName.value = profileName.textContent;
    formProfession.value = profileProfession.textContent;
    popup.classList.add("popup_opened");
};

const savePopup = (e) => {
  if (isOpened()) {
    e.preventDefault();
    profileName.textContent = formName.value;
    profileProfession.textContent = formProfession.value;
    closePopup();
};


const closePopup = (e) => {
  if (isOpened()) {
    e.preventDefault();
    popup.classList.remove("popup_opened");
};


const isOpened = () => popup.classList.contains("popup_opened");

editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", savePopup);

renderInitialCards();
