import Popup from "./Popup";
import Api from "./Api";

class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._api = new Api()
    }


    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            _api.deleteCard().then()
        });
        super.setEventListeners()
    }


}

export default PopupDelete;