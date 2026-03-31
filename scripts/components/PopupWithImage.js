import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._popUpImageSet = this._popup.querySelector(".popup__image");
    this._popUpNameSet = this._popup.querySelector(".popup__caption");
  }
  open(name, link) {
    super.open();

    this._popUpImageSet.src = link;
    this._popUpImageSet.alt = name;
    this._popUpNameSet.textContent = name;
  }
}
