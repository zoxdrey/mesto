const popup = document.querySelector(".popup");
const popupPlace = document.querySelector(".popup-place");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile-info__edit-button");
const closePopupButton = document.querySelector(".popup__close-icon");
const closePopupPlaceButton = document.querySelector(
  ".popup-place__close-icon"
);
const formName = document.querySelector(".popup__form-input_data_user-name");
const profileName = document.querySelector(".profile-info__title");
const formProfession = document.querySelector(
  ".popup__form-input_data_user-profession"
);
const profileProfession = document.querySelector(".profile-info__subtitle");
const popupForm = document.querySelector(".popup__form");
const popupPalceForm = document.querySelector(".popup-place__form");
const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".photo-cards-list");
const popupPlaceCardName = document.querySelector(
  ".popup__form-input_data_place-name"
);
const popupPlaceCardLink = document.querySelector(
  ".popup__form-input_data_place-link"
);
const closeImageButton = document.querySelector(".image-overlay__close-icon");
const overlayFullImage = document.querySelector(".image-overlay");
const imageFull = document.querySelector(".image-overlay__image");
const titleImageFull = document.querySelector(".image-overlay__title");

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
  newCard
    .querySelector(".photo-card__image")
    .addEventListener("click", openImage);
  newCard.querySelector(".photo-card__title").textContent = cardData.name;
  newCard
    .querySelector(".photo-card__like")
    .addEventListener("click", toggleLikeState);

  newCard
    .querySelector(".photo-card__trash")
    .addEventListener("click", deleteCard);
  return newCard;
};

const addCard = (e) => {
  e.preventDefault();
  let newCardData = {};
  newCardData.name = popupPlaceCardName.value;
  newCardData.link = popupPlaceCardLink.value;
  newCardData = cardsContainer.prepend(createCard(newCardData));
  togglePopupPlace();
};

let openPopup = () => {
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
  popup.classList.add("popup_opened");
};

let savePopup = (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closePopup();
};

let closePopup = (e) => {
  popup.classList.remove("popup_opened");
};

const togglePopupPlace = () => {
  popupPlace.classList.toggle("popup-place_opened");
  popupPlaceCardName.value = "";
  popupPlaceCardLink.value = "";
};

const toggleLikeState = (e) => {
  e.target.classList.toggle("photo-card__like_state_active");
};

const deleteCard = (e) => {
  e.target.closest(".photo-card").remove();
};

const closeImage = (e) => {
  e.target.closest(".image-overlay").classList.remove("image-overlay_opened");
};

const openImage = (e) => {
  console.log(overlayFullImage);
  imageFull.src = e.target.src;
  imageFull.alt = e.target.alt;
  titleImageFull.textContent = e.target.alt;
  overlayFullImage.classList.add("image-overlay_opened");
};

renderInitialCards();

editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", savePopup);

popupPalceForm.addEventListener("submit", addCard);
addButton.addEventListener("click", togglePopupPlace);
closePopupPlaceButton.addEventListener("click", togglePopupPlace);
closeImageButton.addEventListener("click", closeImage);
