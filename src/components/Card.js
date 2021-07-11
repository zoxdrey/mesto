class Card {
    constructor(cardData, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._likes = cardData.likes;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._cardTemplate = document.querySelector(this._cardSelector);
        this._card = this._cardTemplate.content
            .querySelector(".photo-card")
            .cloneNode(true);
        this._likeBtn = this._card.querySelector('.photo-card__like-icon');
        this._isLiked = this._likes.some(item => item._id === userId);
        this._userId = userId;
    }

    createCard = () => {


        const cardTrashIcon = this._card.querySelector(".photo-card__trash");
        if (this._isTrashIconShow()) cardTrashIcon.classList.add('photo-card__trash_visible');
        const cardImage = this._card.querySelector(".photo-card__image");
        this._fillCardImage(cardImage);
        this._card.querySelector(".photo-card__title").textContent = this._name;
        this._card.querySelector(".photo-card__like-count").textContent = this._likes.length;
        this._addEventListeners(this._card);
        this._renderInitialLike();
        return this._card;
    };

    _isTrashIconShow() {
        return this._ownerId === this._userId;
    }

    _fillCardImage = (cardImage) => {
        cardImage.src = this._link;
        cardImage.alt = this._name;
    };

    _addEventListeners = (card) => {
        card
            .querySelector(".photo-card__like-icon")
            .addEventListener("click", (e) => {
                this._toggleLikeState();
                this._handleLikeClick(this);
            });
        card
            .querySelector(".photo-card__trash")
            .addEventListener("click", () => this._handleDeleteClick(this));
        card
            .querySelector(".photo-card__image")
            .addEventListener("click", () =>
                this._handleCardClick(this._name, this._link)
            );
    };

    _toggleLikeState = () => {
        this._likeBtn.classList.toggle('photo-card__like-icon_state_active')
    }

    deleteCard = () => {
        this._card.remove();
    }

    getCardId = () => this._cardId;

    getIsLiked = () => this._isLiked;

    setIsLiked = () => this._isLiked = !this._isLiked;

    setLikeCount = (likeCount) => {
        this._card.querySelector(".photo-card__like-count").textContent = likeCount;
    }

    _renderInitialLike = () => {
        if (this._isLiked) this._likeBtn.classList.add('photo-card__like-icon_state_active')
    }
}

export default Card;
