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
});

export default theme;
