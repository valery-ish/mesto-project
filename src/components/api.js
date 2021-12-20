class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
    this.renderer = {};
  } // https://dev.to/stroemdev/make-fetch-better-and-your-api-request-methods-easier-to-implement-e9i,
  // https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86


  getProfileInfo() {
    return fetch(this._baseURL + '/users/me', {
      headers: this._headers
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {
    return fetch(this._baseURL + '/cards', {
      headers: this._headers
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  renewProfileInfo(profileName, profileDescription) {
    return fetch(this._baseURL + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileDescription
      })
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  postNewCard(cartTitle, cardlink) {
    return fetch(this._baseURL + '/users/me', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cartTitle,
        link: cardlink
      })
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  putLikeCard(cardId) {
    return fetch(this._baseURL + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteLikeCard (cardId) {
    return fetch(this._baseURL + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCardApi (cardId) {
    return fetch(this._baseURL + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  renewProfileAvatar (profileAvatar) {
    return fetch(this._baseURL + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: profileAvatar
      })
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
};

export const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: 'eecc904e-92e4-4ede-8c36-0f8f370ca546',
    'Content-Type': 'application/json'
  }
});
