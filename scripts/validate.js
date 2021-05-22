const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  const formArr = Array.from(forms);

  formArr.forEach((form) => {
    setEventListeners(form, rest);
  });
};

const setEventListeners = (form, { inputSelector, ...rest }) => {
  const inputs = form.querySelectorAll(inputSelector);
  const inputArr = Array.from(inputs);

  inputArr.forEach((input) => {
    input.addEventListener("input", () => {
      isInputValid(input, form, rest);
    });
  });
};
// Функция, которая добавляет класс с ошибкой
const showInputError = (element, form, inputErrorClass, rest) => {
  const errorElement = form.querySelector(`.${element.id}-error`);
  errorElement.innerHTML = element.validationMessage;
  element.classList.add(inputErrorClass);
  errorElement.classList.add(rest.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element, form, inputErrorClass, rest) => {
  const errorElement = form.querySelector(`.${element.id}-error`);
  element.classList.remove(inputErrorClass);
  errorElement.classList.remove(rest.errorClass);
  errorElement.innerHTML = "";
};

// Функция, которая проверяет валидность поля
const isInputValid = (formInput, form, { inputErrorClass, ...rest }) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, form, inputErrorClass, rest);
  } else {
    hideInputError(formInput, form, inputErrorClass, rest);
  }
};
