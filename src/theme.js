import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2EC4B6',
    },
    secondary: {
      main: '#CBF3F0',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    formLabel: {
      root: 'rgba(0, 0, 0, 0.54)',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Lato', 'Roboto', 'Open Sans'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  shade: {
    light: '0 10px 15px -5px rgba(62, 57, 107, .07)',
  },
  rounded: {
    small: '8px',
    medium: '12px',
    big: '20px',
  },
});

export default theme;
