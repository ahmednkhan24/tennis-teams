import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

function calculateCombinations<T, K>(
  arr: Array<T>,
  mapper: (t1: T, t2: T) => K
): K[] {
  return arr.flatMap((p1, i) => arr.slice(i + 1).map((p2) => mapper(p1, p2)));
}

export interface useGenerateMatchProps {
  players: Player[];
  matchType: string;
}

export function useGenerateMatch({
  matchType,
  players,
}: useGenerateMatchProps): Game[] {
  const games = useMemo(() => {
    const singles: Team[] = calculateCombinations(players, (p1, p2) => ({
      id: uuid(),
      players: [p1, p2],
    }));

    if (matchType === 'singles') {
      return singles.map(({ players, ...game }) => ({
        ...game,
        team1: {
          id: players[0].id,
          players: [players[0]],
        },
        team2: {
          id: players[1].id,
          players: [players[1]],
        },
      }));
    }

    // each singles game is now considered a team for doubles
    const doubles: Game[] = calculateCombinations(singles, (team1, team2) => ({
      id: uuid(),
      team1,
      team2,
    })).filter(
      ({ team1, team2 }) =>
        !team1.players.some((playerName) => team2.players.includes(playerName))
    );

    return doubles;
  }, [matchType, players]);

  return games;
}
