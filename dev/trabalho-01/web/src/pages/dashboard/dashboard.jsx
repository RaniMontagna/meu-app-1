import React from 'react';
import PageHeader from '../../components/pageHeader/pageHeader';
import PaginaBase from '../../components/paginaBase/paginaBase';

const Dashboard = () => {
  return (
    <PaginaBase>
      <PageHeader title="Dashboard" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100% - 60px)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontWeight: 100 }}>
          Bem-vindos ao sistema para controlar suas tarefas :)
        </h1>
      </div>
    </PaginaBase>
  );
};

export default Dashboard;
