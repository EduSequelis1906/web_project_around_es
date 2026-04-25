export default class FormValidator {
  constructor(configInfo, formElement) {
    this._config = configInfo;
    this._form = formElement;

    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._formSubmit = this._form.querySelector(
      this._config.submitButtonSelector,
    );
  }
  _fieldValidity() {
    return Array.from(this._inputs).some((input) => {
      return !input.validity.valid;
    });
  }
  _toggleButtonState() {
    if (this._fieldValidity()) {
      this._formSubmit.disabled = true;
    } else {
      this._formSubmit.disabled = false;
    }
  }

  _showInputError(element, errorMessage) {
    //const errorElement = this._form.querySelector(`.${element.id}-input-error`);
    const errorElement = element.nextElementSibling;
    console.log(errorElement);
    element.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }

  _hideInputError(element) {
    //const errorElement = this._form.querySelector(`.${element.id}-input-error`);
    const errorElement = element.nextElementSibling;
    element.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  }

  setEventListeners() {
    this._inputs.forEach((entry) => {
      entry.addEventListener("input", () => {
        if (!entry.validity.valid) {
          this._showInputError(entry, entry.validationMessage);
        } else {
          this._hideInputError(entry);
        }
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this.setEventListeners();
    this._toggleButtonState();
  }
}
