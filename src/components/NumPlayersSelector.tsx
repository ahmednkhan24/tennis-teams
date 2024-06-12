import { Dispatch, SetStateAction, useCallback } from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';
import { CenteredContainer } from './CenteredContainer';
import { NameThePlayerInput } from './NameThePlayerInput';

const Styled = {
  Container: styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    '>*': {
      margin: '0 5px',
    },
  }),
  AddPlayerIcon: styled.span({
    paddingRight: 5,
  }),
};

export type Player = {
  id: number;
  name: string;
};

export const createPlayer = (idx: number): Player => ({ name: '', id: idx });

export interface NumPlayersSelectorProps {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  matchType: string;
}

export const NumPlayersSelector: React.FC<NumPlayersSelectorProps> = ({
  players,
  setPlayers,
  matchType,
}) => {
  const addNewPlayer = useCallback(
    () => setPlayers((p) => [...p, createPlayer(p.length)]),
    [setPlayers]
  );

  const removePlayer = useCallback(
    (id: number) => setPlayers((p) => p.filter((player) => player.id !== id)),
    [setPlayers]
  );

  const updatePlayerName = useCallback(
    (name: string, index: number) => {
      if (players[index].name !== name) {
        setPlayers((p) => {
          const copy = [...p];
          copy[index] = { ...copy[index], name };
          return copy;
        });
      }
    },
    [players, setPlayers]
  );

  const focusNextPlayer = useCallback(
    (playerNum: number) => {
      // todo
      if (playerNum === players.length - 1) {
        // add a new player entry
        console.log('add new player');
        addNewPlayer();
      } else {
        // focus on the next input
        console.log('focus on next player');
      }
    },
    [addNewPlayer, players.length]
  );

  return (
    <>
      <h4>
        {matchType === 'singles' ? (
          <>
            <PersonFill /> Singles
          </>
        ) : (
          <>
            <PeopleFill /> Doubles
          </>
        )}
      </h4>
      <CenteredContainer>
        <h2 className="mb-3">Who's playing?</h2>
        {Object.values(players).map((player, idx) => (
          <NameThePlayerInput
            key={idx}
            player={player}
            playerNum={idx + 1}
            matchType={matchType}
            removePlayer={removePlayer}
            updatePlayerName={(name) => updatePlayerName(name, idx)}
            onPressEnter={() => focusNextPlayer(idx)}
          />
        ))}
      </CenteredContainer>
      <div className="d-grid">
        <Button variant="light" size="lg" onClick={addNewPlayer}>
          <Styled.AddPlayerIcon>
            <PersonPlus />
          </Styled.AddPlayerIcon>
          <span>Add player</span>
        </Button>
      </div>
    </>
  );
};
