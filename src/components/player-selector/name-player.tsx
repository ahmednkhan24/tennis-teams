import { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import { X as XIcon } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDebounce } from 'react-use';

export interface NamePlayerProps {
  player: Player;
  playerNum: number;
  minPlayers: number;
  updatePlayerName: (playerName: string) => void;
  removePlayer: (playerId: string) => void;
  onPressEnter: () => void;
}

export const NamePlayer = forwardRef(
  (
    {
      playerNum,
      player,
      minPlayers,
      updatePlayerName,
      removePlayer,
      onPressEnter,
    }: NamePlayerProps,
    forwardedRef: ForwardedRef<HTMLInputElement>
  ) => {
    const { playerName, playerId } = player;
    const [name, setName] = useState(playerName);
    useDebounce(() => updatePlayerName(name), 500, [name]);

    const canRemove = useMemo(
      () => playerNum > minPlayers,
      [minPlayers, playerNum]
    );

    return (
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Text>Player {playerNum}</InputGroup.Text>
        <Form.Control
          ref={forwardedRef}
          value={name}
          aria-label="Name"
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onPressEnter();
            }
          }}
        />
        {canRemove && (
          <Button variant="secondary" onClick={() => removePlayer(playerId)}>
            <XIcon />
          </Button>
        )}
      </InputGroup>
    );
  }
);
