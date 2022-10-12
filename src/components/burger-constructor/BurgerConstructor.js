import React from 'react';

import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as CurrencyIconBig } from '../../images/currency-icon-big.svg';

import { getIngredientsIds, getOrderSum } from '../../utils/utils';

import styles from './burger-constructor.module.css';
import OrderDetailsModal from '../order-details-modal';
import { useBurgerConstructor } from '../../context/burger-constructor-context';
import stellarBurgersApi from '../../utils/StellarBurgersApi';

function BurgerConstructor() {
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = React.useState(false);
  const { burger } = useBurgerConstructor();
  const [order, setOrder] = React.useState({ name: '', number: 0 });

  const handleOrderClick = () => {
    stellarBurgersApi.order(getIngredientsIds(burger))
      .then((res) => {
        setOrder({ name: res.name, number: res.order.number });
        setIsOrderDetailsVisible(true);
      }).catch((err) => console.log(err));
  };

  return (
    <section className={`${styles.section} pt-25 pl-4 pr-4`}>
      {burger.bun && (
        <ConstructorElement
          type="top"
          isLocked
          text={burger.bun.name + ' (верх)'}
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
          text={burger.bun.name + ' (низ)'}
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
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsVisible &&
        <OrderDetailsModal
          onClose={() => setIsOrderDetailsVisible(false)}
          order={order}
        />}
    </section>
  );
}

export default BurgerConstructor;
