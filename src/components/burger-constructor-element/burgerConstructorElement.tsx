import React, { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../utils/types';

interface IBurgerConstructorElementProps {
  item: TIngredient;
  type: 'top' | 'bottom' | undefined;
}

const BurgerConstructorElement: FC<IBurgerConstructorElementProps> = ({ item, type }) => {
  const isTop = type === 'top';
  const isBottom = type === 'bottom';

  return (
    <ConstructorElement
      type={type}
      isLocked={isTop || isBottom}
      text={`${item.name}${isTop ? ' (верх)' : isBottom ? ' (низ)' : ''}`}
      thumbnail={item.image}
      price={item.price}
      extraClass="ml-8"
    />
  );
};

export default BurgerConstructorElement;
