import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import Loading from './Components/loading/loading';
import Navigation from './Components/navigation/navigation';
import Providers from './Components/providers/providers';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const Colaboradores = lazy(() => import('./Pages/colaboradores/colaboradores'));
  const Solicitantes = lazy(() => import('./Pages/solicitantes/solicitantes'));
  const TipoRequisicao = lazy(() => import('./Pages/tipoRequisicao/tipoRequisicao'));
  const Requisicao = lazy(() => import('./Pages/requisicao/requisicao'));
  const Home = lazy(() => import('./Pages/home/home'));
  const Andamento = lazy(() => import('./Pages/andamento/andamento'));
  const Atividade = lazy(() => import('./Pages/atividade/atividade'));

  return (
    <BrowserRouter>
      <Providers>
        <Navigation />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/solicitantes" element={<Solicitantes />} />
            <Route path="/tipoRequisicao" element={<TipoRequisicao />} />
            <Route path="/requisicao" element={<Requisicao />} />
            <Route path="/andamento" element={<Andamento />} />
            <Route path="/atividade" element={<Atividade />} />
          </Routes>
        </Suspense>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
