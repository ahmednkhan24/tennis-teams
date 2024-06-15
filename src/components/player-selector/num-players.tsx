import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { NamePlayer } from './name-player';
import styles from './player-selector.module.scss';

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
    const playersWithNames = players.filter(({ name }) => !!name);

    const minPlayers = matchType === 'singles' ? 2 : 4;
    const difference = minPlayers - playersWithNames.length;

    if (difference > 0) {
      setPlayers([...playersWithNames, ...createPlayers(difference)]);
    } else {
      setPlayers(playersWithNames);
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
    (id: number, name: string) =>
      setPlayers((p) =>
        p.map((player: Player) =>
          player.id === id ? { ...player, name } : player
        )
      ),
    [setPlayers]
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
            updatePlayerName={(name) => updatePlayerName(player.id, name)}
            onPressEnter={() => focusNextPlayer(idx)}
          />
        ))}
      </div>
      <div className="d-grid">
        <Button variant="light" size="lg" onClick={addNewPlayer}>
          <PersonPlus />
          <span className={styles.addPlayerText}>Add player</span>
        </Button>
      </div>
    </>
  );
};
