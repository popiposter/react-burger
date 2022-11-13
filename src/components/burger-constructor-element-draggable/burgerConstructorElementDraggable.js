import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredient } from '../../utils/types';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-element-draggable.module.css';
import { useDispatch } from 'react-redux';
import { moveIngredient } from '../../services/burgerConstructorSlice';

function BurgerConstructorElementDraggable({ item, index, onDeleteClick }) {
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ isHover }, drop] = useDrop({
    accept: 'constructorIngredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.index === index) {
        return;
      }

      dispatch(moveIngredient({ fromIndex: item.index, toIndex: index }));
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: 'constructorIngredient',
    item: { index },
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
  index: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BurgerConstructorElementDraggable;
