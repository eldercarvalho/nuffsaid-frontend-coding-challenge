import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#88FCA3',
    },
    secondary: {
      main: '#FCE788',
    },
    error: {
      main: '#F56236',
    },
  },
});

export const Theme: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
