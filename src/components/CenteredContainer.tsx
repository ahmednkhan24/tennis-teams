import { ReactNode } from 'react';
import styled from '@emotion/styled';

const Styled = {
  Centered: styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

export interface CenteredContainerProps {
  children: ReactNode;
}

export const CenteredContainer: React.FC<CenteredContainerProps> = ({
  children,
}) => <Styled.Centered>{children}</Styled.Centered>;
