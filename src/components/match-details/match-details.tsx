import { useGenerateMatch } from './hooks/use-generate-match';

export interface MatchDetailsProps {
  players: Player[];
  matchType: string;
  readonly: boolean;
}

export function MatchDetails({
  readonly,
  players,
  matchType,
}: MatchDetailsProps) {
  useGenerateMatch({ players, matchType });

  return (
    <div>
      <span>TODO: Match Details screen: {readonly}</span>
    </div>
  );
}
