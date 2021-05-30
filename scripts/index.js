import Card from "./Card.js";
import { initialCards } from "./initial-cards.js";
import FormValidator from "./FormValidator.js";

const popupProfile = document.querySelector(".profile-popup");
const popupPlace = document.querySelector(".popup-place");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile-info__edit-button");
const buttonCloseProfilePopup =
  popupProfile.querySelector(".popup__close-icon");
const buttonClosePopupPlace = document.querySelector(
  ".popup-place__close-icon"
);
const inputUserName = document.querySelector(
  ".popup__form-input_data_user-name"
);
const profileFormTitle = document.querySelector(".profile-info__title");
const inputProfession = document.querySelector(
  ".popup__form-input_data_user-profession"
);
const profileProfession = document.querySelector(".profile-info__subtitle");
const formProfile = popupProfile.querySelector(".popup__form");
const formPlace = document.querySelector(".popup-place__form");
const cardsContainer = document.querySelector(".photo-cards-list");
const inputNameFormPlace = document.querySelector(
  ".popup__form-input_data_place-name"
);
const inputLinkFormPlace = document.querySelector(
  ".popup__form-input_data_place-link"
);
const buttonCloseImage = document.querySelector(".image-overlay__close-icon");
const overlayFullImage = document.querySelector(".image-overlay");
const imageFull = document.querySelector(".image-overlay__image");
const titleImageFull = document.querySelector(".image-overlay__title");
const popupOverlays = document.querySelectorAll(".popup");
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-button",
  inactiveButtonClass: "popup__form-submit-button_state_disabled",
  inputErrorClass: "popup__form-input_error_active",
  errorClass: "popup__form-error_active",
};

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    const newCard = new Card(item, "#card-template", openImage);
    cardsContainer.append(newCard.createCard());
  });
};

const handleAddCard = (e) => {
  e.preventDefault();
  const newCardData = {};
  newCardData.name = inputNameFormPlace.value;
  newCardData.link = inputLinkFormPlace.value;
  cardsContainer.prepend(createCard(newCardData));
  closePlacePopup();
};

const handleOverlayClick = (e) => {
  closePopup(e.target);
};

const openProfilePopup = () => {
  inputUserName.value = profileFormTitle.textContent;
  inputProfession.value = profileProfession.textContent;
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
  profileFormTitle.textContent = inputUserName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfile);
};

const openPlacePopup = () => {
  resetValidation(formPlace);
  openPopup(popupPlace);
  inputNameFormPlace.value = "";
  inputLinkFormPlace.value = "";
};

const closePlacePopup = () => {
  closePopup(popupPlace);
  inputNameFormPlace.value = "";
  inputLinkFormPlace.value = "";
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

const resetValidation = (form) => {
  const formInputs = form.querySelectorAll(".popup__form-input");
  const formSpans = form.querySelectorAll(".popup__form-error");
  const formPlaceBtnSubmit = form.querySelector(
    ".popup-place__form-submit-button"
  );
  formInputs.forEach((input) => {
    input.classList.remove(".popup__form-input_error_active");
  });
  formSpans.forEach((input) => {
    input.classList.remove(".popup__form-error_active");
  });
  formPlaceBtnSubmit.classList.add("popup__form-submit-button_state_disabled");
  formPlaceBtnSubmit.disabled = true;
};

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

popupOverlays.forEach((popupOverlay) =>
  popupOverlay.addEventListener("click", handleOverlayClick)
);
buttonEdit.addEventListener("click", openProfilePopup);
buttonCloseProfilePopup.addEventListener("click", closeProfilePopup);
formProfile.addEventListener("submit", savePopup);

formPlace.addEventListener("submit", handleAddCard);
buttonAdd.addEventListener("click", openPlacePopup);
buttonClosePopupPlace.addEventListener("click", closePlacePopup);
buttonCloseImage.addEventListener("click", closeImage);
