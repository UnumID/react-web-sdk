import React, { FC } from 'react';
import './Spinner.css';

/**
 * Component responsible for rendering an animated spinner,
 * to be displayed while waiting for data bo be loaded.
 */
const Spinner: FC = () => (
  <div className="spinner" aria-label="spinner" />
);

export default Spinner;
