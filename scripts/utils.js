export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  formValid = true;
  let nameInput = formElement.querySelector(".popup__input_type_name");
  let jobInput = formElement.querySelector(".popup__input_type_description");

  let name = nameInput.value;
  let job = jobInput.value;

  console.log(name);

  let nameSet = profileDisplay.querySelector(".profile__title");
  let jobSet = profileDisplay.querySelector(".profile__description");

  nameSet.textContent = name;
  jobSet.textContent = job;
}

export function handleCardFormSubmit(title, link) {
  renderCard(title, link, cardContainer);
}
