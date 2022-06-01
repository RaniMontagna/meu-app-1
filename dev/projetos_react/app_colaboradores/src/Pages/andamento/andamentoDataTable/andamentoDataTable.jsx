import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import useAndamento from '../useAndamento';
import useAndamentoContext from '../../../Hooks/useAndamento';
import { HeaderWithSearch } from './andamentoDataTable.static';
import AdicionarEditarAndamento from '../dialogs/adicionarEditarAndamento';
import moment from 'moment';

export const AndamentoDataTable = () => {
  const { filtrosDataTable, andamento } = useAndamentoContext();
  const { buscarAndamento, removerAndamento } = useAndamento();

  const [confirmarExclusao, setConfirmarExclusao] = useState({ open: false });
  const [adicionarEditarAndamento, setAdicionarEditarAndamento] = useState({ open: false });

  useEffect(() => {
    if (andamento.length === 0) {
      buscarAndamento();
    }
  }, [buscarAndamento, andamento.length]);

  return (
    <>
      <DataTable
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        selectionMode="single"
        header={HeaderWithSearch({ setAdicionarEditarAndamento })}
        filters={filtrosDataTable}
        rowsPerPageOptions={[5, 10]}
        paginatorLeft={<></>}
        paginatorRight={<></>}
        emptyMessage="Nenhum andamento encontrado"
        value={
          andamento?.map((andamento, index) => ({
            id: andamento._id,
            position: index + 1,
            dataHora: moment(andamento?.dataHora).utc().format('DD/MM/YYYY HH:mm'),
            titulo: andamento?.titulo,
            descricao: andamento?.descricao,
            colaborador: andamento?.colaborador?.nome,
            atividade: andamento?.atividade?.titulo,
            actions: (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  label="Editar"
                  className="p-button-outlined p-button-warning"
                  onClick={() => setAdicionarEditarAndamento({ open: true, andamento })}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  label="Excluir"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setConfirmarExclusao({ open: true, id: andamento._id })}
                />
              </div>
            ),
          })) ?? []
        }
      >
        <Column field="position" header="Posição" sortable></Column>
        <Column field="dataHora" header="DataHora" sortable></Column>
        <Column field="titulo" header="Título" sortable></Column>
        <Column field="descricao" header="Descrição" sortable></Column>
        <Column field="colaborador" header="Colaborador" align="right"></Column>
        <Column field="atividade" header="Atividade" align="right"></Column>
        <Column field="actions" header="Ações" align="right"></Column>
      </DataTable>
      {confirmarExclusao.open && (
        <ConfirmDialog
          visible={confirmarExclusao.open}
          onHide={() => setConfirmarExclusao(false)}
          message="Confirmar a exclusão?"
          header="Confirmação"
          icon="pi pi-question"
          accept={() => removerAndamento(confirmarExclusao.id)}
        />
      )}
      {adicionarEditarAndamento.open && (
        <AdicionarEditarAndamento
          adicionarEditarAndamento={adicionarEditarAndamento}
          setAdicionarEditarAndamento={setAdicionarEditarAndamento}
        />
      )}
    </>
  );
};

export default AndamentoDataTable;
