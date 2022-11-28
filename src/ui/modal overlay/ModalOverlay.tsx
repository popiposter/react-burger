import React, { FC } from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  const handleOverlayClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  return <div className={styles.overlay} onClick={handleOverlayClose} />;
};

export default ModalOverlay;
