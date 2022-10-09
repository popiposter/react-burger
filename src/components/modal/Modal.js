import React from 'react';
import PortalReactDOM from 'react-dom';
import ModalOverlay from '../modal overlay';

import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';

import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, header, onClose }) {

  React.useEffect(() => {
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [onClose]);

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return PortalReactDOM.createPortal(
    <div className={styles.modal__container}>
      <ModalOverlay onClick={handleOverlayClose} />
      <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
        <div className={styles.modal__header}>
          {header && <h2 className="text text_type_main-large">{header}</h2>}
          <button className={styles.button__close} onClick={onClose}>
            <CloseIcon />
          </button>

        </div>

        <section className={styles.modal__content}>
          {children}
        </section>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default Modal;
