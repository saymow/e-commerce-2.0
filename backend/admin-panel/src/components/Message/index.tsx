import React from 'react';
import { Alert } from 'react-bootstrap';

const Message: React.FC<{ variant?: 'success' | 'alert' | 'danger' }> = ({
  variant = 'danger',
  children,
}) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
