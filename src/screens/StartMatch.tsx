import { NumPlayersSelector } from 'components/NumPlayersSelector';
import React from 'react';
import Container from 'react-bootstrap/Container';

export const StartMatch: React.FC = () => {
  return (
    <Container className="pt-3">
      <NumPlayersSelector />
    </Container>
  );
};
