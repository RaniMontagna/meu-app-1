/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';

import ColaboradoresContext from './colaboradoresContext';
import useColaboradores from './useColaboradores';
import { ConfirmDialog } from 'primereact/confirmdialog';

const ColaboradoresList = () => {
  const { setEditando } = useContext(ColaboradoresContext);
  const { colaboradores, removerColaborador, buscarColaboradores } = useColaboradores();
  const [confirmarExclusao, setConfirmarExclusao] = React.useState({ open: false });

  React.useEffect(() => {
    if (colaboradores.length === 0) {
      buscarColaboradores();
    }
  }, []);

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
                  <button onClick={() => setConfirmarExclusao({ open: true, id: o._id })} class="btn btn-danger btn-sm">
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
      {confirmarExclusao.open && (
        <ConfirmDialog
          visible={confirmarExclusao.open}
          onHide={() => setConfirmarExclusao(false)}
          message="Confirmar a exclusão?"
          header="Confirmação"
          icon="pi pi-question"
          accept={() => removerColaborador(confirmarExclusao.id)}
        />
      )}
    </div>
  );
};

export default ColaboradoresList;
