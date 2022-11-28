import React from 'react';

export interface IPropsWithChildren {
  children: React.ReactNode;
}

type TPartialEmail = {
  email: string;
};

type TPartialPassword = {
  password: string;
};

type TPartialName = {
  name: string;
};

type TPartialToken = {
  token: string;
};

export type TLogin = TPartialEmail & TPartialPassword;
export type TUserData = TPartialEmail & TPartialPassword & TPartialName;
export type TUserInfo = TPartialName & TPartialEmail;
export type TForgotPassword = TPartialEmail;
export type TResetPassword = TPartialPassword & TPartialToken;

export type TUserResponse = {
  user: TUserInfo;
};

export type TResponseError = {
  message: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export function isErrorWithMessage(err: unknown): err is TResponseError {
  return (err as TResponseError).message !== undefined;
}

export type TDraggedItem = {
  index: number;
};

export function isDraggedItem(item: unknown): item is TDraggedItem {
  return (item as TDraggedItem).index !== undefined;
}

export function isIngredient(item: unknown): item is TIngredient {
  return (item as TIngredient).name !== undefined && (item as TIngredient).type !== undefined;
}

export type TRequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type TIngredient = {
  id: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientType = {
  name: string;
  title: string;
};

export type TIngredientsResponse = {
  success: boolean;
  data: Array<TIngredient>;
};

export type TOrder = {
  ingredients: string[];
};

export type TOrderResponse = {
  name: string;
  order: TOrder;
  status: string;
  updatedAt: string;
  createdAt: string;
  number: number;
  _id: string;
};

export interface ICounters {
  [key: string]: number;
}
