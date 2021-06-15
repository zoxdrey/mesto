class FormValidator {
  constructor(config, formElem) {
    this._config = config;
    this._formElem = formElem;
    this._inputs = Array.from(
      this._formElem.querySelectorAll(this._config.inputSelector)
    );
    this._btn = this._formElem.querySelector(this._config.submitButtonSelector);
    this._hideInputError = this._hideInputError.bind(this);
  }

  enableValidation = () => {
    this._setEventListeners(this._config);
  };

  _hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((input) => !input.validity.valid);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputs)) {
      this._btn.classList.add(this._config.inactiveButtonClass);
      this._btn.disabled = true;
    } else {
      this._btn.classList.remove(this._config.inactiveButtonClass);
      this._btn.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isInputValid(input);

        this._toggleButtonState();
      });
    });
  };

  _showInputError = (element) => {
    const errorElement = this._formElem.querySelector(`.${element.id}-error`);
    errorElement.textContent = element.validationMessage;
    element.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (element) => {
    const errorElement = this._formElem.querySelector(`.${element.id}-error`);
    element.classList.remove(this._config.inputErrorClass);
    if(errorElement){
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";}
  };

  _isInputValid = (formInput) => {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  };

  resetValidation = () => {
    const formInputs = this._formElem.querySelectorAll(
      this._config.inputSelector
    );
    const formSpans = this._formElem.querySelectorAll(
      this._config.formErrorClass
    );
    const formPlaceBtnSubmit = this._formElem.querySelector(
      this._config.submitButtonSelector
    );
    formInputs.forEach((input) => this._hideInputError(input));
    formSpans.forEach((spanEl) => {
      this._hideInputError(spanEl)
    });
    this._toggleButtonState();
  };
}

export default FormValidator;
