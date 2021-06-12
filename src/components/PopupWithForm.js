import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector(".popup__form");
  }
  _getInputValues() {
    const inputArr = this._popup.querySelectorAll(".popup__form-input");
    return Array.from(inputArr).reduce(
      (acc, cur) => ({ ...acc, [cur.name]: cur.value }),
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
export default PopupWithForm;
