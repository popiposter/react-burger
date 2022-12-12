import React, { FC } from 'react';
import styles from './orders-dashboard.module.css';
import { useSelector } from 'react-redux';
import {
  selectWsDoneOrdersByChunks,
  selectWsPendingOrdersByChunks,
  selectWsTotal,
  selectWsTotalToday,
} from '../../services/ordersFeedSlice';

const OrdersDashboard: FC = () => {
  const doneOrders = useSelector(selectWsDoneOrdersByChunks);
  const pendingOrders = useSelector(selectWsPendingOrdersByChunks);
  const totalOrders = useSelector(selectWsTotal);
  const todayOrders = useSelector(selectWsTotalToday);

  return (
    <section className={styles.dashboard}>
      <div className={styles.statuses}>
        <div className={styles.status}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>

          <div className={styles.columns}>
            {doneOrders.map((orderColumn, index) => (
              <div key={index} className={styles.column}>
                {orderColumn.map((order) => (
                  <p key={order._id} className={`text text_type_digits-default ${styles.done}`}>
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.status}>
        <p className="text text_type_main-medium mb-6">В работе:</p>

        <div className={styles.columns}>
          {pendingOrders.map((orderColumn, index) => (
            <div key={index} className={styles.column}>
              {orderColumn.map((order) => (
                <p key={order._id} className="text text_type_digits-default">
                  {order.number}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.totalCount}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${styles.shadow}`}>{totalOrders}</p>
      </div>

      <div className={styles.totalCount}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.shadow}`}>{todayOrders}</p>
      </div>
    </section>
  );
};

export default OrdersDashboard;
