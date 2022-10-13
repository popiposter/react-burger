import React from 'react';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import PropTypes from 'prop-types';
import { ingredient } from '../../utils/types';

const IngredientDetailsModal = ({ ingredient, onClose }) => {
  return (
    <Modal header="Детали ингредиента" onClose={onClose}>
      <IngredientDetails ingredient={ingredient} onClose={onClose} />
    </Modal>
  );
};

IngredientDetailsModal.propTypes = {
  ingredient: ingredient.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default IngredientDetailsModal;
