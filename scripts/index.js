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
const newCard = document.forms.popup__new;
const cardForm = document.querySelector("#new-card-form");
const cardInputs = cardForm.querySelectorAll(".popup__input");
const cardFormSubmit = cardForm.querySelector(".popup__button");
const closePopUpNewCard = newCardPopUp.querySelector(".popup__close");
const submitPopUpNewCard = newCardPopUp.querySelector(".popup__button");
const newCardTitle = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");
const imageZoom = document.querySelector("#image-popup");
const imageZoomPopupContent = imageZoom.querySelector(".popup__content");
const profileDisplay = document.querySelector(".profile__info");
const formElement = document.querySelector("#edit-profile-form");
const form = document.forms.popup__edit;
const inputName = form.name;
const inputDescription = form.description;
const inputs = formElement.querySelectorAll(".popup__input");
const formSubmit = formElement.querySelector(".popup__button");
const formEditProfileSubmit = form.querySelector(".popup__button");

createNewCardBtn.addEventListener("click", () => {
  openModal(newCardPopUp);
});

closePopUpNewCard.addEventListener("click", function () {
  closeModal(newCardPopUp);
});

newCardPopUp.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let cardformValid = true;
  cardInputs.forEach(inp, () => {
    if (!inp.validity.valid) {
      showInputError(inp, inp.validationMessage);
      cardformValid = false;
    } else {
      hideInputError(inp);
      cardformValid = true;
    }
    toggleButtonState(cardInputs, cardFormSubmit);
  });

  if (!cardformValid) {
    evt.preventDefault();
  }

  handleCardFormSubmit(newCardTitle.value, newCardLink.value);

  newCardTitle.value = "";
  newCardLink.value = "";
});

function handleCardFormSubmit(title, link) {
  renderCard(title, link, cardContainer);
}

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

function getCardElement(name, link) {
  const cardElement = modalTemplateCard.cloneNode(true); // clona el elemento card
  const cardTitle = cardElement.querySelector(".card__title"); // selecciona el título del elemento card
  const cardImage = cardElement.querySelector(".card__image"); // selecciona la imagen del elemento card
  const cardlikeBtn = cardElement.querySelector(".card__like-button");
  const cardDltBtn = cardElement.querySelector(".card__delete-button");
  const cardCloseBtn = imageZoom.querySelector(".popup__close");
  const imageSetUpZoom = imageZoom.querySelector(".popup__image");
  const imageSetUpCapt = imageZoom.querySelector(".popup__caption");

  cardlikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  cardDltBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  if (name === "") {
    cardTitle.textContent = "Sin título";
  } else {
    cardTitle.textContent = name; // asigna la propiedad name del parámetro data
  }

  if (link === "") {
    cardImage.src = "./images/placeholder.jpg";
    cardImage.alt = "place holder";
  } else {
    cardImage.src = link;
    cardImage.alt = "park image";
  }

  cardImage.addEventListener("click", function () {
    imageSetUpZoom.src = link;
    imageSetUpCapt.textContent = name;
    openModal(imageZoom);
  });
  cardCloseBtn.addEventListener("click", function () {
    closeModal(imageZoom);
  });
  return cardElement;
}

function renderCard(name, link, div) {
  const newCard = getCardElement(name, link);
  div.prepend(newCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  formValid = true;
  let nameInput = formElement.querySelector(".popup__input_type_name");
  let jobInput = formElement.querySelector(".popup__input_type_description");

  let name = nameInput.value;
  let job = jobInput.value;

  console.log(name);

  let nameSet = profileDisplay.querySelector(".profile__title");
  let jobSet = profileDisplay.querySelector(".profile__description");

  nameSet.textContent = name;
  jobSet.textContent = job;
  inputs.forEach(inp, () => {
    if (!inp.validity.valid) {
      showInputError(inp, inp.validationMessage);
      formValid = false;
    } else {
      hideInputError(inp);
      formValid = true;
    }
    toggleButtonState(inputs, formEditProfileSubmit);
  });
  if (!formValid) {
    evt.preventDefault();
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach(function (card) {
  const names = card.name;
  const links = card.link;
  renderCard(names, links, cardContainer);
});

function showInputError(questionary, element, errorMessage) {
  const errorElement = questionary.querySelector(`.${element.id}-input-error`);
  console.log(errorElement);
  element.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(questionary, element) {
  const errorElement = questionary.querySelector(`.${element.id}-input-error`);
  element.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

inputs.forEach((entry) => {
  entry.addEventListener("input", () => {
    if (!entry.validity.valid) {
      showInputError(form, entry, entry.validationMessage);
      formValid = false;
    } else {
      hideInputError(form, entry);
      formValid = true;
    }
    toggleButtonState(inputs, formSubmit);
  });
});

function hasInvalidInput(inputs) {
  return Array.from(inputs).some(function (input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, frmSubmit) {
  if (hasInvalidInput(inputList)) {
    frmSubmit.disabled = true;
  } else {
    frmSubmit.disabled = false;
  }
}

toggleButtonState(inputs, formSubmit);

console.log(cardInputs);

cardInputs.forEach((entry) => {
  entry.addEventListener("input", () => {
    if (!entry.validity.valid) {
      console.log(entry);
      showInputError(newCard, entry, entry.validationMessage);
      cardformValid = false;
    } else {
      hideInputError(newCard, entry);
      cardformValid = true;
    }
    toggleButtonState(cardInputs, submitPopUpNewCard);
  });
});

toggleButtonState(cardInputs, submitPopUpNewCard);

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
