import React from 'react';

import { AndamentoProvider } from '../../Context/andamentoContext';
import AndamentoDataTable from './andamentoDataTable/andamentoDataTable';

const Andamento = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Andamento</h1>
      <AndamentoDataTable />
    </div>
  );
};

const AndamentoWrapper = () => {
  return (
    <AndamentoProvider>
      <Andamento />
    </AndamentoProvider>
  );
};

export default AndamentoWrapper;
