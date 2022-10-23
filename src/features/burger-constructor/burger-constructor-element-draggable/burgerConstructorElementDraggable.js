import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredient } from '../../../constants/types';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-element-draggable.module.css';
import { useDispatch } from 'react-redux';
import { moveIngredient } from '../burgerConstructorSlice';

function BurgerConstructorElementDraggable({ item, onDeleteClick }) {
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ isHover }, drop] = useDrop({
    accept: 'constructorIngredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(droppedItem) {
      if (droppedItem.id === item.id) {
        return;
      }

      dispatch(moveIngredient({ draggedItem: droppedItem, targetItem: item }));
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: 'constructorIngredient',
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
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
}

BurgerConstructorElementDraggable.propTypes = {
  item: ingredient.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BurgerConstructorElementDraggable;
