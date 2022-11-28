import React, { FC } from 'react';
import { IPropsWithChildren } from '../../utils/types';
import styles from './centered-box.module.css';

const CenteredBox: FC<IPropsWithChildren> = ({ children }) => {
  return <div className={styles.box}>{children}</div>;
};

export default CenteredBox;
