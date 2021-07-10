import Popup from "./Popup";

class PopupAvatar extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
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
}

export default PopupAvatar;