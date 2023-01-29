import { TConstructorIngredient, TOrder, TUserInfo } from './types';

export const TYPE_INGREDIENTS = {
  bun: {
    name: 'bun',
    title: 'Булки',
  },
  sauce: {
    name: 'sauce',
    title: 'Соусы',
  },
  main: {
    name: 'main',
    title: 'Начинки',
  },
};

export const OrderStatus: Record<string, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const DRAGGABLE_TYPE = {
  ingredient: 'ingredient',
  constructorIngredient: 'constructorIngredient',
};

export const MAX_INGREDIENTS_COUNT_IN_STACK = 6;

export enum WebsocketCloseCode {
  CLOSE_NORMAL = 1000,
  CLOSE_GOING_AWAY = 1001,
  CLOSE_PROTOCOL_ERROR = 1002,
  CLOSE_UNSUPPORTED = 1003,
  CLOSE_NO_STATUS = 1005,
  CLOSE_ABNORMAL = 1006,
  CLOSE_INVALID_FRAME_PAYLOAD_DATA = 1007,
  CLOSE_POLICY_VIOLATION = 1008,
  CLOSE_MESSAGE_TOO_BIG = 1009,
  CLOSE_MANDATORY_EXTENSION = 1010,
  CLOSE_INTERNAL_SERVER_ERROR = 1011,
  CLOSE_SERVICE_RESTART = 1012,
  CLOSE_TRY_AGAIN_LATER = 1013,
  CLOSE_TLS_HANDSHAKE = 1015,
}

export const bunConstructorIngredientMock: TConstructorIngredient = {
  _id: '60666c42cc7b410027a1a9b1',
  id: '1',
  name: 'Булка',
  type: TYPE_INGREDIENTS.bun.name,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

export const sauceConstructorIngredientMock: TConstructorIngredient = {
  _id: '60666c42cc7b410027a1a9b5',
  id: '2',
  name: 'Соус',
  type: TYPE_INGREDIENTS.sauce.name,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
};

export const mainConstructorIngredientMock: TConstructorIngredient = {
  _id: '60666c42cc7b410027a1a9b9',
  id: '3',
  name: 'Начинка',
  type: TYPE_INGREDIENTS.main.name,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0,
};

export const orderMock: TOrder = {
  _id: '60666c42cc7b410027a1a9b6',
  number: 1,
  name: 'Пользователь',
  createdAt: '2023-01-01T12:00:00.000Z',
  ingredients: [
    bunConstructorIngredientMock._id,
    sauceConstructorIngredientMock._id,
    mainConstructorIngredientMock._id,
  ],
  status: OrderStatus.done,
  updatedAt: '2023-01-01T12:00:00.000Z',
};

export const userMock: TUserInfo = {
  email: 'email@email.com',
  name: 'Пользователь',
};
