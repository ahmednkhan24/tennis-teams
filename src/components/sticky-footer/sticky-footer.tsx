import { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';

export interface StickyFooterProps {
  children: ReactNode;
}

export function StickyFooter({ children }: StickyFooterProps) {
  return (
    <footer className="footer fixed-bottom border-top bg-white">
      <Container className="mt-4 mb-4">{children}</Container>
    </footer>
  );
}
