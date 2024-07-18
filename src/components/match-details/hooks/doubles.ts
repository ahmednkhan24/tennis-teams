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

function playerIdsSittingOutInGame(
  { team1, team2 }: GameInternal,
  playerIds: PlayerId[]
): PlayerId[] {
  const allIdsInGame = [...team1.playerIds, ...team2.playerIds];
  return playerIds.filter(
    (playerId) => !allIdsInGame.some((id) => id === playerId)
  );
}

function playerMapByGamesSittingOut(
  games: GameInternal[],
  playerIds: string[]
): Map<PlayerId, GameId[]> {
  const sittingOutByPlayerId = new Map<PlayerId, GameId[]>();

  games.forEach((game) => {
    const sittingOutPlayerIds = playerIdsSittingOutInGame(game, playerIds);

    sittingOutPlayerIds.forEach((playerId) => {
      const satOutGames = sittingOutByPlayerId.get(playerId) ?? [];
      if (!satOutGames.some((gameId) => gameId === game.gameId)) {
        sittingOutByPlayerId.set(playerId, [...satOutGames, game.gameId]);
      }
    });
  });

  return sittingOutByPlayerId;
}

export function sortDoublesGames(
  doubles: GameInternal[],
  playerIds: PlayerId[]
): GameInternal[] {
  const gamesByPlayerSittingOut: Map<PlayerId, GameId[]> =
    playerMapByGamesSittingOut(doubles, playerIds);

  const gameIds = doubles.map(({ gameId }) => gameId);
  const orderedGameIds: GameId[] = [];
  const gamesPlayed = new Set<GameId>();
  let playerCounter = 0;

  while (orderedGameIds.length < gameIds.length) {
    const currPlayerId = playerIds[playerCounter];
    const gameIdsCurrPlayerIdSatOut = gamesByPlayerSittingOut.get(currPlayerId);

    if (gameIdsCurrPlayerIdSatOut?.length) {
      const currGameId = gameIdsCurrPlayerIdSatOut[0];
      if (!gamesPlayed.has(currGameId)) {
        // play the game
        orderedGameIds.push(currGameId);
        gamesPlayed.add(currGameId);
      }

      // remove the game
      const removed = [...gameIdsCurrPlayerIdSatOut];
      removed.shift();
      gamesByPlayerSittingOut.set(currPlayerId, removed);
    }

    // increment/reset player counter
    if (playerCounter === playerIds.length - 1) {
      playerCounter = 0;
    } else {
      playerCounter++;
    }
  }

  const gamesById = doubles.reduce((map, game) => {
    map.set(game.gameId, game);
    return map;
  }, new Map<GameId, GameInternal>());

  return orderedGameIds.map((gameId) => gamesById.get(gameId) as GameInternal);
}
