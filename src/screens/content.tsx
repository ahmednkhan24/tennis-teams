import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export function Content() {
  return (
    <Container>
      <h1>Content page</h1>
      <Link to="/">Home</Link>
    </Container>
  );
}
