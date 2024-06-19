import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { MatchDetails } from 'components/match-details/match-details';
import { MatchType } from 'components/match-type/match-type';
import { NumPlayers, Player } from 'components/player-selector';
import { NewFooter } from 'components/start-match-footer/new-footer';
import styles from './screens.module.scss';

enum Steps {
  MatchTypeSelection, // 0
  PlayerNameSelection, // 1
  MatchPreviewSelection, // 2
}

export function StartMatch() {
  const [step, setStep] = useState(Steps.MatchTypeSelection);
  const [matchType, setMatchType] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const minPlayers = useMemo(
    () => (matchType === 'singles' ? 2 : 4),
    [matchType]
  );

  const canGoNext = useMemo(() => {
    if (step === Steps.MatchTypeSelection) {
      return !!matchType;
    }

    if (step === Steps.PlayerNameSelection) {
      return players.filter(({ name }) => !!name).length >= minPlayers;
    }

    return true;
  }, [matchType, minPlayers, players, step]);

  return (
    <div className={styles.startMatchContainer}>
      <div className="pb-3">
        <Container className="pt-3">
          {step === Steps.MatchTypeSelection ? (
            <MatchType matchType={matchType} setMatchType={setMatchType} />
          ) : step === Steps.PlayerNameSelection ? (
            <NumPlayers
              players={players}
              setPlayers={setPlayers}
              matchType={matchType}
              minPlayers={minPlayers}
            />
          ) : (
            <MatchDetails readonly />
          )}
        </Container>
      </div>
      <NewFooter
        canGoNext={canGoNext}
        canGoBack={step !== Steps.MatchTypeSelection}
        onClickBack={() => setStep((s) => s - 1)}
        onClickNext={() => setStep((s) => s + 1)}
      />
    </div>
  );
}
