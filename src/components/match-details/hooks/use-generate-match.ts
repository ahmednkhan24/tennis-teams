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
  const singles = useMemo(() => calculateCombinations(players), [players]);

  console.log({ matchType });
  console.log('players: ', players);
  console.log('singles games: ', singles);

  return singles;
}
