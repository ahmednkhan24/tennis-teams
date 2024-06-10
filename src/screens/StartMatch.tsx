import styled from '@emotion/styled';
import { MatchTypeSelection } from 'components/MatchTypeSelection';
import { NumPlayersSelector } from 'components/NumPlayersSelector';
import { StartMatchFooter } from 'components/StartMatchFooter';
import { useCallback, useState } from 'react';
import React from 'react';
import Container from 'react-bootstrap/Container';

// todo: prevent content from overlapping footer and going out of view
const Styled = {
  Steps: styled.span({}),
};

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
      <Styled.Steps>
        {isMatchTypeSelectionStep ? (
          <MatchTypeSelection
            matchType={matchType}
            setMatchType={setMatchType}
          />
        ) : isNumPlayerSelectorStep ? (
          <NumPlayersSelector />
        ) : (
          <div>TODO: preview screen</div>
        )}
      </Styled.Steps>
      <StartMatchFooter
        matchType={matchType}
        isMatchTypeSelection={isMatchTypeSelectionStep}
        onClickBack={onClickBack}
        onClickNext={onClickNext}
      />
    </Container>
  );
};
