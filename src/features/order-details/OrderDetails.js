import React from 'react';

import { ReactComponent as DoneIcon } from '../../images/done-icon.svg';
import { useSelector } from 'react-redux';
import { selectOrder, selectOrderError, selectOrderStatus } from '../burger-constructor/burgerConstructorSlice';
import Spinner from '../../common/spinner';
import CenteredBox from '../../common/centered-box';

import styles from './order-details.module.css';

function OrderDetails() {
  const order = useSelector(selectOrder);
  const orderStatus = useSelector(selectOrderStatus);
  const orderError = useSelector(selectOrderError);

  return orderStatus === 'loading' ? (
    <div className={styles.container}>
      <CenteredBox>
        <Spinner />
      </CenteredBox>
    </div>
  ) : orderStatus === 'failed' ? (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-15">Не удалось оформить заказ 😖</p>
      <p className="text text_type_main-small mb-2">{orderError}</p>
    </div>
  ) : orderStatus === 'succeeded' ? (
    <>
      <p className="text text_type_digits-large mt-4 mb-8">{order?.number}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <DoneIcon className="mt-15 mb-15" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  ) : null;
}

export default OrderDetails;
