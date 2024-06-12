import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { NameThePlayerInput } from './NameThePlayerInput';
import { PersonPlus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { CenteredContainer } from './CenteredContainer';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';

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

const createPlayer = (idx: number): Player => ({ name: '', id: idx });

const createPlayers = (numPlayers: number) =>
  Array(numPlayers)
    .fill(undefined)
    .map((_, idx) => createPlayer(idx));

export interface NumPlayersSelectorProps {
  matchType: string;
}

export const NumPlayersSelector: React.FC<NumPlayersSelectorProps> = ({
  matchType,
}) => {
  const [players, setPlayers] = useState(() =>
    createPlayers(matchType === 'doubles' ? 4 : 2)
  );

  const addNewPlayer = useCallback(
    () => setPlayers((p) => [...p, createPlayer(p.length)]),
    []
  );

  const removePlayer = useCallback(
    (id: number) => setPlayers((p) => p.filter((player) => player.id !== id)),
    []
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
    [players]
  );

  const focusNextPlayer = useCallback(
    (playerNum: number) => {
      // todo
      if (playerNum === players.length - 1) {
        // add a new player entry
        console.log('add new player');
      } else {
        // focus on the next input
        console.log('focus on next player');
      }
    },
    [players.length]
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
            key={player.id}
            player={player}
            playerNum={idx + 1}
            matchType={matchType}
            removePlayer={removePlayer}
            updatePlayerName={(name: string) => updatePlayerName(name, idx)}
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
