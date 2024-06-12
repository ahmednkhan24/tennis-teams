import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Styled = {
  Footer: styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #dbdbdb',
    padding: '0 15px',
  }),
};

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

export interface StartMatchFooterProps {
  canGoBack: boolean;
  canGoNext: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

export const StartMatchFooter: React.FC<StartMatchFooterProps> = ({
  canGoBack,
  canGoNext,
  onClickBack,
  onClickNext,
}) => {
  const navigate = useNavigate();

  return (
    <Styled.Footer>
      <FooterButton
        text="Cancel"
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
    </Styled.Footer>
  );
};
