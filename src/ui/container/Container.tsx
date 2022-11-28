import React, { FC } from 'react';
import { IPropsWithChildren } from '../../utils/types';
import styles from './container.module.css';

const Container: FC<IPropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
