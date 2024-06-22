declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare interface Player {
  id: string;
  name: string;
}

declare interface Team {
  id: string;
  players: Player[];
}

declare interface Game {
  id: string;
  team1: Team;
  team2: Team;
  winningTeamId?: string;
}
