import React, { FC, useEffect } from 'react';
import styles from './order-info.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredientsCountByIds, getOrder, selectOrderDetails, selectOrderStatus } from '../../services/orderSlice';
import { useAppDispatch } from '../../services/store';
import CenteredBox from '../../ui/centered-box';
import Spinner from '../../ui/spinner';
import { TLocationState } from '../../utils/types';
import { OrderStatus } from '../../utils/constants';
import { getIngredientsTotalSumByIds, selectIngredientsByIds } from '../../services/burgerIngredientsSlice';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderParams {
  id: string;
}

const OrderInfo: FC = () => {
  const { id } = useParams<IOrderParams>();
  const location = useLocation<TLocationState>();
  let background = location.state?.background;

  const dispatch = useAppDispatch();
  const order = useSelector(selectOrderDetails);
  const requestStatus = useSelector(selectOrderStatus);

  const orderStatus = order ? OrderStatus[order?.status] : '';
  const isDone = orderStatus === OrderStatus['done'];
  const ingredients = useSelector(selectIngredientsByIds(order?.ingredients));
  const counters = useSelector(getIngredientsCountByIds);
  const orderPrice = useSelector(getIngredientsTotalSumByIds(order?.ingredients));

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  if (requestStatus === 'loading') {
    return (
      <CenteredBox>
        <Spinner />
      </CenteredBox>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className={styles.container}>
      {!background && (
        <p className={`text text_type_digits-default ${styles.number}`} data-test="order-number">
          #{order.number}
        </p>
      )}
      <p className="text text_type_main-medium mb-2">{order.name}</p>
      <p className={`text text_type_main-default mb-6 ${isDone ? styles.statusDone : ''}`}>{orderStatus}</p>
      <p className="text text_type_main-medium mb-2">Состав:</p>
      <ul className={styles.list}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.item}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
              <p className="text text_type_main-default">{ingredient.name}</p>
            </div>

            <div className={styles.priceContainer}>
              <p className="text text_type_digits-default">{`${counters[ingredient._id]} x ${ingredient.price}`}</p>
              <CurrencyIcon type={'primary'} />
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>

        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default">{`${orderPrice}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
