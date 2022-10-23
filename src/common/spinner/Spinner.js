import React from 'react';
import styles from './spinner.module.css';

function Spinner() {
  return (
    <div className={styles.ldsGrid}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
