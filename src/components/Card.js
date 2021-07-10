import {API_OPTIONS, userId} from "../utils/constants";
import Api from "./Api";

class Card {
    constructor(cardData, cardSelector, handleCardClick, handleDeleteClick) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._likes = cardData.likes;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._apiService = new Api(API_OPTIONS);
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
            .addEventListener("click", (e) => {
                this._toggleLikeState(e)
            });
        card
            .querySelector(".photo-card__trash")
            .addEventListener("click", () => this._handleDeleteClick(this._cardId));
        card
            .querySelector(".photo-card__image")
            .addEventListener("click", () =>
                this._handleCardClick(this._name, this._link)
            );
    };

    _toggleLikeState = (e) => {
        if (e.target.classList.contains('photo-card__like-icon_state_active')) {
            this._apiService.removeLike(this._cardId).then((data) => {
                    this._likes = data.likes.length;
                    e.target.classList.toggle("photo-card__like-icon_state_active");
                    e.target.parentElement.querySelector(".photo-card__like-count").textContent = this._likes;
                }
            ).catch(err => console.log(err))
        } else {
            this._apiService.addLike(this._cardId).then((data) => {
                    this._likes = data.likes.length;
                    e.target.classList.toggle("photo-card__like-icon_state_active")
                    e.target.parentElement.querySelector(".photo-card__like-count").textContent = this._likes;
                }
            ).catch(err => console.log(err))
        }
    };

}

export default Card;
