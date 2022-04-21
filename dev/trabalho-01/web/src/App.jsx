import { Router } from './routes/routes';
import { GlobalProvider } from './store/global/globalContext';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <GlobalProvider>
        <Router />
      </GlobalProvider>
    </SnackbarProvider>
  );
}

export default App;
