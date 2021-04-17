let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile-info__edit-button");
let closePopupButton = document.querySelector(".popup__close-icon");
let formName = document.querySelector(".popup__form-name");
let profileName = document.querySelector(".profile-info__title");
let formProfession = document.querySelector(".popup__form-profession");
let profileProfession = document.querySelector(".profile-info__subtitle");
let saveButtton = document.querySelector(".popup__form-submit-button");

const openPopup = () => {
  popup.classList.add("popup_opened");
};

const closePopup = () => {
  popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", () => {
  openPopup();
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
});

closePopupButton.addEventListener("click", closePopup);

saveButtton.addEventListener("click", (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closePopup();
});
