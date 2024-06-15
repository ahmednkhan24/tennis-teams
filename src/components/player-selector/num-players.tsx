import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { NamePlayer } from './name-player';

export type Player = {
  id: number;
  name: string;
};

export const createPlayer = (idx: number): Player => ({ name: '', id: idx });

export const createPlayers = (numPlayers: number) =>
  Array(numPlayers)
    .fill(undefined)
    .map((_, idx) => createPlayer(idx));

export interface NumPlayersProps {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  matchType: string;
}

export const NumPlayers: React.FC<NumPlayersProps> = ({
  players,
  setPlayers,
  matchType,
}) => {
  // component first mount
  useEffect(() => {
    if (matchType === 'singles') {
      setPlayers(createPlayers(2));
    } else if (matchType === 'doubles') {
      setPlayers(createPlayers(4));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div>
        <h2 className="text-center mb-3">Who's playing?</h2>
        {Object.values(players).map((player, idx) => (
          <NamePlayer
            key={idx}
            player={player}
            playerNum={idx + 1}
            matchType={matchType}
            removePlayer={removePlayer}
            updatePlayerName={(name) => updatePlayerName(name, idx)}
            onPressEnter={() => focusNextPlayer(idx)}
          />
        ))}
      </div>
      <div className="d-grid">
        <Button variant="light" size="lg" onClick={addNewPlayer}>
          <PersonPlus />
          <span style={{ paddingLeft: 5 }}>Add player</span>
        </Button>
      </div>
    </>
  );
};
