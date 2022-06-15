import { lazy, Suspense } from 'react';
import { isExpired } from 'react-jwt';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '../Components/loading/loading';

import Navigation from '../Components/navigation/navigation';
import useApp from '../Hooks/useApp';

const Router = () => {
  const Colaboradores = lazy(() => import('../Pages/colaboradores/colaboradores'));
  const Solicitantes = lazy(() => import('../Pages/solicitantes/solicitantes'));
  const TipoRequisicao = lazy(() => import('../Pages/tipoRequisicao/tipoRequisicao'));
  const Requisicao = lazy(() => import('../Pages/requisicao/requisicao'));
  const Home = lazy(() => import('../Pages/home/home'));
  const Andamento = lazy(() => import('../Pages/andamento/andamento'));
  const Atividade = lazy(() => import('../Pages/atividade/atividade'));
  const Login = lazy(() => import('../Pages/login/login'));

  const { token } = useApp();
  const isMyTokenExpired = isExpired(token);

  return (
    <>
      {!(isMyTokenExpired | !token) && <Navigation />}
      <Suspense fallback={<Loading />}>
        <Routes>
          {isMyTokenExpired | !token ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/colaboradores" element={<Colaboradores />} />
              <Route path="/solicitantes" element={<Solicitantes />} />
              <Route path="/tipoRequisicao" element={<TipoRequisicao />} />
              <Route path="/requisicao" element={<Requisicao />} />
              <Route path="/andamento" element={<Andamento />} />
              <Route path="/atividade" element={<Atividade />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
