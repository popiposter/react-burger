import React from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as CurrencyIconBig } from '../../images/currency-icon-big.svg';

import styles from './burger-constructor.module.css';
import OrderDetailsModal from '../order-details-modal';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  resetBurger,
  selectBun,
  selectIngredients,
  selectIngredientsIds,
  selectTotalPrice,
} from '../../services/burgerConstructorSlice';
import BurgerConstructorElementDraggable from '../burger-constructor-element-draggable';
import BurgerConstructorElement from '../burger-constructor-element';
import { postOrder, resetOrder, selectOrderStatus } from '../../services/orderSlice';
import { selectUser } from '../../services/authSlice';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { isIngredient, TConstructorIngredient, TIngredient } from '../../utils/types';
import { DRAGGABLE_TYPE } from '../../utils/constants';

function BurgerConstructor() {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const history = useHistory();

  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);
  const burgerIngredientsIds = useSelector(selectIngredientsIds);

  const totalPride = useSelector(selectTotalPrice);

  const orderStatus = useSelector(selectOrderStatus);

  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = React.useState(false);

  const handleOrderClick = () => {
    if (!user) {
      history.push('/login');
    } else {
      dispatch(postOrder(burgerIngredientsIds));
      setIsOrderDetailsVisible(true);
    }
  };

  const handleOrderDetailsClose = () => {
    setIsOrderDetailsVisible(false);

    if (orderStatus === 'succeeded') {
      dispatch(resetBurger());
      dispatch(resetOrder());
    }
  };

  const handleIngredientDelete = (ingredient: TConstructorIngredient) => {
    dispatch(removeIngredient(ingredient));
  };

  const onDropHandler = (item: TIngredient) => {
    dispatch(addIngredient(item));
  };

  const [{ isHover }, dropTargetIngredients] = useDrop({
    accept: DRAGGABLE_TYPE.ingredient,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (isIngredient(item)) {
        onDropHandler(item);
      }
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
          {ingredients.map((item, index) => (
            <BurgerConstructorElementDraggable
              key={item.id}
              index={index}
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
          disabled={!bun || ingredients.length === 0}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsVisible && <OrderDetailsModal onClose={handleOrderDetailsClose} />}
    </section>
  );
}

export default BurgerConstructor;
