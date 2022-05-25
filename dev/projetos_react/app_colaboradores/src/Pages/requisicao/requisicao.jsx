import React from 'react';

import { RequisicaoProvider } from '../../Context/requisicaoContext';

import RequisicaoDataTable from './requisicaoDataTable/requisicaoDataTable';

const Requisicao = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Requisições</h1>
      <RequisicaoDataTable />
    </div>
  );
};

const RequisicaoWrapper = () => {
  return (
    <RequisicaoProvider>
      <Requisicao />
    </RequisicaoProvider>
  );
};

export default RequisicaoWrapper;
