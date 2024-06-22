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
      {games.map((game, idx) => (
        <GameRow key={game.id} game={game} gameNum={idx + 1} />
      ))}
    </>
  );
}
