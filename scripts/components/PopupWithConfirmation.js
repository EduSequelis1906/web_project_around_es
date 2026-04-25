import Popup from "./Popup.js";

export default class PopupWithConfitmation extends Popup {
  constructor(popUpSelector, submitHandler, rmv) {
    super(popUpSelector);
    this._submitHandler = submitHandler;
    this._id = "";
    this._rmv = rmv;
  }
  setEventListeners() {
    super.setEventListeners();
    this._submitForm = this._popup.querySelector(".popup__form");
    this._submitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._id);
    });
  }
  setDeleteID(id) {
    this._id = id;
  }
}
