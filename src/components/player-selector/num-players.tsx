import { Dispatch, SetStateAction } from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { Player, useUpdatePlayers } from './hooks';
import { NamePlayer } from './name-player';
import styles from './player-selector.module.scss';

export interface NumPlayersProps {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  matchType: string;
  minPlayers: number;
}

export function NumPlayers({
  players,
  setPlayers,
  matchType,
  minPlayers,
}: NumPlayersProps) {
  const {
    inputRefs,
    removePlayer,
    addNewPlayer,
    updatePlayerName,
    focusOnNextPlayer,
  } = useUpdatePlayers({ players, setPlayers, minPlayers });

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
            minPlayers={minPlayers}
            removePlayer={removePlayer}
            updatePlayerName={(name) => updatePlayerName(player.id, name)}
            onPressEnter={() => focusOnNextPlayer(idx)}
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
}
