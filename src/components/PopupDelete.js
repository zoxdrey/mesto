import Popup from "./Popup";

class PopupDelete extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector(".popup__form");
        this._cardId = null;
    }


    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._formSubmitHandler(this._cardId);
        });
        super.setEventListeners()
    }

    open(cardId) {
        this._cardId = cardId;
        super.open();
    }

    renderLoading(isLoading) {
        return isLoading ? this._popupSubmitBtnTitle.textContent = 'Удаление...' : this._popupSubmitBtnTitle.textContent = 'Да'
    }

}

export default PopupDelete;