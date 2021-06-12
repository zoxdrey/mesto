import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(evt) {
    const imageFull = this._popup.querySelector(".image-overlay__image");
    const titleImageFull = this._popup.querySelector(".image-overlay__title");
    imageFull.src = evt.target.src;
    imageFull.alt = evt.target.alt;
    titleImageFull.textContent = evt.target.alt;
    super.open();
  }
}
export default PopupWithImage;
