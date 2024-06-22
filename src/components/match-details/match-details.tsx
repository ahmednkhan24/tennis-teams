import Card from 'react-bootstrap/Card';
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

  function GameRow({ game, gameNum }: any) {
    const [team1, team2] = game;
    return (
      <>
        <Card.Title>Game {gameNum}</Card.Title>
        <div className={styles.gameRow}>
          <Card onClick={() => console.log('clicked')}>
            <Card.Body>{JSON.stringify(team1)}</Card.Body>
          </Card>
          <span className={styles.vsText}>vs</span>
          <Card>
            <Card.Body>{JSON.stringify(team2)}</Card.Body>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      {games.map((game, idx) => (
        <GameRow game={game} gameNum={idx + 1} />
      ))}
    </>
  );
}
