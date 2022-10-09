import React from 'react';

import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as CurrencyIconBig } from '../../images/currency-icon-big.svg';

import { getOrderSum } from '../../utils';

import styles from './burger-constructor.module.css';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { burger } from '../../types';

function BurgerConstructor({ burger }) {
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = React.useState(false);
  const [currentOrderDetailsModal, setCurrentOrderDetailsModal] = React.useState(null);

  const OrderDetailsModal = (order) => {
    return (
      <Modal onClose={() => setIsOrderDetailsVisible(false)}>
        <OrderDetails order={order} onClose={() => setIsOrderDetailsVisible(false)} />
      </Modal>
    );
  };

  const handleOrderDetailsModalOpen = () => {
    setCurrentOrderDetailsModal(OrderDetailsModal('034536'));
    setIsOrderDetailsVisible(true);
  };

  return (
    <section className={`${styles.section} pt-25 pl-4 pr-4`}>
      {burger.bun && (
        <ConstructorElement
          type="top"
          isLocked
          text={burger.bun.name}
          thumbnail={burger.bun.image}
          price={burger.bun.price}
          extraClass="ml-8"
        />
      )}

      <ul className={`${styles.list} pt-4 pb-4`}>
        {burger.ingredients.map((item, index) => (
          <li key={item._id + index} className={styles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              thumbnail={item.image}
              price={item.price}
              extraClass="ml-2"
            />
          </li>
        ))}
      </ul>

      {burger.bun && (
        <ConstructorElement
          type="bottom"
          isLocked
          text={burger.bun.name}
          thumbnail={burger.bun.image}
          price={burger.bun.price}
          extraClass="ml-8"
        />
      )}

      <div className={`${styles.order} mt-10`}>
        <p className={`text text_type_digits-medium mr-2`}>{getOrderSum(burger)}</p>
        <CurrencyIconBig />
        <Button
          type="primary"
          size="large"
          htmlType="button"
          extraClass="ml-10"
          onClick={handleOrderDetailsModalOpen}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsVisible && currentOrderDetailsModal}
    </section>
  );
}

BurgerConstructor.propTypes = {
  burger: burger.isRequired,
};

export default BurgerConstructor;
