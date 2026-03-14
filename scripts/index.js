import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { handleProfileFormSubmit, handleCardFormSubmit } from "./utils.js";

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

let formValid = true;
let cardformValid = true;
const modalProfileEditBtn = document.querySelector(".profile__edit-button");
const modalProfileForm = document.querySelector("#edit-popup");
const modalPopUpEditContent = modalProfileForm.querySelector(".popup__content");
const modalClosePopUpBtn = modalProfileForm.querySelector(".popup__close");
const modalTypeName = modalProfileForm.querySelector(".popup__input_type_name");
const modalTypeDescription = modalProfileForm.querySelector(
  ".popup__input_type_description",
);
const modalTemplateCard = document
  .querySelector("#card")
  .content.querySelector(".card");

const cardContainer = document.querySelector(".cards__list");
const profileTitleText = document.querySelector(".profile__title");
const profileDescriptionText = document.querySelector(".profile__description");
const createNewCardBtn = document.querySelector(".profile__add-button");
const newCardPopUp = document.querySelector("#new-card-popup");
const modalPopUpNewCardContent = newCardPopUp.querySelector(".popup__content");

const cardForm = document.querySelector("#new-card-form");

const closePopUpNewCard = newCardPopUp.querySelector(".popup__close");

const newCardTitle = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

const imageZoom = document.querySelector("#image-popup");
const imageZoomPopupContent = imageZoom.querySelector(".popup__content");
const cardCloseBtn = imageZoom.querySelector(".popup__close");

const profileDisplay = document.querySelector(".profile__info");
const formElement = document.querySelector("#edit-profile-form");
const form = document.forms.popup__edit;

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileValidator = new FormValidator(config, formElement);
const cardValidator = new FormValidator(config, cardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

createNewCardBtn.addEventListener("click", () => {
  openModal(newCardPopUp);
});

closePopUpNewCard.addEventListener("click", function () {
  closeModal(newCardPopUp);
});

newCardPopUp.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let cardformValid = true;

  if (!cardformValid) {
    evt.preventDefault();
  }

  handleCardFormSubmit(newCardTitle.value, newCardLink.value);

  newCardTitle.value = "";
  newCardLink.value = "";
});

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
function renderCard(name, link, div) {
  const newCard = new Card(name, link, modalTemplateCard, handleImageClickPub);
  div.prepend(newCard.getCard());
}

formElement.addEventListener("submit", handleProfileFormSubmit);

document.addEventListener("mousedown", function (event) {
  let isClickInsideNewCard = modalPopUpNewCardContent.contains(event.target);
  let isClickInsideEditPro = modalPopUpEditContent.contains(event.target);
  let isClickInsideZoom = imageZoomPopupContent.contains(event.target);
  console.log(isClickInsideNewCard);
  console.log(isClickInsideEditPro);
  console.log(isClickInsideZoom);
  if (!isClickInsideNewCard && !isClickInsideEditPro && !isClickInsideZoom) {
    closeModal(newCardPopUp);
    closeModal(modalProfileForm);
    closeModal(imageZoom);
  }
});

document.addEventListener("keydown", function (event) {
  console.log(event.key === "Escape");
  if (event.key === "Escape") {
    closeModal(newCardPopUp);
    closeModal(modalProfileForm);
    closeModal(imageZoom);
  }
});

initialCards.forEach(function (card) {
  const names = card.name;
  const links = card.link;
  renderCard(names, links, cardContainer);
});

function handleImageClickPub(link, des) {
  const imageSetUpZoom = imageZoom.querySelector(".popup__image");
  const imageSetUpCapt = imageZoom.querySelector(".popup__caption");
  imageSetUpZoom.src = link;
  imageSetUpCapt.textContent = des;
  openModal(imageZoom);
}

cardCloseBtn.addEventListener("click", function () {
  closeModal(imageZoom);
});
