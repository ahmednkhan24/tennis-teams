import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export const Content: React.FC = () => {
  return (
    <Container>
      <h1>Content page</h1>
      <Link to="/">Home</Link>
    </Container>
  );
};
