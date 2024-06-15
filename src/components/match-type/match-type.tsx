import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CheckCircle, PeopleFill, PersonFill } from 'react-bootstrap-icons';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './match-type.module.css';

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
    <span className={styles.item}>
      {startElement}
      <h1 className={styles.matchTypeHeading}>{text}</h1>
      {selected && <CheckCircle size={35} />}
    </span>
  </ListGroup.Item>
);

export interface MatchTypeProps {
  matchType: string;
  setMatchType: Dispatch<SetStateAction<string>>;
}

export const MatchType: React.FC<MatchTypeProps> = ({
  matchType,
  setMatchType,
}) => {
  return (
    <>
      <h2 className="text-center pt-4">What type of match are you playing?</h2>
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
    </>
  );
};
