import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
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
