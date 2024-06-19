export interface MatchDetailsProps {
  readonly: boolean;
}

export function MatchDetails({ readonly }: MatchDetailsProps) {
  console.log('readonly: ', readonly);
  return (
    <div>
      <span>TODO: Match Details screen: {readonly}</span>
    </div>
  );
}
