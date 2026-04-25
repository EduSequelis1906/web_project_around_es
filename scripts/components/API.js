export default class API {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    console.log(`${this.baseUrl}/cards/`);
    return fetch(`${this.baseUrl}/cards/`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((data) => {
        console.log("valor de data");
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
        return [];
      })
      .finally(() => {
        console.log("end of GET initial cards fetch");
      });
  }
  editProfiles(newName, newAbout) {
    console.log(`${this.baseUrl}/users/me`);
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((data) => {
        console.log("valor de edit profile data");
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
        return [];
      })
      .finally(() => {
        console.log("end of edit profile fetch");
      });
  }
  addNewCardsF(nameCard, linkCard) {
    //POST
    return fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("end of add New Card fetch");
      });
  }
  //cardIsLikedSwtch() {
  //  //patch
  //}
  deleteCardF(id) {
    //DELELTE
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editProfilePhotoF(avatarUrl) {
    console.log(avatarUrl);
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("end of fetch");
      });
  }
  getInitialProfileF() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("end of fetch");
      });
  }
  addLikeCardF(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteLikeCardF(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
