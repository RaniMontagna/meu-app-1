import React from 'react';
import TipoRequisicaoDataTable from './tipoRequisicaoDataTable/tipoRequisicaoDataTable';

const TipoRequisicao = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tipos de Requisições</h1>
      <TipoRequisicaoDataTable />
    </div>
  );
};

export default TipoRequisicao;
