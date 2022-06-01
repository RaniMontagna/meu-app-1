import React from 'react';

import RequisicaoDataTable from './requisicaoDataTable/requisicaoDataTable';

const Requisicao = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Requisições</h1>
      <RequisicaoDataTable />
    </div>
  );
};

export default Requisicao;
