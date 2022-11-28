import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-element-draggable.module.css';
import { moveIngredient } from '../../services/burgerConstructorSlice';
import { isDraggedItem, TIngredient } from '../../utils/types';
import { useAppDispatch } from '../../services/store';
import { DRAGGABLE_TYPE } from '../../utils/constants';

interface IBurgerConstructorElementDraggableProps {
  item: TIngredient;
  index: number;
  onDeleteClick: () => void;
}

const BurgerConstructorElementDraggable: FC<IBurgerConstructorElementDraggableProps> = ({
  item,
  index,
  onDeleteClick,
}) => {
  const ref = React.useRef(null);
  const dispatch = useAppDispatch();

  const [{ opacity }, drag] = useDrag({
    type: DRAGGABLE_TYPE.constructorIngredient,
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: DRAGGABLE_TYPE.constructorIngredient,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),

    drop(item) {
      if (!isDraggedItem(item)) {
        return;
      }

      if (item.index === index) {
        return;
      }

      dispatch(moveIngredient({ fromIndex: item.index, toIndex: index }));
    },
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={`${styles.item} ${isHover ? styles.dropTargetHover : ''}`} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        price={item.price}
        extraClass="ml-2"
        handleClose={onDeleteClick}
      />
    </li>
  );
};

export default BurgerConstructorElementDraggable;
