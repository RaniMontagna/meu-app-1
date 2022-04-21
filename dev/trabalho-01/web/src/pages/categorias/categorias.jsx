import React from 'react';
import PageHeader from '../../components/pageHeader/pageHeader';
import PaginaBase from '../../components/paginaBase/paginaBase';
import CategoriasListagem from './categoriasListagem/categoriasListagem';

const Categorias = () => {
  return (
    <PaginaBase>
      <PageHeader title="Categorias" />
      <CategoriasListagem />
    </PaginaBase>
  );
};

export default Categorias;
