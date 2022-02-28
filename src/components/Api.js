class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _returnStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(this._baseURL + '/users/me', {
      headers: this._headers
    }
    ).then(this._returnStatus)
  }

  getInitialCards() {
    return fetch(this._baseURL + '/cards', {
      headers: this._headers
    }
    ).then(this._returnStatus)
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
    ).then(this._returnStatus)
  }

  postNewCard(cartTitle, cardlink) {
    return fetch(this._baseURL + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cartTitle,
        link: cardlink
      })
    }
    ).then(this._returnStatus)
  }

  putLikeCard(cardId) {
    return fetch(this._baseURL + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }
    ).then(this._returnStatus)
  }

  deleteLikeCard (cardId) {
    return fetch(this._baseURL + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }
    ).then(this._returnStatus)
  }

  deleteCardApi (cardId) {
    return fetch(this._baseURL + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }
    ).then(this._returnStatus)
  }

  renewProfileAvatar (profileAvatar) {
    return fetch(this._baseURL + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: profileAvatar
      })
    }
    ).then(this._returnStatus)
  }
};

export const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: 'eecc904e-92e4-4ede-8c36-0f8f370ca546',
    'Content-Type': 'application/json'
  }
});
