import React from 'react';
import Modal from '../../../common/modal';
import OrderDetails from '../../order-details';
import PropTypes from 'prop-types';

const OrderDetailsModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <OrderDetails onClose={onClose} />
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsModal;
