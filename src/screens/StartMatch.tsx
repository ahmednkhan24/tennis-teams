import { MatchTypeSelection } from 'components/MatchTypeSelection';
import { NumPlayersSelector } from 'components/NumPlayersSelector';
import { StartMatchFooter } from 'components/StartMatchFooter';
import { useCallback, useState } from 'react';
import React from 'react';
import Container from 'react-bootstrap/Container';

// todo: prevent content from overlapping footer and going out of view

export const StartMatch: React.FC = () => {
  const [matchType, setMatchType] = useState('');
  const [isMatchTypeSelectionStep, setIsMatchTypeSelectionStep] =
    useState(true);
  const [isNumPlayerSelectorStep, setIsNumPlayerSelectorStep] = useState(false);

  const onClickBack = useCallback(() => {
    if (isNumPlayerSelectorStep) {
      setIsNumPlayerSelectorStep(false);
      setIsMatchTypeSelectionStep(true);
    }
  }, [isNumPlayerSelectorStep]);

  const onClickNext = useCallback(() => {
    setIsMatchTypeSelectionStep(false);
    if (!isNumPlayerSelectorStep) {
      setIsNumPlayerSelectorStep(true);
    }
  }, [isNumPlayerSelectorStep]);

  return (
    <Container className="pt-3">
      {isMatchTypeSelectionStep ? (
        <MatchTypeSelection matchType={matchType} setMatchType={setMatchType} />
      ) : isNumPlayerSelectorStep ? (
        <NumPlayersSelector matchType={matchType} />
      ) : (
        <div>TODO: preview screen</div>
      )}
      <StartMatchFooter
        matchType={matchType}
        isMatchTypeSelection={isMatchTypeSelectionStep}
        onClickBack={onClickBack}
        onClickNext={onClickNext}
      />
    </Container>
  );
};
