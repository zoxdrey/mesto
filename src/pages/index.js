import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import "./index.css";
import Api from "../components/Api";
import PopupDelete from "../components/PopupDelete";
import {API_OPTIONS, config} from "../utils/constants";

const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile-info__edit-button");
const buttonEditAvatar = document.querySelector(".profile__overlay");
const inputUserNameSelector = document.querySelector(
    ".popup__form-input_data_user-name"
);
const inputProfessionSelector = document.querySelector(
    ".popup__form-input_data_user-profession"
);
const formProfile = document.querySelector(".popup__form");
const formPlace = document.querySelector(".popup-place__form");
const formAvatar = document.querySelector(".popup-avatar__form");
const cardsContainer = document.querySelector(".photo-cards-list");
const cardTemplate = "#card-template";

const userInfo = new UserInfo({
    profileUserName: ".profile-info__title",
    profileProfession: ".profile-info__subtitle",
    profileAvatar: ".profile__avatar"
});
const apiService = new Api(API_OPTIONS);


const popupWithImage = new PopupWithImage(".image-overlay");
popupWithImage.setEventListeners();


const popupProfile = new PopupWithForm(".profile-popup", (data) =>
    savePopupProfile(data)
);
popupProfile.setEventListeners();
const popupPlace = new PopupWithForm(".popup-place", (data) =>
    handleAddCard(data)
);
popupPlace.setEventListeners();


const popupAvatar = new PopupWithForm(".popup-avatar", (data) =>
    saveAvatar(data)
);
popupAvatar.setEventListeners();

const popupDelete = new PopupDelete(".popup-delete", (data) =>
        deleteCard(data)
    )
;
popupDelete.setEventListeners();

const cardList = new Section(
    {
        renderer: function (cardItem) {
            cardsContainer.append(createNewCard(cardItem));
        }
    },
    ".photo-cards-list"
);


const getAllData = () => {
    apiService.getAllData().then(([userData, cardListData]) => {
        userInfo.setUserInfo(userData);
        cardList.render(cardListData);
    }).catch(err => console.log(err));
}

getAllData();

function createNewCard(cardData) {
    const newCard = new Card(cardData, cardTemplate, openImage, () => popupDelete.open(newCard), () => toggleLike(newCard), userInfo.getUserId());
    return newCard.createCard();
}

const toggleLike = (newCard) => {
    console.log(newCard.getIsLiked())
    if (newCard.getIsLiked()) {
        apiService.removeLike(newCard._cardId).then((data) => {
            newCard.setIsLiked();
            newCard.setLikeCount(data.likes.length)
        }).catch((err) => console.log(err))
    } else {
        apiService.addLike(newCard._cardId).then((data) => {
            newCard.setIsLiked();
            newCard.setLikeCount(data.likes.length)
        }).catch((err) => console.log(err))
    }
}

const handleAddCard = (data) => {
    popupPlace.renderLoading(true);
    const newCardData = {};
    newCardData.name = data["place-name"];
    newCardData.link = data["place-link"];
    console.log(newCardData)
    apiService.createCard(newCardData.name, newCardData.link).then((data) => {
        popupPlace.close();
        cardList.addItem(createNewCard(data));
    }).catch((err) => {
        console.log(err);
    }).finally(() => popupPlace.renderLoading(false))
};

const openProfilePopup = () => {
    formProfileValidator.resetValidation();
    const user = userInfo.getUserInfo();
    inputUserNameSelector.value = user.userName;
    inputProfessionSelector.value = user.userProfession;
    popupProfile.open();
};

const savePopupProfile = () => {
    popupProfile.renderLoading(true);
    apiService.setUserInfo(inputUserNameSelector.value, inputProfessionSelector.value).then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
    }).catch(err => {
        console.log(err)
    }).finally(() => popupPlace.renderLoading(false))
};

const openPlacePopup = () => {
    formPlaceValidator.resetValidation();
    popupPlace.open();
};

function openAvatarPopup() {
    formAvatarValidator.resetValidation();
    popupAvatar.open()
}

function saveAvatar(data) {
    popupAvatar.renderLoading(true);
    apiService.setUserAvatar(data['avatar-link']).then((data) => {
        userInfo.setUserInfo(data);
        popupAvatar.close();
    }).catch((err) => {
        console.log(err)
    }).finally(() => popupPlace.renderLoading(false))
}

function openImage(name, link) {
    popupWithImage.open(name, link);
}

function deleteCard(card) {
    popupDelete.renderLoading(true);
    apiService.deleteCard(card.getCardId()).then(() => {
        card.deleteCard();
        popupDelete.close();
    }).catch((err) => {
            console.log(err)
        }
    ).finally(() => popupPlace.renderLoading(false))
}

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

const formAvatarValidator = new FormValidator(config, formAvatar);
formAvatarValidator.enableValidation();

buttonEdit.addEventListener("click", openProfilePopup);
buttonAdd.addEventListener("click", openPlacePopup);
buttonEditAvatar.addEventListener("click", openAvatarPopup);
