import React from 'react';

import ColaboradoresList from './colaboradoresList';
import ColaboradorForm from './colaboradoresForm';

const Colaboradores = () => {
  const [editando, setEditando] = React.useState({ open: false, colaborador: {} });

  return (
    <div>
      <h1>Colaboradores</h1>
      {!editando.open ? (
        <ColaboradoresList editando={editando} setEditando={setEditando} />
      ) : (
        <ColaboradorForm editando={editando} setEditando={setEditando} />
      )}
    </div>
  );
};

export default Colaboradores;
