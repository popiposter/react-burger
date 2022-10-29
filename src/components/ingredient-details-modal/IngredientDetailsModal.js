import React from 'react';
import Modal from '../../ui/modal';
import IngredientDetails from '../ingredient-details';
import PropTypes from 'prop-types';
import { ingredient } from '../../constants/types';

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
};

export default IngredientDetailsModal;
