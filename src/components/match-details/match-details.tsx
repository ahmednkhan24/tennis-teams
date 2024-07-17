import { GameRow } from './components/game-row';
import { useGenerateMatch } from './hooks/use-generate-match';

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

  return (
    <>
      {games.map((game, idx) => (
        <GameRow key={game.gameId} game={game} gameNum={idx + 1} />
      ))}
    </>
  );
}
