import { useMemo } from 'react';
import { generateMatch } from './generate-match';

export interface useGenerateMatchProps {
  players: Player[];
  matchType: string;
}

export function useGenerateMatch({
  matchType,
  players,
}: useGenerateMatchProps): Match {
  const playersById = useMemo(
    () =>
      players.reduce((map, player) => {
        map.set(player.playerId, player);
        return map;
      }, new Map<PlayerId, Player>()),
    [players]
  );

  const games = useMemo(
    () => generateMatch(players, matchType),
    [matchType, players]
  );

  return games.map((game) => ({
    ...game,
    team1: {
      ...game.team1,
      players: game.team1.playerIds.map((id) => playersById.get(id) as Player),
    },
    team2: {
      ...game.team2,
      players: game.team2.playerIds.map((id) => playersById.get(id) as Player),
    },
  }));
}
