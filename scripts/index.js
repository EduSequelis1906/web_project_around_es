let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (card) {
  console.log(card.name);
});

const modalProfileEditBtn = document.querySelector(".profile__edit-button");
const modalProfileForm = document.querySelector("#edit-popup");
const modalClosePopUpBtn = modalProfileForm.querySelector(".popup__close");
const modalTypeName = modalProfileForm.querySelector(".popup__input_type_name");
const modalTypeDescription = modalProfileForm.querySelector(
  ".popup__input_type_description"
);

const profileTitleText = document.querySelector(".profile__title");
const profileDescriptionText = document.querySelector(".profile__description");

function openModal(modalInput) {
  modalInput.classList.add("popup_is-opened");
}

function closeModal(modalInput) {
  modalInput.classList.remove("popup_is-opened");
}

modalClosePopUpBtn.addEventListener("click", () => {
  closeModal(modalProfileForm);
});
modalProfileEditBtn.addEventListener("click", () => {
  handleOpenEditModal(modalProfileForm);
});

function fillProfileForm() {
  modalTypeName.value = profileTitleText.textContent;
  modalTypeDescription.value = profileDescriptionText.textContent;
}

function handleOpenEditModal(modal) {
  fillProfileForm();
  openModal(modal);
}

const profileDisplay = document.querySelector(".profile__info");
let formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".popup__input_type_name");
  let jobInput = formElement.querySelector(".popup__input_type_description");

  let name = nameInput.value;
  let job = jobInput.value;

  console.log(name);

  let nameSet = profileDisplay.querySelector(".profile__title");
  let jobSet = profileDisplay.querySelector(".profile__description");

  nameSet.textContent = name;
  jobSet.textContent = job;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
