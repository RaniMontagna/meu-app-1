import { BrowserRouter } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import Providers from './Components/providers/providers';
import Routes from './Routes/routes';

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
