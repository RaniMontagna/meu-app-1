import React from 'react';
import PageHeader from '../../components/pageHeader/pageHeader';
import PaginaBase from '../../components/paginaBase/paginaBase';
import TarefasListagem from './tarefasListagem/tarefasListagem';

const Tarefas = () => {
  return (
    <PaginaBase>
      <PageHeader title="Tarefas" />
      <TarefasListagem />
    </PaginaBase>
  );
};

export default Tarefas;
