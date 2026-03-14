export default class Card {
  constructor(
    name,
    src,
    template,

    handleImageClick,
  ) {
    this._name = name;
    this._src = src;
    this._template = template;

    this._handleImageClick = handleImageClick;

    this._card = this._cloneTemplate();
    this._createCardElement();
    this._addEventListeners();
    this._validateMinimum();
  }
  _cloneTemplate() {
    const cloneCard = this._template.cloneNode(true);
    return cloneCard;
  }
  _createCardElement() {
    this._cardTitle = this._card.querySelector(".card__title");
    this._cardImage = this._card.querySelector(".card__image");
    this._cardlikeBtn = this._card.querySelector(".card__like-button");
    this._cardDltBtn = this._card.querySelector(".card__delete-button");
    //Esto lo necesitas para el pup up
    //this.imageZoomPopupContent = this._zoomRef.querySelector(".popup__content");
    //this.imageSetUpZoom = this._zoomRef.querySelector(".popup__image");
    //this.imageSetUpCapt = this._zoomRef.querySelector(".popup__caption");
    //this.cardCloseBtn = this._zoomRef.querySelector(".popup__close");
    this._validateMinimum();

    return this._card;
  }
  _validateMinimum() {
    if (this._name === "") {
      this._cardTitle.textContent = "Sin título";
    } else {
      this._cardTitle.textContent = this._name; // asigna la propiedad name del parámetro data
    }

    if (this._src === "") {
      this._cardImage.src = "./images/placeholder.jpg";
      this._cardImage.alt = "place holder";
    } else {
      this._cardImage.src = this._src;
      this._cardImage.alt = "park image";
    }
  }
  _addEventListeners() {
    this._cardlikeBtn.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_is-active");
    });

    this._cardDltBtn.addEventListener("click", () => {
      this._card.remove();
    });

    this._cardImage.addEventListener("click", () => {
      console.log(this._src);

      this._handleImageClick(this._src, this._name);
      //Esto debe ir implementado en index js
      //this.imageSetUpZoom.src = this._src;
      //this.imageSetUpCapt.textContent = this._name;
      //openModal(this._zoomRef);
    });
    //esto es close button.
    //this.cardCloseBtn.addEventListener("click", () => {
    //  this._handleCloseClik(this._zoomRef);
    //  //Esto debe de ir implementado en index js
    //  //closeModal(this._zoomRef);
    //});
  }
  getCard() {
    return this._card;
  }
}
