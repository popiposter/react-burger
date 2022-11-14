import { getCookie, setCookie } from '../utils/utils';

class StellarBurgersApi {
  constructor({ address }) {
    this._address = address;
  }

  _defaultFetchOptions() {
    return {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  saveTokens(refreshToken, accessToken) {
    setCookie('accessToken', accessToken.split('Bearer ')[1], { 'max-age': 3600 });
    localStorage.setItem('refreshToken', refreshToken);
  }

  deleteTokens() {
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '', { 'max-age': 0 });
  }

  refreshToken() {
    return fetch(`${this._address}/auth/token`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    }).then(this._checkResponse);
  }

  async _getAccessToken() {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      try {
        return await this._getNewTokens();
      } catch (err) {
        return null;
      }
    }

    return `Bearer ${accessToken}`;
  }

  async _getNewTokens() {
    if (!localStorage.getItem('refreshToken')) {
      return null;
    }

    const { accessToken, refreshToken } = await this.refreshToken();
    this.saveTokens(refreshToken, accessToken);

    return accessToken;
  }

  async _fetchWithRefresh(url, options) {
    const accessToken = await this._getAccessToken();
    if (!accessToken) {
      return Promise.reject('token not found');
    }

    options.headers.Authorization = accessToken;

    try {
      const res = await fetch(url, options);
      return await this._checkResponse(res);
    } catch (err) {
      if (err.message === 'jwt expired') {
        options.headers.Authorization = await this._getNewTokens();

        const res = await fetch(url, options);
        return this._checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  }

  getIngredients() {
    return fetch(`${this._address}/ingredients`, this._defaultFetchOptions()).then(this._checkResponse);
  }

  order(ingredientsIds) {
    return fetch(`${this._address}/orders`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    }).then(this._checkResponse);
  }

  getUser() {
    return this._fetchWithRefresh(`${this._address}/auth/user`, {
      ...this._defaultFetchOptions(),
    });
  }

  updateUser(data) {
    return this._fetchWithRefresh(`${this._address}/auth/user`, {
      ...this._defaultFetchOptions(),
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  register(data) {
    return fetch(`${this._address}/auth/register`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  login(data) {
    return fetch(`${this._address}/auth/login`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  logout() {
    return fetch(`${this._address}/auth/logout`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    }).then(this._checkResponse);
  }

  forgotPassword(data) {
    return fetch(`${this._address}/password-reset/`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  resetPassword(data) {
    return fetch(`${this._address}/password-reset/reset`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
}

const stellarBurgersApi = new StellarBurgersApi({
  address: 'https://norma.nomoreparties.space/api',
});

export default stellarBurgersApi;
