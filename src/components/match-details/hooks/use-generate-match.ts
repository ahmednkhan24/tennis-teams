import { useMemo } from 'react';

function calculateCombinations<T>(arr: Array<T>) {
  return arr.flatMap((p1, i) => arr.slice(i + 1).map((p2) => [p1, p2]));
}

export interface useGenerateMatchProps {
  players: Player[];
  matchType: string;
}

export function useGenerateMatch({
  matchType,
  players,
}: useGenerateMatchProps) {
  const games = useMemo(() => {
    const singles = calculateCombinations(players);

    if (matchType === 'singles') {
      return singles;
    }

    const doubles = calculateCombinations(singles).filter((game) => {
      const [team1Players, team2Players] = game;

      const hasDuplicates = team1Players.some((name) =>
        team2Players.includes(name)
      );

      return !hasDuplicates;
    });

    return doubles;
  }, [matchType, players]);

  return games.map((game, idx) => ({ gameNum: idx + 1, teams: game }));
}
