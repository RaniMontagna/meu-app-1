import React from 'react';
import PageHeader from '../../components/pageHeader/pageHeader';
import PaginaBase from '../../components/paginaBase/paginaBase';
import ResponsaveisListagem from './responsaveisListagem/responsaveisListagem';

const Responsaveis = () => {
  return (
    <PaginaBase>
      <PageHeader title="Responsaveis" />
      <ResponsaveisListagem />
    </PaginaBase>
  );
};

export default Responsaveis;
