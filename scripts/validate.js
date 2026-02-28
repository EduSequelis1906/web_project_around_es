import { formObjets } from "./index.js";

function enableValidation(obj) {
  const inputs = obj.formObjEditPro.elementsArray;
  const formSubmit = obj.formObjEditPro.elementFormSubmit;
  const modalPopUpEditContent = obj.formObjEditPro.elementContent;
  const modalProfileForm = obj.formObjEditPro.elementSelector;
  const form = obj.formObjEditPro.elementForm;

  const cardInputs = obj.formObjNewCard.elementsArray;
  const submitPopUpNewCard = obj.formObjNewCard.elementFormSubmit;
  const modalPopUpNewCardContent = obj.formObjNewCard.elementContent;
  const newCardPopUp = obj.formObjNewCard.elementSelector;
  const newCard = obj.formObjNewCard.elementForm;

  const imageZoomPopupContent = obj.imageZoomEvt.elementContent;
  const imageZoom = obj.imageZoomEvt.elementSelector;

  let formValid;
  let cardformValid;

  function showInputError(questionary, element, errorMessage) {
    const errorElement = questionary.querySelector(
      `.${element.id}-input-error`,
    );
    console.log(errorElement);
    element.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }

  function hideInputError(questionary, element) {
    const errorElement = questionary.querySelector(
      `.${element.id}-input-error`,
    );
    element.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
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
}

enableValidation(formObjets);
