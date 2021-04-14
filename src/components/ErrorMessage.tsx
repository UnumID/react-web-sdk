import React, { FC } from 'react';

import './ErrorMessage.css';
/**
 * A simple component for displaying error messages.
 * Applies error styling to its children.
 */
const ErrorMessage: FC = ({ children }) => <div className="error-message">{children}</div>;

export default ErrorMessage;
