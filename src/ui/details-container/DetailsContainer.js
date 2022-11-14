import React from 'react';
import styles from './details.container.module.css';
import PropTypes from 'prop-types';

function DetailsContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

DetailsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsContainer;
