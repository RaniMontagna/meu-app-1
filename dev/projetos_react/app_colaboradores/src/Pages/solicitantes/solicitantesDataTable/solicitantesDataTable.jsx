import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import useSolicitantes from '../useSolicitantes';
import useSolicitantesContext from '../../../Hooks/useSolicitantes';
import { HeaderWithSearch } from './solicitantesDataTable.static';
import AdicionarEditarSolicitante from '../dialogs/adicionarEditarSolicitante';

export const SolicitantesDataTable = () => {
  const { filtrosDataTable, solicitantes } = useSolicitantesContext();
  const { buscarSolicitantes, removerSolicitante } = useSolicitantes();

  const [confirmarExclusao, setConfirmarExclusao] = useState({ open: false });
  const [adicionarEditarSolicitante, setAdicionarEditarSolicitante] = useState({ open: false });

  useEffect(() => {
    if (solicitantes.length === 0) {
      buscarSolicitantes();
    }
  }, [buscarSolicitantes, solicitantes.length]);

  return (
    <>
      <DataTable
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        selectionMode="single"
        header={HeaderWithSearch({ setAdicionarEditarSolicitante })}
        filters={filtrosDataTable}
        rowsPerPageOptions={[5, 10]}
        paginatorLeft={<></>}
        paginatorRight={<></>}
        emptyMessage="Nenhum solicitante encontrado"
        value={
          solicitantes?.map((solicitante, index) => ({
            id: solicitante._id,
            position: index + 1,
            name: solicitante.nome,
            email: solicitante.email,
            actions: (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  label="Editar"
                  className="p-button-outlined p-button-warning"
                  onClick={() => setAdicionarEditarSolicitante({ open: true, solicitante })}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  label="Excluir"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setConfirmarExclusao({ open: true, id: solicitante._id })}
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
          accept={() => removerSolicitante(confirmarExclusao.id)}
        />
      )}
      {adicionarEditarSolicitante.open && (
        <AdicionarEditarSolicitante
          adicionarEditarSolicitante={adicionarEditarSolicitante}
          setAdicionarEditarSolicitante={setAdicionarEditarSolicitante}
        />
      )}
    </>
  );
};

export default SolicitantesDataTable;
