import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { StickyFooter } from 'components/sticky-footer/sticky-footer';
import styles from './screens.module.scss';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.screenContainer}>
      <Container className="pb-5">
        <h1>Home page</h1>
        <Link to="/content">Content</Link>
      </Container>
      <StickyFooter>
        <Button
          className="btn-block w-100"
          variant="primary"
          onClick={() => navigate('/new')}
        >
          Start a Match
        </Button>
      </StickyFooter>
    </div>
  );
}
