import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

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

const modalProfileEditBtn = document.querySelector(".profile__edit-button");
const modalProfileForm = document.querySelector("#edit-popup");

const modalTemplateCard = document
  .querySelector("#card")
  .content.querySelector(".card");

const cardContainer = document.querySelector(".cards__list");

const createNewCardBtn = document.querySelector(".profile__add-button");

const cardForm = document.querySelector("#new-card-form");

const formElement = document.querySelector("#edit-profile-form");

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const createCard = (data) => {
  const card = new Card(
    data.name,
    data.link,
    modalTemplateCard,
    (name, link) => {
      imagePopup.open(name, link);
    },
  );

  return card.getCard();
};
const modalTypeName = modalProfileForm.querySelector(".popup__input_type_name");
const modalTypeDescription = modalProfileForm.querySelector(
  ".popup__input_type_description",
);

const userInf = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editProfile = new PopupWithForm("#edit-popup", (data) => {
  userInf.setUserInfo({ name: data.name, job: data.description });
});

editProfile.setEventListeners();

const newCard = new PopupWithForm("#new-card-popup", (data) => {
  const newCarda = new Card(
    data.place_name,
    data.link,
    modalTemplateCard,
    (name, link) => {
      imagePopup.open(name, link);
    },
  );
  cardContainer.prepend(newCarda.getCard());
});

newCard.setEventListeners();

const sectio = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      sectio.addItem(cardElement);
    },
  },
  cardContainer,
);

sectio.renderItems();
const imagePopup = new PopupWithImage("#image-popup");

imagePopup.setEventListeners();

const profileValidator = new FormValidator(config, formElement);
const cardValidator = new FormValidator(config, cardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

createNewCardBtn.addEventListener("click", () => {
  newCard.open();
});

modalProfileEditBtn.addEventListener("click", () => {
  const vals = userInf.getUserInfo();
  modalTypeName.value = vals.name;
  modalTypeDescription.value = vals.job;
  editProfile.open();
});
