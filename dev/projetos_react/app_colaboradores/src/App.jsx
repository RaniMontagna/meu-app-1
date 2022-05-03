import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import Loading from './Components/loading/loading';
import { Menubar } from 'primereact/menubar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const Colaboradores = lazy(() => import('./Pages/colaboradores/colaboradores'));
  const Home = lazy(() => import('./Pages/home/home'));

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        window.location = '/';
      },
    },
    {
      label: 'Cadastro',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Usuários',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/usuarios';
          },
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

  return (
    <BrowserRouter>
      <div>
        <Menubar model={items} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/usuarios" element={<Colaboradores />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
