import React, { FC, useEffect } from 'react';
import styles from './orders-feed.module.css';
import { useAppDispatch } from '../../services/store';
import {
  connect as connectOrdersFeed,
  disconnect as disconnectOrdersFeed,
  selectWsOrders,
  selectWsStatus,
} from '../../services/ordersFeedSlice';
import { useSelector } from 'react-redux';
import OrdersFeedElement from '../orders-feed-element';
import { WebsocketStatus } from '../../utils/types';
import CenteredBox from '../../ui/centered-box';
import Spinner from '../../ui/spinner';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

interface IOrdersFeedProps {
  url: string;
}

const OrdersFeed: FC<IOrdersFeedProps> = ({ url }) => {
  const dispatch = useAppDispatch();
  const wsStatus = useSelector(selectWsStatus);
  const orders = useSelector(selectWsOrders);

  const { path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(connectOrdersFeed(url));
    return () => {
      dispatch(disconnectOrdersFeed());
    };
  }, [dispatch, url]);

  if (wsStatus === WebsocketStatus.CONNECTING) {
    return (
      <CenteredBox>
        <Spinner />
      </CenteredBox>
    );
  }

  return (
    <ul className={styles.ordersList}>
      {orders?.map((order) => (
        <Link
          className={styles.link}
          key={order._id}
          to={{ pathname: `${path}/${order.number}`, state: { background: location } }}
        >
          <OrdersFeedElement order={order} />
        </Link>
      ))}
    </ul>
  );
};

export default OrdersFeed;
