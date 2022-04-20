import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Rota from './rota';

import Dashboard from '../pages/dashboard/dashboard';
import Tarefas from '../pages/tarefas/tarefas';
import Responsaveis from '../pages/responsaveis/responsaveis';
import Categorias from '../pages/categorias/categorias';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rota element={<Dashboard />} />} />
        <Route path="/tarefas" element={<Rota element={<Tarefas />} />} />
        <Route path="/responsaveis" element={<Rota element={<Responsaveis />} />} />
        <Route path="/categorias" element={<Rota element={<Categorias />} />} />
        <Route path="*" element={<Rota element={<Navigate to="/" />} />} />
      </Routes>
    </BrowserRouter>
  );
};
