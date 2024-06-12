import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import ListGroup from 'react-bootstrap/ListGroup';
import { PeopleFill, PersonFill, CheckCircle } from 'react-bootstrap-icons';
import { CenteredContainer } from './CenteredContainer';

const Styled = {
  Item: styled.span({
    display: 'flex',
    alignItems: 'center',
    h1: {
      display: 'inline',
      padding: '0 15px',
    },
  }),
  Message: styled.h2({
    paddingTop: 40,
  }),
};

interface ItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  startElement: ReactNode;
}
const Item: React.FC<ItemProps> = ({
  text,
  selected,
  startElement,
  onClick,
}) => (
  <ListGroup.Item
    action
    variant={selected ? 'success' : 'light'}
    onClick={onClick}
    style={{
      padding: 30,
      margin: '20px 0',
      borderTopWidth: 'thin !important',
      border: '1px solid #dbdbdb',
    }}
  >
    <Styled.Item>
      {startElement}
      <h1>{text}</h1>
      {selected && <CheckCircle size={35} />}
    </Styled.Item>
  </ListGroup.Item>
);

export interface MatchTypeSelectionProps {
  matchType: string;
  setMatchType: Dispatch<SetStateAction<string>>;
}

export const MatchTypeSelection: React.FC<MatchTypeSelectionProps> = ({
  matchType,
  setMatchType,
}) => {
  return (
    <CenteredContainer>
      <Styled.Message>What type of match are you playing?</Styled.Message>
      <Item
        text="Singles"
        startElement={<PersonFill size={50} />}
        selected={matchType === 'singles'}
        onClick={() => setMatchType('singles')}
      />
      <Item
        text="Doubles"
        startElement={<PeopleFill size={50} />}
        selected={matchType === 'doubles'}
        onClick={() => setMatchType('doubles')}
      />
    </CenteredContainer>
  );
};
