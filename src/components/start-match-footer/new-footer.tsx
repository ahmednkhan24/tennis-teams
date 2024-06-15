import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import styles from './new-footer.module.scss';

const buttonStyles = {
  marginRight: '5px',
  margin: 10,
};

interface FooterButtonProps {
  text: string;
  variant: string;
  onClick: () => void;
  disabled?: boolean;
}

const FooterButton: React.FC<FooterButtonProps> = ({
  text,
  variant,
  onClick,
  disabled = false,
}) => (
  <Button
    variant={variant}
    disabled={disabled}
    onClick={onClick}
    size="lg"
    style={buttonStyles}
  >
    {text}
  </Button>
);

export interface NewFooterProps {
  canGoBack: boolean;
  canGoNext: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

export const NewFooter: React.FC<NewFooterProps> = ({
  canGoBack,
  canGoNext,
  onClickBack,
  onClickNext,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <FooterButton
        text="Cancel!"
        variant="danger"
        onClick={() => navigate('/')}
      />
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
};
