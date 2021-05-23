const popupProfile = document.querySelector(".profile-popup");
const popupPlace = document.querySelector(".popup-place");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile-info__edit-button");
const closePopupButton = popupProfile.querySelector(".popup__close-icon");
const closePopupPlaceButton = document.querySelector(
  ".popup-place__close-icon"
);
const formName = document.querySelector(".popup__form-input_data_user-name");
const profileName = document.querySelector(".profile-info__title");
const formProfession = document.querySelector(
  ".popup__form-input_data_user-profession"
);
const profileProfession = document.querySelector(".profile-info__subtitle");
const profilePopupForm = popupProfile.querySelector(".popup__form");
const popupPlaceForm = document.querySelector(".popup-place__form");
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
const popupOverlays = document.querySelectorAll(".popup");

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
  });
};

const createCard = (cardData) => {
  const newCard = cardTemplate.content
    .querySelector(".photo-card")
    .cloneNode(true);

  const cardImage = newCard.querySelector(".photo-card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", openImage);
  newCard.querySelector(".photo-card__title").textContent = cardData.name;
  newCard
    .querySelector(".photo-card__like")
    .addEventListener("click", toggleLikeState);
  newCard
    .querySelector(".photo-card__trash")
    .addEventListener("click", deleteCard);
  return newCard;
};

const handleAddCard = (e) => {
  e.preventDefault();
  const newCardData = {};
  newCardData.name = popupPlaceCardName.value;
  newCardData.link = popupPlaceCardLink.value;
  cardsContainer.prepend(createCard(newCardData));
  closePlacePopup();
};

const handleOverlayClick = (e) => {
  console.log(e.target);
  closePopup(e.target);
};

const openProfilePopup = () => {
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
  openPopup(popupProfile);
};

const closeProfilePopup = () => {
  closePopup(popupProfile);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc); // почему то keydown не выстреливает, если навешивать его на popup
};

const closePopupOverlay = (e) => {
  e.target.classList.remove("popup_opened");
};

const closePopupByEsc = (e) => {
  if (e.key == "Escape") {
    const popup = document.querySelector(".popup_opened");
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByEsc);
  }
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

const savePopup = (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closePopup(popupProfile);
};

const openPlacePopup = () => {
  resetValidation(popupPlaceForm);
  openPopup(popupPlace);
  popupPlaceCardName.value = "";
  popupPlaceCardLink.value = "";
};

const closePlacePopup = () => {
  closePopup(popupPlace);
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
  closePopup(overlayFullImage);
};

const openImage = (e) => {
  imageFull.src = e.target.src;
  imageFull.alt = e.target.alt;
  titleImageFull.textContent = e.target.alt;
  openPopup(overlayFullImage);
};

renderInitialCards();

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

popupOverlays.forEach((popupOverlay) =>
  popupOverlay.addEventListener("click", handleOverlayClick)
);
editButton.addEventListener("click", openProfilePopup);
closePopupButton.addEventListener("click", closeProfilePopup);
profilePopupForm.addEventListener("submit", savePopup);

popupPlaceForm.addEventListener("submit", handleAddCard);
addButton.addEventListener("click", openPlacePopup);
closePopupPlaceButton.addEventListener("click", closePlacePopup);
closeImageButton.addEventListener("click", closeImage);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-button",
  inactiveButtonClass: "popup__form-submit-button_state_disabled",
  inputErrorClass: "popup__form-input_error_active",
  errorClass: "popup__form-error_active",
});
