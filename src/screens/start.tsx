import { useMemo, useState } from 'react';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { MatchType } from 'components/match-type/match-type';
import { NumPlayers, Player } from 'components/player-selector/num-players';
import { NewFooter } from 'components/start-match-footer/new-footer';
import styles from './screens.module.scss';

enum Steps {
  MatchTypeSelection, // 0
  PlayerNameSelection, // 1
  MatchPreviewSelection, // 2
}

export const StartMatch: React.FC = () => {
  const [step, setStep] = useState(Steps.MatchTypeSelection);
  const [matchType, setMatchType] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const canGoNext = useMemo(() => {
    if (step === Steps.MatchTypeSelection) {
      return !!matchType;
    }

    if (step === Steps.PlayerNameSelection) {
      // todo:
      return false;
    }

    return true;
  }, [matchType, step]);

  return (
    <>
      <Container className="pt-3">
        <div className={styles.startMatchContent}>
          {step === Steps.MatchTypeSelection ? (
            <MatchType matchType={matchType} setMatchType={setMatchType} />
          ) : step === Steps.PlayerNameSelection ? (
            <NumPlayers
              players={players}
              setPlayers={setPlayers}
              matchType={matchType}
            />
          ) : (
            <div>TODO: preview screen</div>
          )}
        </div>
      </Container>
      <NewFooter
        canGoNext={canGoNext}
        canGoBack={step !== Steps.MatchTypeSelection}
        onClickBack={() => setStep((s) => s - 1)}
        onClickNext={() => setStep((s) => s + 1)}
      />
    </>
  );
};
