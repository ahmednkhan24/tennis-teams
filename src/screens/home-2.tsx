import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Home page</h1>
      <Link to="/content">Content</Link>
      <br />
      <Button variant="primary" onClick={() => navigate('/new')}>
        Start a Match
      </Button>
    </Container>
  );
};
