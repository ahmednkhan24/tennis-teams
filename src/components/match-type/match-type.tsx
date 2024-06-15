import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CheckCircle, PeopleFill, PersonFill } from 'react-bootstrap-icons';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './match-type.module.scss';

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
    className={styles.item}
  >
    <span className={styles.itemContent}>
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
