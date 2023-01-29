import Cookies from 'js-cookie';
import {
  TLogin,
  TUserData,
  TTokens,
  TForgotPassword,
  TUserResponse,
  TResponseError,
  isErrorWithMessage,
  TResetPassword,
  TIngredientsResponse,
  TOrderResponse,
} from '../utils/types';

class StellarBurgersApi {
  _address: string;
  _publicOrdersFeedAddress: string;
  _privateOrdersFeedAddress: string;

  constructor({
    address,
    publicOrdersFeedAddress,
    privateOrdersFeedAddress,
  }: {
    address: string;
    publicOrdersFeedAddress: string;
    privateOrdersFeedAddress: string;
  }) {
    this._address = address;
    this._publicOrdersFeedAddress = publicOrdersFeedAddress;
    this._privateOrdersFeedAddress = privateOrdersFeedAddress;
  }

  getPublicOrdersFeed() {
    return this._publicOrdersFeedAddress;
  }

  getPrivateOrdersFeed() {
    return this._privateOrdersFeedAddress + Cookies.get('accessToken');
  }

  _defaultFetchOptions(withAuth = false): RequestInit {
    return {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: withAuth ? `Bearer ${Cookies.get('accessToken')}` : '',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
  }

  _setAuthHeaders(options: RequestInit, accessToken: string): RequestInit {
    if (accessToken) {
      const reqHeaders = new Headers(options.headers);
      reqHeaders.set('Authorization', accessToken.includes('Bearer') ? accessToken : `Bearer ${accessToken}`);
      options.headers = reqHeaders;
    }
    return options;
  }

  _checkResponse(res: Response): Promise<any> {
    return res.ok ? res.json() : res.json().then((err: TResponseError) => Promise.reject(err));
  }

  saveTokens(refreshToken: string, accessToken: string) {
    Cookies.set('accessToken', accessToken.split('Bearer ')[1], { expires: 1 });
    localStorage.setItem('refreshToken', refreshToken);
  }

  deleteTokens() {
    localStorage.removeItem('refreshToken');
    Cookies.remove('accessToken');
  }

  refreshToken(): Promise<TTokens> {
    return fetch(`${this._address}/auth/token`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    }).then(this._checkResponse);
  }

  async _getAccessToken(): Promise<string | null> {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      try {
        return await this._getNewTokens();
      } catch (err) {
        return null;
      }
    }

    return accessToken;
  }

  async _getNewTokens(): Promise<string | null> {
    if (!localStorage.getItem('refreshToken')) {
      return null;
    }

    const { accessToken, refreshToken } = await this.refreshToken();
    this.saveTokens(refreshToken, accessToken);

    return accessToken;
  }

  async _fetchWithRefresh(url: string, options: RequestInit): Promise<any> {
    const accessToken = await this._getAccessToken();
    if (!accessToken) {
      return Promise.reject('token not found');
    }

    this._setAuthHeaders(options, accessToken);

    try {
      const res = await fetch(url, options);
      return await this._checkResponse(res);
    } catch (err) {
      if (isErrorWithMessage(err) && err.message === 'jwt expired') {
        const newAccessToken = await this._getNewTokens();

        if (typeof newAccessToken === 'string') {
          this._setAuthHeaders(options, newAccessToken);
        } else {
          return Promise.reject('token not found');
        }

        const res = await fetch(url, options);
        return this._checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  }

  getIngredients(): Promise<TIngredientsResponse> {
    return fetch(`${this._address}/ingredients`, this._defaultFetchOptions()).then(this._checkResponse);
  }

  postOrder(ingredientsIds: Array<string>) {
    return fetch(`${this._address}/orders`, {
      ...this._defaultFetchOptions(true),
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    }).then(this._checkResponse);
  }

  getOrder(orderId: string): Promise<TOrderResponse> {
    return fetch(`${this._address}/orders/${orderId}`, this._defaultFetchOptions()).then(this._checkResponse);
  }

  getUser(): Promise<TUserResponse> {
    return this._fetchWithRefresh(`${this._address}/auth/user`, {
      ...this._defaultFetchOptions(),
    });
  }

  updateUser(data: TUserData): Promise<TUserResponse> {
    return this._fetchWithRefresh(`${this._address}/auth/user`, {
      ...this._defaultFetchOptions(),
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  register(data: TUserData) {
    return fetch(`${this._address}/auth/register`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  login(data: TLogin) {
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

  forgotPassword(data: TForgotPassword) {
    return fetch(`${this._address}/password-reset/`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  resetPassword(data: TResetPassword) {
    return fetch(`${this._address}/password-reset/reset`, {
      ...this._defaultFetchOptions(),
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
}

const stellarBurgersApi = new StellarBurgersApi({
  address: 'https://norma.nomoreparties.space/api',
  publicOrdersFeedAddress: 'wss://norma.nomoreparties.space/orders/all',
  privateOrdersFeedAddress: 'wss://norma.nomoreparties.space/orders?token=',
});

export default stellarBurgersApi;
