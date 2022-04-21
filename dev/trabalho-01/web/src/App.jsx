import { Router } from './routes/routes';
import { GlobalProvider } from './store/global/globalContext';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material';
import { tema } from './themes/tema';

function App() {
  const theme = createTheme(tema);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <GlobalProvider>
          <Router />
        </GlobalProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
