import React from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import PropTypes from 'prop-types';
import { order } from '../../utils/types';

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <OrderDetails order={order} onClose={onClose} />
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  order: order.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default OrderDetailsModal;
