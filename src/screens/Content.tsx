import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export const Content: React.FC = () => {
  return (
    <Container>
      <h1>Content page</h1>
      <Link to="/">Home</Link>
    </Container>
  );
};
