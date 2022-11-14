import React from 'react';
import Modal from '../../ui/modal';
import IngredientDetails from '../ingredient-details';
import PropTypes from 'prop-types';

const IngredientDetailsModal = ({ onClose }) => {
  return (
    <Modal header="Детали ингредиента" onClose={onClose}>
      <IngredientDetails onClose={onClose} />
    </Modal>
  );
};

IngredientDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetailsModal;
