import React, { FC } from 'react';
import Modal from '../../ui/modal';
import Order from '../order';
import { useParams } from 'react-router-dom';

interface IOrderModalProps {
  onClose: () => void;
}

interface IOrderParams {
  id: string;
}

const OrderModal: FC<IOrderModalProps> = ({ onClose }) => {
  const { id } = useParams<IOrderParams>();

  return (
    <Modal onClose={onClose} header={`#${id}`} headerClassName="text text_type_digits-default">
      <Order />
    </Modal>
  );
};

export default OrderModal;
