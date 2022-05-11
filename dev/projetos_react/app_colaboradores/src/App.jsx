import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import Loading from './Components/loading/loading';
import Navigation from './Components/navigation/navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './Context/appContext';

function App() {
  const Colaboradores = lazy(() => import('./Pages/colaboradores/colaboradores'));
  const Home = lazy(() => import('./Pages/home/home'));

  return (
    <BrowserRouter>
      <AppProvider>
        <Navigation />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
