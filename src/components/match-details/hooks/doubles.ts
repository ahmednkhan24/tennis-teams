import { v4 as uuid } from 'uuid';
import { generateCombinations } from './shared';

export function createDoublesGames(teams: TeamInternal[]): GameInternal[] {
  return generateCombinations(teams, (team1, team2) => ({
    gameId: uuid(),
    team1,
    team2,
  })).filter(
    ({ team1, team2 }) =>
      !team1.playerIds.some((playerId) => team2.playerIds.includes(playerId))
  );
}
