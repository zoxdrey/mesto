import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFull = this._popup.querySelector(".image-overlay__image");
    this._titleImageFull = this._popup.querySelector(".image-overlay__title");
  }
  open(name, link) {
    this._imageFull.src = link;
    this._titleImageFull.textContent = name;
    super.open();
  }
}
export default PopupWithImage;
