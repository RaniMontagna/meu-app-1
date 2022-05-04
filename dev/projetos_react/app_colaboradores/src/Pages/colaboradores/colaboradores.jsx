import React, { useContext } from 'react';

import ColaboradoresList from './colaboradoresList';
import ColaboradorForm from './colaboradoresForm';
import ColaboradoresContext, { ColaboradoresProvider } from './colaboradoresContext';

import { Toast } from 'primereact/toast';

const Colaboradores = () => {
  const { toastRef, editando, setEditando } = useContext(ColaboradoresContext);

  return (
    <div style={{ textAlign: 'center' }}>
      <Toast ref={toastRef} />
      <h1>Colaboradores</h1>
      {!editando.open ? (
        <ColaboradoresList editando={editando} setEditando={setEditando} />
      ) : (
        <ColaboradorForm editando={editando} setEditando={setEditando} />
      )}
    </div>
  );
};

const ColaboradoresWrapper = () => {
  return (
    <ColaboradoresProvider>
      <Colaboradores />
    </ColaboradoresProvider>
  );
};

export default ColaboradoresWrapper;
