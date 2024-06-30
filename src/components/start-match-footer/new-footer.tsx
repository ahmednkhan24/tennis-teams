import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { StickyFooter } from 'components/sticky-footer/sticky-footer';
import styles from './new-footer.module.scss';

interface FooterButtonProps {
  text: string;
  variant: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

function FooterButton({
  text,
  variant,
  onClick,
  disabled = false,
  className = '',
}: FooterButtonProps) {
  return (
    <Button
      size="lg"
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {text}
    </Button>
  );
}

export interface NewFooterProps {
  canGoBack: boolean;
  canGoNext: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

export function NewFooter({
  canGoBack,
  canGoNext,
  onClickBack,
  onClickNext,
}: NewFooterProps) {
  const navigate = useNavigate();

  return (
    <StickyFooter>
      <div className={styles.footer}>
        <FooterButton
          text="Cancel"
          variant="danger"
          onClick={() => navigate('/')}
        />
        <div>
          {canGoBack && (
            <FooterButton
              text="Back"
              variant="light"
              onClick={onClickBack}
              className={styles.backButton}
            />
          )}
          <FooterButton
            text="Next"
            variant="primary"
            disabled={!canGoNext}
            onClick={onClickNext}
          />
        </div>
      </div>
    </StickyFooter>
  );
}
