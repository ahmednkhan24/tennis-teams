import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

export interface PlayerCardProps {
  players: Player[];
}

function PlayerCard({ players }: PlayerCardProps) {
  return (
    <Card onClick={() => console.log('clicked')}>
      <Card.Body>
        <ListGroup variant="flush">
          {players.map(({ playerId, playerName }) => (
            <ListGroup.Item key={playerId}>{playerName}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export interface GameRowProps {
  game: Game;
  gameNum: number;
}

export function GameRow({ game, gameNum }: GameRowProps) {
  return (
    <div className="pb-3">
      <Card.Title className="pb-2">Game {gameNum}</Card.Title>
      <Row className="align-items-center justify-content-space-between text-center">
        <Col xs={5}>
          <PlayerCard players={game.team1.players} />
        </Col>
        <Col xs={2}>
          <h2>vs</h2>
        </Col>
        <Col xs={5}>
          <PlayerCard players={game.team2.players} />
        </Col>
      </Row>
    </div>
  );
}
