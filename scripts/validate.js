const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  const formArr = Array.from(forms);

  formArr.forEach((form) => {
    setEventListeners(form, rest);
  });
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

const toggleButtonState = (btn, inputs, disableBtnClass) => {
  if (hasInvalidInput(inputs)) {
    btn.classList.add(disableBtnClass);
    btn.disabled = true;
  } else {
    btn.classList.remove(disableBtnClass);
    btn.disabled = false;
  }
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) => {
  const inputs = form.querySelectorAll(inputSelector);
  const inputArr = Array.from(inputs);
  const btn = form.querySelector(submitButtonSelector);

  toggleButtonState(btn, inputArr, inactiveButtonClass);

  inputArr.forEach((input) => {
    input.addEventListener("input", () => {
      isInputValid(input, form, rest);

      toggleButtonState(btn, inputArr, inactiveButtonClass);
    });
  });
};

const showInputError = (element, form, inputErrorClass, rest) => {
  const errorElement = form.querySelector(`.${element.id}-error`);
  errorElement.textContent = element.validationMessage;
  element.classList.add(inputErrorClass);
  errorElement.classList.add(rest.errorClass);
};

const hideInputError = (element, form, inputErrorClass, rest) => {
  const errorElement = form.querySelector(`.${element.id}-error`);
  element.classList.remove(inputErrorClass);
  errorElement.classList.remove(rest.errorClass);
  errorElement.textContent = "";
};

const isInputValid = (formInput, form, { inputErrorClass, ...rest }) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, form, inputErrorClass, rest);
  } else {
    hideInputError(formInput, form, inputErrorClass, rest);
  }
};

const resetValidation = (form) => {
  const formInputs = form.querySelectorAll(".popup__form-input");
  const formSpans = form.querySelectorAll(".popup__form-error");
  const formPlaceBtnSubmit = form.querySelector(
    ".popup-place__form-submit-button"
  );
  formInputs.forEach((input) => {
    input.classList.remove(".popup__form-input_error_active");
  });
  formSpans.forEach((input) => {
    input.classList.remove(".popup__form-error_active");
  });
  formPlaceBtnSubmit.classList.add("popup__form-submit-button_state_disabled");
  formPlaceBtnSubmit.disabled = true;
};
