import React, { FC } from 'react';
import { IPropsWithChildren } from '../../utils/types';
import styles from './details.container.module.css';

const DetailsContainer: FC<IPropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DetailsContainer;
