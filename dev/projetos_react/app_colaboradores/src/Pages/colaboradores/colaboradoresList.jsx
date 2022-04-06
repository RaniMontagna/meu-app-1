import React from 'react';

import useColaboradores from './useColaboradores';

const ColaboradoresList = ({ editando, setEditando }) => {
  const { colaboradores, removerColaborador } = useColaboradores({ setEditando });

  return (
    <div>
      <h4>Listagem de colaboradores</h4>
      <button type="button" class="btn btn-primary btn-sm" onClick={() => setEditando({ open: true })}>
        Inserir
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.length > 0 ? (
            colaboradores.map((o, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{o.nome}</td>
                <td>{o.email}</td>
                <td>{o.senha}</td>
                <td>
                  <button onClick={() => setEditando({ open: true, colaborador: o })} class="btn btn-warning btn-sm">
                    Editar
                  </button>
                  <button onClick={() => removerColaborador(o._id)} class="btn btn-danger btn-sm">
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Nenhum colaborador.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ColaboradoresList;
