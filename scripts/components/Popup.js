export default class Popup {
  constructor(popUpSelector) {
    this._popup = document.querySelector(popUpSelector);
  }
  open() {
    this._popup.classList.add("popup_is-opened");
  }
  close() {
    this._popup.classList.remove("popup_is-opened");
  }
  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }
  setEventListeners() {
    //const closeBtn = this._popup.querySelector(".popup__close");
    const closeBtn = this._popup.querySelector(".popup__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
    this._handleEscClose();
  }
}
