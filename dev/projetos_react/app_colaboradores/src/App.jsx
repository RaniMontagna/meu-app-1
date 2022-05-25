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
import { TipoRequisicaoProvider } from './Context/tipoRequisicaoContext';
import { SolicitantesProvider } from './Context/solicitantesContext';

function App() {
  const Colaboradores = lazy(() => import('./Pages/colaboradores/colaboradores'));
  const Solicitantes = lazy(() => import('./Pages/solicitantes/solicitantes'));
  const TipoRequisicao = lazy(() => import('./Pages/tipoRequisicao/tipoRequisicao'));
  const Requisicao = lazy(() => import('./Pages/requisicao/requisicao'));
  const Home = lazy(() => import('./Pages/home/home'));

  return (
    <BrowserRouter>
      <AppProvider>
        <TipoRequisicaoProvider>
          <SolicitantesProvider>
            <Navigation />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/colaboradores" element={<Colaboradores />} />
                <Route path="/solicitantes" element={<Solicitantes />} />
                <Route path="/tipoRequisicao" element={<TipoRequisicao />} />
                <Route path="/requisicao" element={<Requisicao />} />
              </Routes>
            </Suspense>
          </SolicitantesProvider>
        </TipoRequisicaoProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
