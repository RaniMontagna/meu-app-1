import { Router } from './routes/routes';
import { GlobalProvider } from './store/global/globalContext';

function App() {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
