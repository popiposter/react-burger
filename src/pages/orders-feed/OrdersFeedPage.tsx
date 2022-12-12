import React, { FC } from 'react';
import OrdersFeed from '../../components/orders-feed';
import styles from './orders-feed-page.module.css';
import stellarBurgersApi from '../../services/StellarBurgersApi';
import OrdersDashboard from '../../components/orders-dashboard';

const OrdersFeedPage: FC = () => {
  return (
    <main className={styles.ordersFeed}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.content}>
        <OrdersFeed url={stellarBurgersApi.getPublicOrdersFeed()} />
        <OrdersDashboard />
      </div>
    </main>
  );
};

export default OrdersFeedPage;
