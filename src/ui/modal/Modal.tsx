import React, { FC } from 'react';
import PortalReactDOM from 'react-dom';
import ModalOverlay from '../modal overlay';

import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';

import styles from './modal.module.css';
import { IPropsWithChildren } from '../../utils/types';

interface IModalProps extends IPropsWithChildren {
  header?: string;
  onClose: () => void;
}

const modalRoot = document.getElementById('react-modals') as HTMLElement;

const Modal: FC<IModalProps> = ({ children, header, onClose }) => {
  React.useEffect(() => {
    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [onClose]);

  return PortalReactDOM.createPortal(
    <div className={styles.modal__container}>
      <ModalOverlay onClick={onClose} />
      <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
        <div className={styles.modal__header}>
          {header && <h2 className="text text_type_main-large">{header}</h2>}
          <button className={styles.button__close} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <section className={styles.modal__content}>{children}</section>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
