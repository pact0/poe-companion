import styled from "@emotion/styled";

export const theme = {
  color: {
    primary: 'hotpink',
    positive: 'hotpink',
    negative: 'hotpink'
  }
};

export type ThemeSchema = typeof theme;

declare module '@emotion/react' {
  /* eslint-disable-next-line */
  export interface Theme extends ThemeSchema { }
}

export const Button = styled.button`
  color: ${props => props.theme.color.primary};
  background: none;
  padding: 0px 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

