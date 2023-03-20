import { createTheme } from '@mui/material/styles';
import { red, green, purple } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],

    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;
