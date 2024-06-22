import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useGenerateMatch } from './hooks/use-generate-match';
import styles from './match-details.module.scss';

export interface MatchDetailsProps {
  players: Player[];
  matchType: string;
  readonly: boolean;
}

export function MatchDetails({
  readonly,
  players,
  matchType,
}: MatchDetailsProps) {
  const games = useGenerateMatch({ players, matchType });

  console.log('games: ', games);

  function PlayerName({ player }: { player: Player }) {
    return (
      <Card.Text className={styles.playerName}>
        {JSON.stringify(player)}
      </Card.Text>
    );
  }

  function PlayerNames({ players }: { players: Player[] }) {
    return (
      <>
        {players.map((player) => (
          <PlayerName key={player.id} player={player} />
        ))}
      </>
    );
  }

  function Team({ team }: { team: Team }) {
    return (
      <Card onClick={() => console.log('clicked')}>
        <Card.Body>
          <PlayerNames players={team.players} />
        </Card.Body>
      </Card>
    );
  }

  function GameRow({ game, gameNum }: { game: Game; gameNum: number }) {
    const { team1, team2 } = game;

    return (
      <div>
        <Card.Title>Game {gameNum}</Card.Title>
        <div className={styles.gameRow}>
          <Team team={team1} />
          <span>vs</span>
          <Team team={team2} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pb-3">
        <Card.Title className="pb-2">Test</Card.Title>
        <Row className="align-items-center justify-content-space-between text-center">
          <Col xs={5}>
            <Card onClick={() => console.log('clicked')}>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>Player 1</ListGroup.Item>
                  <ListGroup.Item>Player 2</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2}>
            <h2>vs</h2>
          </Col>
          <Col xs={5}>
            <Card onClick={() => console.log('clicked')}>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>Player 3</ListGroup.Item>
                  <ListGroup.Item>Player 4</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      {games.map((game, idx) => (
        <GameRow key={game.id} game={game} gameNum={idx + 1} />
      ))}
    </>
  );
}
