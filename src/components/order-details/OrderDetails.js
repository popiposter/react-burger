import React from 'react';

import { ReactComponent as DoneIcon } from '../../images/done-icon.svg';
import { order } from '../../utils/types';

function OrderDetails({ order }) {
  return (
    <>
      <p className="text text_type_digits-large mt-4 mb-8">{order.number}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <DoneIcon className="mt-15 mb-15" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
  order: order.isRequired,
}

export default OrderDetails;
