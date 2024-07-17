import { createDoublesGames } from './doubles';
import { createSinglesGame, singlesTeamToSinglesGame } from './singles';

export function generateMatch(
  players: Player[],
  matchType: string
): MatchInternal {
  const playerIds = players.map(({ playerId }) => playerId);

  const singles = createSinglesGame(playerIds);
  if (matchType === 'singles') {
    return singlesTeamToSinglesGame(singles);
  }

  const doubles = createDoublesGames(singles);

  return doubles;
}
