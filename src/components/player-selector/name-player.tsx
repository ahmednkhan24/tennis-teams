import { useMemo, useState } from 'react';
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
  removePlayer: (playerId: number) => void;
  onPressEnter: () => void;
}

export const NamePlayer: React.FC<NamePlayerProps> = ({
  playerNum,
  matchType,
  player,
  updatePlayerName,
  removePlayer,
  onPressEnter,
}) => {
  const [name, setName] = useState(player.name);
  useDebounce(() => updatePlayerName(name), 500, [name]);

  const canRemove = useMemo(() => {
    if (matchType === 'singles') {
      return playerNum > 2;
    } else if (matchType === 'doubles') {
      return playerNum > 4;
    }
    return false;
  }, [playerNum, matchType]);

  return (
    <InputGroup className="mb-3" size="lg">
      <InputGroup.Text id={`player-${player.id}-name`}>
        Player {playerNum}
      </InputGroup.Text>
      <Form.Control
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
};
