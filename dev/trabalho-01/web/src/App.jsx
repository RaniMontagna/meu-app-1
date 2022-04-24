import { Router } from './routes/routes';
import { GlobalProvider } from './store/global/globalContext';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material';
import { tema } from './themes/tema';

import { CategoriasProvider } from './store/categorias/categoriasContext';
import { ResponsaveisProvider } from './store/responsaveis/responsaveisContext';

const Providers = ({ children }) => {
  return (
    <GlobalProvider>
      <CategoriasProvider>
        <ResponsaveisProvider>{children}</ResponsaveisProvider>
      </CategoriasProvider>
    </GlobalProvider>
  );
};

const App = () => {
  const theme = createTheme(tema);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Providers>
          <Router />
        </Providers>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
