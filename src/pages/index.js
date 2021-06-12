import { initialCards } from "../components/Initial-cards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import "./index.css";

const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile-info__edit-button");
const inputUserNameSelector = document.querySelector(
  ".popup__form-input_data_user-name"
);
const inputProfessionSelector = document.querySelector(
  ".popup__form-input_data_user-profession"
);
const formProfile = document.querySelector(".popup__form");
const formPlace = document.querySelector(".popup-place__form");
const cardsContainer = document.querySelector(".photo-cards-list");
const popupOverlays = document.querySelectorAll(".popup");
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-button",
  inactiveButtonClass: "popup__form-submit-button_state_disabled",
  inputErrorClass: "popup__form-input_error_active",
  errorClass: "popup__form-error_active",
  formErrorClass: ".popup__form-error",
};
const cardTemplate = "#card-template";

const userInfo = new UserInfo({
  profileUserName: ".profile-info__title",
  profileProfession: ".profile-info__subtitle",
});

const popupWithImage = new PopupWithImage(".image-overlay");
popupWithImage.setEventListeners();

const popupProfile = new PopupWithForm(".profile-popup", (data) =>
  savePopup(data)
);
popupProfile.setEventListeners();
const popupPlace = new PopupWithForm(".popup-place", (data) =>
  handleAddCard(data)
);
popupPlace.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = new Card(cardItem, cardTemplate, openImage);
      cardsContainer.append(newCard.createCard());
    },
  },
  ".photo-cards-list"
);
cardList.render();

const createNewCard = (cardData) => {
  const newCard = new Card(cardData, cardTemplate, openImage);
  return newCard.createCard();
};

const handleAddCard = (data) => {
  const newCardData = {};
  newCardData.name = data["place-name"];
  newCardData.link = data["place-link"];
  cardList.addItem(createNewCard(newCardData));
  popupPlace.close();
};

const handleOverlayClick = (e) => {
  if (e.target.classList.contains("popup")) {
    popupWithImage.close();
    popupProfile.close();
    popupPlace.close();
  }
};

const openProfilePopup = () => {
  formProfileValidator.resetValidation();
  const user = userInfo.getUserInfo();
  inputUserNameSelector.value = user.userName;
  inputProfessionSelector.value = user.userProfession;
  popupProfile.open();
};

const savePopup = (data) => {
  userInfo.setUserInfo({
    userName: inputUserNameSelector.value,
    userProfession: inputProfessionSelector.value,
  });
  popupProfile.close();
};

const openPlacePopup = () => {
  formPlaceValidator.resetValidation();
  popupPlace.open();
};

function openImage(e) {
  popupWithImage.open(e);
}

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

popupOverlays.forEach((popupOverlay) =>
  popupOverlay.addEventListener("click", handleOverlayClick)
);

buttonEdit.addEventListener("click", openProfilePopup);
buttonAdd.addEventListener("click", openPlacePopup);
