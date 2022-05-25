import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import useColaboradores from '../useColaboradores';
import useColaboradoresContext from '../../../Hooks/useColaboradores';
import { HeaderWithSearch } from './colaboradoresDataTable.static';
import AdicionarEditarColaborador from '../dialogs/adicionarEditarColaborador';

export const ColaboradoresDataTable = () => {
  const { filtrosDataTable, colaboradores } = useColaboradoresContext();
  const { buscarColaboradores, removerColaborador } = useColaboradores();

  const [confirmarExclusao, setConfirmarExclusao] = useState({ open: false });
  const [adicionarEditarColaborador, setAdicionarEditarColaborador] = useState({ open: false });

  useEffect(() => {
    if (colaboradores.length === 0) {
      buscarColaboradores();
    }
  }, [buscarColaboradores, colaboradores.length]);

  return (
    <>
      <DataTable
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        selectionMode="single"
        header={HeaderWithSearch({ setAdicionarEditarColaborador })}
        filters={filtrosDataTable}
        rowsPerPageOptions={[5, 10]}
        paginatorLeft={<></>}
        paginatorRight={<></>}
        emptyMessage="Nenhum colaborador encontrado"
        value={
          colaboradores?.map((colaborador, index) => ({
            id: colaborador._id,
            position: index + 1,
            name: colaborador.nome,
            email: colaborador.email,
            actions: (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  label="Editar"
                  className="p-button-outlined p-button-warning"
                  onClick={() => setAdicionarEditarColaborador({ open: true, colaborador })}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  label="Excluir"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setConfirmarExclusao({ open: true, id: colaborador._id })}
                />
              </div>
            ),
          })) ?? []
        }
      >
        <Column field="position" header="Posição" sortable></Column>
        <Column field="name" header="Nome" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="actions" header="Ações" align="right"></Column>
      </DataTable>
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
      {adicionarEditarColaborador.open && (
        <AdicionarEditarColaborador
          adicionarEditarColaborador={adicionarEditarColaborador}
          setAdicionarEditarColaborador={setAdicionarEditarColaborador}
        />
      )}
    </>
  );
};

export default ColaboradoresDataTable;
