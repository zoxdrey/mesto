class Card {
  constructor(cardData, cardSelector, cardOpenHandler) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardSelector = cardSelector;
    this._cardOpenHandler = cardOpenHandler;
  }

  createCard = () => {
    const cardTemplate = document.querySelector("#card-template");
    const newCard = cardTemplate.content
      .querySelector(".photo-card")
      .cloneNode(true);

    const cardImage = newCard.querySelector(".photo-card__image");
    this._fillCardImage(cardImage);
    newCard.querySelector(".photo-card__title").textContent = this._name;
    this._addEventListeners(newCard);
    return newCard;
  };

  _fillCardImage = (cardImage) => {
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImage.addEventListener("click", this._cardOpenHandler);
  };

  _addEventListeners = (card) => {
    card
      .querySelector(".photo-card__like")
      .addEventListener("click", this._toggleLikeState);
    card
      .querySelector(".photo-card__trash")
      .addEventListener("click", this._deleteCard);
  };

  _toggleLikeState = (e) => {
    e.target.classList.toggle("photo-card__like_state_active");
  };

  _deleteCard = (e) => {
    e.target.closest(".photo-card").remove();
  };
}

export default Card;
