import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import styles from './new-footer.module.scss';

interface FooterButtonProps {
  text: string;
  variant: string;
  onClick: () => void;
  disabled?: boolean;
}

function FooterButton({
  text,
  variant,
  onClick,
  disabled = false,
}: FooterButtonProps) {
  return (
    <Button
      size="lg"
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={styles.footerButton}
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
    <div className={styles.footer}>
      <div>
        <FooterButton
          text="Cancel"
          variant="danger"
          onClick={() => navigate('/')}
        />
      </div>
      <div>
        {canGoBack && (
          <FooterButton text="Back" variant="light" onClick={onClickBack} />
        )}
        <FooterButton
          text="Next"
          variant="primary"
          disabled={!canGoNext}
          onClick={onClickNext}
        />
      </div>
    </div>
  );
}
