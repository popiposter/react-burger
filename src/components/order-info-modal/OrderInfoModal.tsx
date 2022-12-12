import React, { FC } from 'react';
import Modal from '../../ui/modal';
import OrderInfo from '../order-info';
import { useParams } from 'react-router-dom';

interface IOrderModalProps {
  onClose: () => void;
}

interface IOrderParams {
  id: string;
}

const OrderInfoModal: FC<IOrderModalProps> = ({ onClose }) => {
  const { id } = useParams<IOrderParams>();

  return (
    <Modal onClose={onClose} header={`#${id}`} headerClassName="text text_type_digits-default">
      <OrderInfo />
    </Modal>
  );
};

export default OrderInfoModal;
