declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare type PlayerId = string;
declare type TeamId = string;
declare type GameId = string;

declare interface Player {
  playerId: PlayerId;
  playerName: string;
}

declare interface TeamInternal {
  teamId: TeamId;
  playerIds: PlayerId[];
}

declare interface Team extends Omit<TeamInternal, 'playerIds'> {
  players: Player[];
}

declare interface GameInternal {
  gameId: GameId;
  team1: TeamInternal;
  team2: TeamInternal;
}

declare interface Game extends Omit<GameInternal, 'team1' | 'team2'> {
  team1: Team;
  team2: Team;
}

declare type MatchInternal = GameInternal[];
declare type Match = Game[];
