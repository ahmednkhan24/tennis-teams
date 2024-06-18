import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { v4 as uuid } from 'uuid';
import { NamePlayer } from './name-player';
import styles from './player-selector.module.scss';

export type Player = {
  id: string;
  name: string;
};

export const createPlayer = (): Player => ({ name: '', id: uuid() });

export const createPlayers = (numPlayers: number) =>
  Array(numPlayers).fill(undefined).map(createPlayer);

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
  const [playerIndexToFocusOn, setPlayerIndexToFocusOn] = useState(-1);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // component first mount
  useEffect(() => {
    const playersWithNames = players.filter(({ name }) => !!name);

    const minPlayers = matchType === 'singles' ? 2 : 4;
    const difference = minPlayers - playersWithNames.length;

    inputRefs.current = [];

    if (difference > 0) {
      setPlayers([...playersWithNames, ...createPlayers(difference)]);
    } else {
      setPlayers(playersWithNames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusOnInput = useCallback(
    (index: number) => inputRefs.current[index].focus(),
    []
  );

  useEffect(() => {
    if (playerIndexToFocusOn > -1) {
      focusOnInput(playerIndexToFocusOn);
      setPlayerIndexToFocusOn(-1);
    }
  }, [focusOnInput, playerIndexToFocusOn]);

  const addNewPlayer = useCallback(
    () => setPlayers((p) => [...p, createPlayer()]),
    [setPlayers]
  );

  const removePlayer = useCallback(
    (id: string) => setPlayers((p) => p.filter((player) => player.id !== id)),
    [setPlayers]
  );

  const updatePlayerName = useCallback(
    (id: string, name: string) =>
      setPlayers((p) =>
        p.map((player: Player) =>
          player.id === id ? { ...player, name } : player
        )
      ),
    [setPlayers]
  );

  const focusNextPlayer = useCallback(
    (playerNum: number) => {
      if (playerNum === players.length - 1) {
        // add a new player entry, then focus on it
        addNewPlayer();
        setPlayerIndexToFocusOn(playerNum + 1);
      } else {
        // focus on the next input
        focusOnInput(playerNum + 1);
      }
    },
    [addNewPlayer, focusOnInput, players.length]
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
        {players.map((player, idx) => (
          <NamePlayer
            key={player.id}
            ref={(refElement) => {
              if (inputRefs.current !== null && refElement !== null) {
                inputRefs.current[idx] = refElement;
              }
            }}
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
