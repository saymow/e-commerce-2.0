import React from 'react';
import { Card } from 'react-bootstrap';

interface Props {
  title: string;
  table: React.ReactNode;
}

const OrderInfoSection: React.FC<Props> = props => {
  const { title, table } = props;

  return (
    <Card
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3>{title}</h3>
      {table}
    </Card>
  );
};

export default OrderInfoSection;
