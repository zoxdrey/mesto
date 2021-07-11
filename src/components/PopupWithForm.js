import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupSubmitBtnTitle = this._popup.querySelector('.popup__form-submit-button');
        this._form = this._popup.querySelector(".popup__form");
        this._inputArr = this._popup.querySelectorAll(".popup__form-input");
    }

    _getInputValues() {
        return Array.from(this._inputArr).reduce(
            (acc, cur) => ({...acc, [cur.name]: cur.value}),
            {}
        );
    }

    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            const _data = this._getInputValues();
            this._formSubmitHandler(_data);
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(isLoading) {
        return isLoading ? this._popupSubmitBtnTitle.textContent = 'Сохранение...' : this._popupSubmitBtnTitle.textContent = 'Сохранение'
    }
}

export default PopupWithForm;
