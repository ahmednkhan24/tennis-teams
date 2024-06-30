import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import classNames from 'classnames';
import { MatchDetails } from 'components/match-details/match-details';
import { MatchType } from 'components/match-type/match-type';
import { NumPlayers } from 'components/player-selector';
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
    switch (step) {
      case Steps.MatchTypeSelection:
        return !!matchType;
      case Steps.PlayerNameSelection:
        return players.filter(({ name }) => !!name).length >= minPlayers;
      case Steps.MatchPreviewSelection:
        return false;
      default:
        return true;
    }
  }, [matchType, minPlayers, players, step]);

  return (
    <div className={classNames('mb-3', styles.screenContainer)}>
      <Container className="pt-3 pb-5 mb-5">
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
          <MatchDetails
            readonly
            matchType={matchType}
            players={players.filter(({ name }) => !!name)}
          />
        )}
      </Container>
      <NewFooter
        canGoNext={canGoNext}
        canGoBack={step !== Steps.MatchTypeSelection}
        onClickBack={() => setStep((s) => s - 1)}
        onClickNext={() => setStep((s) => s + 1)}
      />
    </div>
  );
}
