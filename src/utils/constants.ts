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
