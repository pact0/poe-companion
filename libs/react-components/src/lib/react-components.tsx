import styled from "@emotion/styled";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { Global, css } from '@emotion/react'

import { createTheme } from '@mui/material/styles';

export let mui_theme = createTheme({
  palette: {
    chip: {
      color: "blue"
    },
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
  },
  typography: {
    fontFamily: 'Fontin SmallCaps',
  },
});

export const GlobalStyles = () => {
  return (<Global
    styles={css`
    *{
        margin: 0px;
        padding: 0px;
        color: black;
        font-family: "Fontin SmallCaps";
    }
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }
    html, body {
        height: 100%;
    }
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }
    input, button, textarea, select {
        font: inherit;
    }
    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }

      `}
  />)
}

console.log(mui_theme);

export const theme = {
  color: {
    primary: 'hotpink',
    positive: 'hotpink',
    negative: 'hotpink'
  }
};


export type MuiThemeSchema = typeof mui_theme;
export type ThemeSchema = typeof theme;


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

declare module '@emotion/react' {
  /* eslint-disable-next-line */
  export interface Theme extends ThemeSchema { }
}


declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    chip: {
      color: string;
    };
  }
}
