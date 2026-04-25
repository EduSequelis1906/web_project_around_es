import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(pupupSelector, submitCallBack) {
    super(pupupSelector);
    this._formSelector = this._popup.querySelector(".popup__form");
    this._formSbmBtn = this._formSelector.querySelector(".popup__button");
    this._annimationUP = this._formSbmBtn.querySelector(".popup__button-up");
    this._annimationDown = this._formSbmBtn.querySelector(
      ".popup__button-down",
    );
    this._callback = submitCallBack;
  }
  _getInputValues() {
    this._inputs = this._formSelector.querySelectorAll(".popup__input");
    const vals = {};
    this._inputs.forEach((element) => {
      vals[element.name] = element.value;
    });

    return vals;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._formSelector.reset();
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._annimationUP.style.display = "none";
      this._annimationDown.style.display = "block";
    } else {
      this._annimationUP.style.display = "block";
      this._annimationDown.style.display = "none";
    }
  }
}
