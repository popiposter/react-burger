import { Middleware } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { clearOrders } from '../ordersFeedSlice';
import { TOrderResponse } from '../../utils/types';
import { WebsocketCloseCode } from '../../utils/constants';

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsConnected: ActionCreatorWithoutPayload;
  wsDisconnected: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<TOrderResponse>;
};
export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { connect, disconnect, wsConnected, wsConnecting, wsError, wsMessage, wsDisconnected } = wsActions;

      if (connect.match(action)) {
        url = action.payload;

        socket = new WebSocket(url);

        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnected());
        };

        socket.onerror = () => {
          dispatch(wsError('Websocket error'));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== WebsocketCloseCode.CLOSE_NORMAL && event.code !== WebsocketCloseCode.CLOSE_NO_STATUS) {
            dispatch(wsError(event.code.toString()));
          }
        };

        if (disconnect.match(action)) {
          dispatch(wsDisconnected());
          dispatch(clearOrders());

          socket.close();
        }
      }

      next(action);
    };
  };
};
