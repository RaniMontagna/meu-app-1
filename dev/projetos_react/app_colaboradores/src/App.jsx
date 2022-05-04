import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import Loading from './Components/loading/loading';
import { Menubar } from 'primereact/menubar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const Colaboradores = lazy(() => import('./Pages/colaboradores/colaboradores'));
  const Home = lazy(() => import('./Pages/home/home'));

  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

const Nav = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'Cadastro',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Colaboradores',
          icon: 'pi pi-fw pi-user',
          command: () => navigate('/colaboradores'),
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

  return <Menubar model={items} />;
};

export default App;
