import styled from '@emotion/styled';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

const Styled = {
  StickyFooter: styled.div({
    borderTop: '1px solid #dbdbdb',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
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
  matchType: string;
  isMatchTypeSelection: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

export const StartMatchFooter: React.FC<StartMatchFooterProps> = ({
  matchType,
  isMatchTypeSelection,
  onClickBack,
  onClickNext,
}) => {
  const navigate = useNavigate();

  return (
    <Styled.StickyFooter>
      <FooterButton
        text="Cancel"
        variant="danger"
        onClick={() => navigate('/')}
      />
      <div>
        {!isMatchTypeSelection && (
          <FooterButton text="Back" variant="light" onClick={onClickBack} />
        )}
        <FooterButton
          text="Next"
          variant="primary"
          disabled={!matchType}
          onClick={onClickNext}
        />
      </div>
    </Styled.StickyFooter>
  );
};
