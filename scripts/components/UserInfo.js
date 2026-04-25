export default class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._imageElement = document.querySelector(imageSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
  setUserImage(image) {
    this._imageElement.src = image;
  }
}
