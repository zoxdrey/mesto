let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile-info__edit-button");
let closePopupButton = document.querySelector(".popup__close-icon");
let formName = document.querySelector(".popup__form-input_data_user-name");
let profileName = document.querySelector(".profile-info__title");
let formProfession = document.querySelector(
  ".popup__form-input_data_user-profession"
);
let profileProfession = document.querySelector(".profile-info__subtitle");
let popupForm = document.querySelector(".popup__form");

let openPopup = () => {
    formName.value = profileName.textContent;
    formProfession.value = profileProfession.textContent;
    popup.classList.add("popup_opened");
};

let savePopup = (e) => {
    e.preventDefault();
    profileName.textContent = formName.value;
    profileProfession.textContent = formProfession.value;
    closePopup();
};

let closePopup = (e) => {
    popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", savePopup);
