import React from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as CurrencyIconBig } from '../../images/currency-icon-big.svg';

import styles from './burger-constructor.module.css';
import OrderDetailsModal from '../modals/order-details-modal';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIngredient,
  fetchOrder,
  removeIngredient,
  selectBun,
  selectIngredients,
  selectIngredientsIds,
  selectTotalPrice,
} from './burgerConstructorSlice';
import BurgerConstructorElementDraggable from './burger-constructor-element-draggable';
import BurgerConstructorElement from './burger-constructor-element';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);
  const burgerIngredientsIds = useSelector(selectIngredientsIds);

  const totalPride = useSelector(selectTotalPrice);

  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = React.useState(false);

  const handleOrderClick = () => {
    dispatch(fetchOrder(burgerIngredientsIds));
    setIsOrderDetailsVisible(true);
  };

  const handleIngredientDelete = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  const onDropHandler = (item) => {
    dispatch(addIngredient(item));
  };

  const [{ isHover }, dropTargetIngredients] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      onDropHandler(item);
    },
  });

  return (
    <section className={`${styles.section} pt-25 pl-4 pr-4`}>
      <div
        ref={dropTargetIngredients}
        className={isHover ? `${styles.dropTarget} ${styles.dropTargetHover}` : styles.dropTarget}
      >
        {bun && <BurgerConstructorElement item={bun} type="top" />}

        <ul className={`${styles.list} pt-4 pb-4`}>
          {ingredients.map((item) => (
            <BurgerConstructorElementDraggable
              key={item.id}
              item={item}
              onDeleteClick={() => handleIngredientDelete(item)}
            />
          ))}
        </ul>

        {bun && <BurgerConstructorElement item={bun} type="bottom" />}
      </div>

      <div className={`${styles.order} mt-10`}>
        <p className={`text text_type_digits-medium mr-2`}>{totalPride}</p>
        <CurrencyIconBig />
        <Button
          type="primary"
          size="large"
          htmlType="button"
          extraClass="ml-10"
          onClick={handleOrderClick}
          disabled={burgerIngredientsIds.length === 0}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsVisible && <OrderDetailsModal onClose={() => setIsOrderDetailsVisible(false)} />}
    </section>
  );
}

export default BurgerConstructor;
