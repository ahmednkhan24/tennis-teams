import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { PeopleFill, PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { useIsVisible } from 'hooks/use-is-visible';
import { useUpdatePlayers } from './hooks';
import { NamePlayer } from './name-player';
import styles from './player-selector.module.scss';

interface MatchIconProps {
  matchType: string;
}

function MatchIcon({ matchType }: MatchIconProps) {
  return (
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
  );
}

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
  const addPlayerButtonRef = useRef<HTMLButtonElement>(null);
  const isAddPlayerButtonVisible = useIsVisible(addPlayerButtonRef);

  useEffect(() => {
    if (!isAddPlayerButtonVisible) {
      addPlayerButtonRef.current?.scrollIntoView();
    }
  }, [isAddPlayerButtonVisible]);

  const {
    inputRefs,
    removePlayer,
    addNewPlayer,
    updatePlayerName,
    focusOnNextPlayer,
  } = useUpdatePlayers({ players, setPlayers, minPlayers });

  return (
    <>
      <MatchIcon matchType={matchType} />
      <div>
        <h2 className="text-center mb-3">Who's playing?</h2>
        {players.map((player, idx) => (
          <NamePlayer
            key={player.playerId}
            ref={(refElement) => {
              if (inputRefs.current !== null && refElement !== null) {
                inputRefs.current[idx] = refElement;
              }
            }}
            player={player}
            playerNum={idx + 1}
            minPlayers={minPlayers}
            removePlayer={removePlayer}
            updatePlayerName={(name) => updatePlayerName(player.playerId, name)}
            onPressEnter={() => focusOnNextPlayer(idx)}
          />
        ))}
      </div>
      <div className="d-grid">
        <Button
          variant="light"
          size="lg"
          onClick={addNewPlayer}
          ref={addPlayerButtonRef}
        >
          <PersonPlus />
          <span className={styles.addPlayerText}>Add player</span>
        </Button>
      </div>
    </>
  );
}
