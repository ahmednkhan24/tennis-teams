import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDebounce } from 'react-use';
import Button from 'react-bootstrap/Button';

export interface NameThePlayerInputProps {
  playerId: number;
  index: number;
  playerName: string;
  updatePlayerName: (playerId: number, updatedPlayerName: string) => void;
  removePlayer: (playerId: number) => void;
}

export const NameThePlayerInput: React.FC<NameThePlayerInputProps> = ({
  playerId,
  index,
  playerName,
  updatePlayerName,
  removePlayer,
}) => {
  const [name, setName] = useState(playerName);
  useDebounce(() => updatePlayerName(playerId, name), 500, [name]);

  return (
    <InputGroup className="mb-3" size="lg">
      <Button
        id={`player-${playerId}-name`}
        disabled={playerId <= 2}
        variant={
          playerName.length ? 'success' : playerId <= 2 ? 'secondary' : 'dark'
        }
        onClick={() => removePlayer(playerId)}
      >
        Player {index}
      </Button>
      <Form.Control
        value={name}
        placeholder="Name"
        aria-label="Name"
        aria-describedby={`player-${playerId}-name`}
        onChange={(event) => setName(event.target.value)}
      />
    </InputGroup>
  );
};
