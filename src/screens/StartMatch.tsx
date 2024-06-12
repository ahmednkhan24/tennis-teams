import { MatchTypeSelection } from 'components/MatchTypeSelection';
import {
  NumPlayersSelector,
  createPlayer,
} from 'components/NumPlayersSelector';
import { StartMatchFooter } from 'components/StartMatchFooter';
import { useMemo, useState } from 'react';
import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from '@emotion/styled';

const Styled = {
  Content: styled.div({
    display: 'flex',
    minHeight: '88vh',
    flexDirection: 'column',
    paddingBottom: 20,
  }),
};

enum Steps {
  MatchTypeSelection, // 0
  PlayerNameSelection, // 1
  MatchPreviewSelection, // 2
}

const createPlayers = (numPlayers: number) =>
  Array(numPlayers)
    .fill(undefined)
    .map((_, idx) => createPlayer(idx));

export const StartMatch: React.FC = () => {
  const [step, setStep] = useState(Steps.MatchTypeSelection);
  const [matchType, setMatchType] = useState('');
  const [players, setPlayers] = useState(() =>
    createPlayers(matchType === 'doubles' ? 4 : 2)
  );

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
        <Styled.Content>
          {step === Steps.MatchTypeSelection ? (
            <MatchTypeSelection
              matchType={matchType}
              setMatchType={setMatchType}
            />
          ) : step === Steps.PlayerNameSelection ? (
            <NumPlayersSelector
              players={players}
              setPlayers={setPlayers}
              matchType={matchType}
            />
          ) : (
            <div>TODO: preview screen</div>
          )}
        </Styled.Content>
      </Container>
      <StartMatchFooter
        canGoNext={canGoNext}
        canGoBack={step !== Steps.MatchTypeSelection}
        onClickBack={() => setStep((s) => s - 1)}
        onClickNext={() => setStep((s) => s + 1)}
      />
    </>
  );
};
