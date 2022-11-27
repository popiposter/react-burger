import React, { FC } from 'react';
import Modal from '../../ui/modal';
import OrderDetails from '../order-details';

interface IOrderDetailsModalProps {
  onClose: () => void;
}

const OrderDetailsModal: FC<IOrderDetailsModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <OrderDetails />
    </Modal>
  );
};

export default OrderDetailsModal;
