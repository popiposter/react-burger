class StellarBurgersApi {
  constructor({ address }) {
    this._address = address;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка API. Статус: ${res.status}`);
  }

  getIngredients() {
    return fetch(`${this._address}/ingredients`).then(this._checkResponse);
  }

  order(ingredientsIds) {
    return fetch(`${this._address}/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    }).then(this._checkResponse);
  }
}

const stellarBurgersApi = new StellarBurgersApi({
  address: 'https://norma.nomoreparties.space/api',
});

export default stellarBurgersApi;
