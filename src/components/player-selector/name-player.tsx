import { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import { X as XIcon } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDebounce } from 'react-use';
import { Player } from './num-players';

export interface NamePlayerProps {
  player: Player;
  playerNum: number;
  matchType: string;
  updatePlayerName: (playerName: string) => void;
  removePlayer: (playerId: string) => void;
  onPressEnter: () => void;
}

export const NamePlayer = forwardRef(
  (
    {
      playerNum,
      matchType,
      player,
      updatePlayerName,
      removePlayer,
      onPressEnter,
    }: NamePlayerProps,
    forwardedRef: ForwardedRef<HTMLInputElement>
  ) => {
    const [name, setName] = useState(player.name);
    useDebounce(() => updatePlayerName(name), 500, [name]);

    const canRemove = useMemo(() => {
      const minPlayers = matchType === 'singles' ? 2 : 4;
      return playerNum > minPlayers;
    }, [playerNum, matchType]);

    return (
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Text id={`player-${player.id}-name`}>
          Player {playerNum}
        </InputGroup.Text>
        <Form.Control
          ref={forwardedRef}
          value={name}
          aria-label="Name"
          aria-describedby={`player-${player.id}-name`}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onPressEnter();
            }
          }}
        />
        {canRemove && (
          <Button variant="secondary" onClick={() => removePlayer(player.id)}>
            <XIcon />
          </Button>
        )}
      </InputGroup>
    );
  }
);
