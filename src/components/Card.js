import PopupDelete from "./PopupDelete";
import {userId} from "../utils/constants";

class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._likes = cardData.likes;
        this._ownerId = cardData.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        console.log(this._id);
    }

    createCard = () => {
        const cardTemplate = document.querySelector(this._cardSelector);
        const newCard = cardTemplate.content
            .querySelector(".photo-card")
            .cloneNode(true);
        const cardTrashIcon = newCard.querySelector(".photo-card__trash");
        if (this._isTrashIconShow()) cardTrashIcon.classList.add('photo-card__trash_visible');
        const cardImage = newCard.querySelector(".photo-card__image");
        this._fillCardImage(cardImage);
        newCard.querySelector(".photo-card__title").textContent = this._name;
        newCard.querySelector(".photo-card__like-count").textContent = this._likes.length;
        this._addEventListeners(newCard);
        return newCard;
    };

    _isTrashIconShow() {
        return this._ownerId === userId;
    }

    _fillCardImage = (cardImage) => {
        cardImage.src = this._link;
        cardImage.alt = this._name;
    };

    _addEventListeners = (card) => {
        card
            .querySelector(".photo-card__like-icon")
            .addEventListener("click", this._toggleLikeState);
        card
            .querySelector(".photo-card__trash")
            .addEventListener("click", this._deleteCard);
        card
            .querySelector(".photo-card__image")
            .addEventListener("click", () =>
                this._handleCardClick(this._name, this._link)
            );
    };

    _toggleLikeState = (e) => {
        e.target.classList.toggle("photo-card__like-icon_state_active");
    };

    _deleteCard = (e) => {
        const pop = new PopupDelete('.popup-delete');
        pop.setEventListeners();
        pop.open();
    };
}

export default Card;
