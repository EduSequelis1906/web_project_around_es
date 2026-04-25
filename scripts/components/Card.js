export default class Card {
  constructor(
    name,
    src,
    id,
    likeState,
    template,
    handleImageClick,
    handleDelete,
    handleLikeState,
  ) {
    this._name = name;
    this._src = src;
    this._id = id;
    this._template = template;
    this.likeState = likeState;

    this._handleLikeState = handleLikeState;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;

    this._card = this._cloneTemplate();
    this._createCardElement();
    this._addEventListeners();
    this._validateMinimum();
  }
  _cloneTemplate() {
    return this._template.cloneNode(true);
  }
  _createCardElement() {
    this._cardTitle = this._card.querySelector(".card__title");
    this._cardImage = this._card.querySelector(".card__image");
    this._cardlikeBtn = this._card.querySelector(".card__like-button");
    this._cardDltBtn = this._card.querySelector(".card__delete-button");
    if (this.likeState) {
      this._cardlikeBtn.classList.add("card__like-button_is-active");
    } else {
      this._cardlikeBtn.classList.remove("card__like-button_is-active");
    }

    this._validateMinimum();

    return this._card;
  }
  _validateMinimum() {
    if (this._name === "") {
      this._cardTitle.textContent = "Sin título";
    } else {
      this._cardTitle.textContent = this._name;
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
      this._handleLikeState(this._id, () => {
        const likestate = evt.target.classList.toggle(
          "card__like-button_is-active",
        );
        this.setLikeState(likestate);
      });
    });

    this._cardDltBtn.addEventListener("click", () => {
      this._handleDelete(this._id, () => this._card.remove());
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._src);
    });
  }
  getCard() {
    return this._card;
  }
  setLikeState(newState) {
    this.likeState = newState;
  }
}
