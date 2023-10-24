import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export let theme = createTheme({
  palette: {
    primary: {
      main: "#1EC6A8",
      contrastText: "#fff"
    },
    secondary: {
      main: "#21127D"
    }
  },
  typography: {
    fontFamily: "'Gothic A1', sans-serif",
    button: {
      fontWeight: "bold"
    },
    overline: {
      color: grey[700]
    },
    caption: {
      color: grey[700]
    }
  }
});

theme = responsiveFontSizes(theme);
