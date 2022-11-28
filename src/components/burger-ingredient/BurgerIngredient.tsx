import React, { FC } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { TIngredient } from '../../utils/types';
import { DRAGGABLE_TYPE } from '../../utils/constants';

interface IBurgerIngredientProps {
  item: TIngredient;
  count?: number;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ item, count }) => {
  const [{ opacity }, ref] = useDrag({
    type: DRAGGABLE_TYPE.ingredient,
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <li className={styles.item} ref={ref} style={{ opacity }}>
      {count && <Counter count={count} size="default" />}

      <img src={item.image} alt={item.name} />

      <div className={`${styles.price} pt-2 pb-2`}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </li>
  );
};
export default BurgerIngredient;
