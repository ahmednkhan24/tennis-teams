import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export const Home: React.FC = () => {
  return (
    <Container>
      <h1>Home page</h1>
      <Link to="/content">Content</Link>
    </Container>
  );
};
