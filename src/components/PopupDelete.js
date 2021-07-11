import Popup from "./Popup";

class PopupDelete extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupSubmitBtnTitle = this._popup.querySelector('.popup__form-submit-button');
        this._form = this._popup.querySelector(".popup__form");
        this._card = null;
    }


    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._formSubmitHandler(this._card);
        });
        super.setEventListeners()
    }

    open(card) {
        this._card = card;
        super.open();
    }

    renderLoading(isLoading) {
        return isLoading ? this._popupSubmitBtnTitle.textContent = 'Удаление...' : this._popupSubmitBtnTitle.textContent = 'Да'
    }

}

export default PopupDelete;