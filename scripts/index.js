const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile-info__edit-button");
const closePopupButton = document.querySelector(".popup__close-icon");
const formName = document.querySelector(".popup__form-name");
const profileName = document.querySelector(".profile-info__title");
const formProfession = document.querySelector(".popup__form-profession");
const profileProfession = document.querySelector(".profile-info__subtitle");
const popupFoem = document.querySelector(".popup__form");

const togglePopup = () => {
  popup.classList.toggle("popup_opened");
};

editButton.addEventListener("click", () => {
  togglePopup();
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
});

closePopupButton.addEventListener("click", togglePopup);

popupFoem.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  togglePopup();
});
