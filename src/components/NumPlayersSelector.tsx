import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { NameThePlayerInput } from './NameThePlayerInput';
import { PersonPlus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { CenteredContainer } from './CenteredContainer';

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

const INITIAL_NUM_PLAYERS = 2;

type Player = {
  id: number;
  name: string;
};

const createPlayer = (idx: number): Player => ({ name: '', id: idx });

const createPlayers = (numPlayers = INITIAL_NUM_PLAYERS) => {
  const players: Record<number, Player> = {};
  for (let i = 0; i < numPlayers; i++) {
    const id = i + 1;
    players[id] = createPlayer(id);
  }
  return players;
};

export const NumPlayersSelector: React.FC = () => {
  const [players, setPlayers] = useState(createPlayers);

  const updatePlayerName = useCallback(
    (id: number, name: string) => {
      const playerToUpdate = players[id];
      const updated = { ...playerToUpdate, name };
      setPlayers((p) => ({ ...p, [id]: updated }));
    },
    [players]
  );

  const addNewPlayer = useCallback(() => {
    const values = Object.values(players);
    const currentNumPlayers = values[values.length - 1].id;
    const newPlayer = createPlayer(currentNumPlayers + 1);
    setPlayers((p) => ({ ...p, [newPlayer.id]: newPlayer }));
  }, [players]);

  const removePlayer = useCallback(
    (id: number) =>
      setPlayers((p) => {
        const copied = { ...p };
        delete copied[id];
        return copied;
      }),
    []
  );

  return (
    <>
      <CenteredContainer>
        <h2 className="mb-3">Who's playing?</h2>
        {Object.values(players).map((player, idx) => (
          <NameThePlayerInput
            key={player.id}
            playerId={player.id}
            index={idx + 1}
            playerName={player.name}
            updatePlayerName={updatePlayerName}
            removePlayer={removePlayer}
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
