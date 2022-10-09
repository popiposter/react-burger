import React from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import PropTypes from 'prop-types';

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <OrderDetails order={order} onClose={onClose} />
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  order: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default OrderDetailsModal;
