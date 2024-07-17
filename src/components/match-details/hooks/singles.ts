import { v4 as uuid } from 'uuid';
import { generateCombinations } from './shared';

export function createSinglesGame(playerIds: PlayerId[]): TeamInternal[] {
  return generateCombinations(playerIds, (p1, p2) => ({
    teamId: uuid(),
    playerIds: [p1, p2],
  }));
}

export function singlesTeamToSinglesGame(
  singles: TeamInternal[]
): GameInternal[] {
  return singles.map(({ teamId, playerIds }) => ({
    gameId: teamId,
    team1: {
      teamId: playerIds[0],
      playerIds: [playerIds[0]],
    },
    team2: {
      teamId: playerIds[1],
      playerIds: [playerIds[1]],
    },
  }));
}
