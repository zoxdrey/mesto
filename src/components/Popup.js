class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupSubmitBtnTitle = this._popup.querySelector('.popup__form-submit-button');
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        const closeIcon = this._popup.querySelector(".popup__close-icon");
        closeIcon.addEventListener("click", this.close);
        this._popup.addEventListener("click", this._handleOverlayClick);
    }

    _handleOverlayClick = (e) => {
        if (e.target.classList.contains("popup")) {
            this.close();
        }
    };

    renderLoading(isLoading) {
        return isLoading ? this._popupSubmitBtnTitle.textContent = 'Сохранение...' : this._popupSubmitBtnTitle.textContent = 'Сохранение'
    }
}

export default Popup;
