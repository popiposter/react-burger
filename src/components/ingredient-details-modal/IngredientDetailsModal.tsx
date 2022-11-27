import React, { FC } from 'react';
import Modal from '../../ui/modal';
import IngredientDetails from '../ingredient-details';

interface IIngredientDetailsModalProps {
  onClose: () => void;
}

const IngredientDetailsModal: FC<IIngredientDetailsModalProps> = ({ onClose }) => {
  return (
    <Modal header="Детали ингредиента" onClose={onClose}>
      <IngredientDetails />
    </Modal>
  );
};

export default IngredientDetailsModal;
