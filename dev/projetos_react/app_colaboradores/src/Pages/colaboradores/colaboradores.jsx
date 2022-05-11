import React from 'react';

import { ColaboradoresProvider } from '../../Context/colaboradoresContext';
import ColaboradoresDataTable from './colaboradoresDataTable/colaboradoresDataTable';

const Colaboradores = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Colaboradores</h1>
      <ColaboradoresDataTable />
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
