import React, { FC } from 'react';
import styles from './orders-feed-element.module.css';
import { TOrder } from '../../utils/types';
import { useSelector } from 'react-redux';
import { getIngredientsTotalSumByIds, selectIngredientsByIds } from '../../services/burgerIngredientsSlice';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { MAX_INGREDIENTS_COUNT_IN_STACK, OrderStatus } from '../../utils/constants';

interface IOrdersFeedElementProps {
  order: TOrder;
}

const OrdersFeedElement: FC<IOrdersFeedElementProps> = ({ order }) => {
  const ingredients = useSelector(selectIngredientsByIds(order.ingredients));
  const orderPrice = useSelector(getIngredientsTotalSumByIds(order.ingredients));
  const orderStatus = OrderStatus[order.status];
  const isDone = orderStatus === OrderStatus['done'];

  const moreIngredients = ingredients.length - MAX_INGREDIENTS_COUNT_IN_STACK;

  return (
    <li className={styles.orderCard}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium mb-2">{order.name}</p>

      <p className={`text text_type_main-default mb-6 ${isDone ? styles.statusDone : ''}`}>{orderStatus}</p>

      <div className={styles.footer}>
        <ul className={styles.ingredients}>
          {ingredients.slice(0, MAX_INGREDIENTS_COUNT_IN_STACK).map((item, index) => (
            <li key={index} style={{ zIndex: `${MAX_INGREDIENTS_COUNT_IN_STACK - index}` }}>
              <img className={styles.ingredient} src={item.image_mobile} alt={item.name} />
            </li>
          ))}
          {moreIngredients > 0 && (
            <li className={styles.moreIngredients}>
              <p className="text text_type_digits-default">{`+${moreIngredients}`}</p>
            </li>
          )}
        </ul>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{`${orderPrice}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default OrdersFeedElement;
