import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import API from "./components/API.js";
import PopupWithConfitmation from "./components/PopupWithConfirmation.js";

let initialCards = [];
const cardContainer = document.querySelector(".cards__list");
const modalProfileEditBtn = document.querySelector(".profile__edit-button");
const modalProfileForm = document.querySelector("#edit-popup");

const profileAvatarEdit = document.querySelector("#edit-popup-image");
const avatarEditbtn = document.querySelector(".profile__edit-container");

const modalTemplateCard = document
  .querySelector("#card")
  .content.querySelector(".card");

const createNewCardBtn = document.querySelector(".profile__add-button");

const cardForm = document.querySelector("#new-card-form");

const formElement = document.querySelector("#edit-profile-form");

const api = new API({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "838edff3-c618-45be-a106-3a829c47a33d",
    "Content-Type": "application/json",
  },
});

let init = api.getInitialCards();
console.log(init);
init.then((elements) => {
  elements.forEach((element) => {
    console.log(element._id);
    const newCarda = new Card(
      element.name,
      element.link,
      element._id,
      element.isLiked,
      modalTemplateCard,
      (name, link) => {
        imagePopup.open(name, link);
      },
      (id, rmvDOM) => {
        const confirmPopup = new PopupWithConfitmation(
          "#confirm-popup-image",
          (id) => {
            api
              .deleteCardF(id)
              .then((data) => {
                console.log("Entra a close confirm popup");
                rmvDOM();
                confirmPopup.close();
              })
              .catch((err) => console.log(err));
          },
        );

        confirmPopup.setEventListeners();
        confirmPopup.setDeleteID(id);
        confirmPopup.open();
      },
      (id, toggleFunc) => {
        if (newCarda.likeState) {
          api
            .deleteLikeCardF(id)
            .then((data) => {
              console.log("Entra toggle true to false like");
              toggleFunc();
              newCarda.setLikeState(false);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLikeCardF(id)
            .then((data) => {
              console.log("Entra toggle false to true like");
              toggleFunc();
              newCarda.setLikeState(true);
            })
            .catch((err) => console.log(err));
        }
      },
    );
    cardContainer.prepend(newCarda.getCard());
  });
});

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const createCard = (element) => {
  const newCarda = new Card(
    element.name,
    element.link,
    element._id,
    element.isLiked,
    modalTemplateCard,
    (name, link) => {
      imagePopup.open(name, link);
    },
    (id, rmvDOM) => {
      const confirmPopup = new PopupWithConfitmation(
        "#confirm-popup-image",
        (id) => {
          api
            .deleteCardF(id)
            .then((data) => {
              console.log("Entra a close confirm popup");
              rmvDOM();
              confirmPopup.close();
            })
            .catch((err) => console.log(err));
        },
      );

      confirmPopup.setEventListeners();
      confirmPopup.setDeleteID(id);
      confirmPopup.open();
    },
    (id, toggleFunc) => {
      if (newCarda.likeState) {
        api
          .deleteLikeCardF(id)
          .then((data) => {
            console.log("Entra toggle true to false like");
            toggleFunc();
            newCarda.setLikeState(false);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .addLikeCardF(id)
          .then((data) => {
            console.log("Entra toggle false to true like");
            toggleFunc();
            newCarda.setLikeState(true);
          })
          .catch((err) => console.log(err));
      }
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
  imageSelector: ".profile__image",
});
api.getInitialProfileF().then((element) => {
  userInf.setUserInfo({ name: element.name, job: element.about });
});

const editProfImage = new PopupWithForm("#edit-popup-image", (data) => {
  editProfImage.renderLoading(true);
  userInf.setUserImage(data.link);
  //console.log(data.link);
  api
    .editProfilePhotoF(data.link)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err))
    .finally((res) => {
      editProfImage.renderLoading(false);
    });
});
editProfImage.setEventListeners();

const editProfile = new PopupWithForm("#edit-popup", (data) => {
  editProfile.renderLoading(true);
  userInf.setUserInfo({ name: data.name, job: data.description });
  api
    .editProfiles(data.name, data.description)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err))
    .finally((res) => {
      editProfile.renderLoading(false);
    });
});

editProfile.setEventListeners();

console.log("llamada a section");
console.log(initialCards);

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

const newCard = new PopupWithForm("#new-card-popup", (data) => {
  newCard.renderLoading(true);
  api
    .addNewCardsF(data.place_name, data.link)
    .then((cardData) => {
      const newCarda = new Card(
        cardData.name,
        cardData.link,
        cardData._id,
        cardData.isLiked,
        modalTemplateCard,
        (name, link) => {
          imagePopup.open(name, link);
        },
        (id, rmvDOM) => {
          const confirmPopup = new PopupWithConfitmation(
            "#confirm-popup-image",
            (id) => {
              //confirmPopup.renderLoading(true);
              api
                .deleteCardF(id)
                .then((data) => {
                  console.log("Entra a close confirm popup");
                  rmvDOM();
                  confirmPopup.close();
                })
                .catch((err) => console.log(err))
                .finally((res) => {
                  console.log(res);
                  //confirmPopup.renderLoading(false);
                });
            },
          );

          confirmPopup.setEventListeners();
          confirmPopup.setDeleteID(id);
          confirmPopup.open();
        },
        (id, toggleFunc) => {
          if (newCarda.likeState) {
            api
              .deleteLikeCardF(id)
              .then((data) => {
                console.log("Entra toggle true to false like");
                toggleFunc();
                newCarda.setLikeState(false);
              })
              .catch((err) => console.log(err));
          } else {
            api.addLikeCardF(id).then((data) => {
              console.log("Entra toggle false to true like");
              toggleFunc();
              newCarda.setLikeState(true);
            });
          }
        },
      );
      cardContainer.prepend(newCarda.getCard());
    })
    .catch((err) => console.log(err))
    .finally((res) => {
      //console.log(res);
      newCard.renderLoading(false);
    });
});

newCard.setEventListeners();

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

const editAvatarValidator = new FormValidator(config, profileAvatarEdit);
editAvatarValidator.enableValidation();
avatarEditbtn.addEventListener("click", () => {
  editProfImage.open();
});

function setInitialPhoto() {
  api
    .getInitialProfileF()
    .then((data) => {
      userInf.setUserImage(data.avatar);
    })
    .catch((err) => console.log(err));
}

setInitialPhoto();
