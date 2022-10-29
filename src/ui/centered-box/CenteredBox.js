import React from 'react';
import styles from './centered-box.module.css';
import PropTypes from 'prop-types';

function CenteredBox({ children }) {
  return <div className={styles.box}>{children}</div>;
}

CenteredBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenteredBox;
