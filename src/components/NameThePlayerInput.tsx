import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDebounce } from 'react-use';

export interface NameThePlayerInputProps {
  playerId: number;
  playerName: string;
  updatePlayerName: (playerId: number, updatedPlayerName: string) => void;
}

export const NameThePlayerInput: React.FC<NameThePlayerInputProps> = ({
  playerId,
  playerName,
  updatePlayerName,
}) => {
  const [name, setName] = useState(playerName);
  useDebounce(() => updatePlayerName(playerId, name), 500, [name]);

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id={`player-${playerId}-name`}>
        Player {playerId}
      </InputGroup.Text>
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
