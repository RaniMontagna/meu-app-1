import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import useAtividade from '../useAtividade';
import useAtividadeContext from '../../../Hooks/useAtividade';
import { HeaderWithSearch } from './atividadeDataTable.static';
import AdicionarEditarAtividade from '../dialogs/adicionarEditarAtividade';
import moment from 'moment';

export const AtividadeDataTable = () => {
  const { filtrosDataTable, atividade } = useAtividadeContext();
  const { buscarAtividade, removerAtividade } = useAtividade();

  const [confirmarExclusao, setConfirmarExclusao] = useState({ open: false });
  const [adicionarEditarAtividade, setAdicionarEditarAtividade] = useState({ open: false });

  useEffect(() => {
    if (atividade.length === 0) {
      buscarAtividade();
    }
  }, [buscarAtividade, atividade.length]);

  return (
    <>
      <DataTable
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        selectionMode="single"
        header={HeaderWithSearch({ setAdicionarEditarAtividade })}
        filters={filtrosDataTable}
        rowsPerPageOptions={[5, 10]}
        paginatorLeft={<></>}
        paginatorRight={<></>}
        emptyMessage="Nenhum atividade encontrado"
        value={
          atividade?.map((atividade, index) => ({
            id: atividade._id,
            position: index + 1,
            titulo: atividade?.titulo,
            descricao: atividade?.descricao,
            status: atividade?.status,
            prazo: moment(atividade?.prazo).format('DD/MM/YYYY HH:mm'),
            colaborador: atividade?.colaborador?.nome,
            requisicao: atividade?.requisicao?.titulo,
            actions: (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  label="Editar"
                  className="p-button-outlined p-button-warning"
                  onClick={() => setAdicionarEditarAtividade({ open: true, atividade })}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  label="Excluir"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setConfirmarExclusao({ open: true, id: atividade._id })}
                />
              </div>
            ),
          })) ?? []
        }
      >
        <Column field="position" header="Posição" sortable></Column>
        <Column field="titulo" header="Título" sortable></Column>
        <Column field="descricao" header="Descrição" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
        <Column field="prazo" header="Prazo" sortable></Column>
        <Column field="colaborador" header="Colaborador"></Column>
        <Column field="requisicao" header="Requisicao"></Column>
        <Column field="actions" header="Ações" align="right"></Column>
      </DataTable>
      {confirmarExclusao.open && (
        <ConfirmDialog
          visible={confirmarExclusao.open}
          onHide={() => setConfirmarExclusao(false)}
          message="Confirmar a exclusão?"
          header="Confirmação"
          icon="pi pi-question"
          accept={() => removerAtividade(confirmarExclusao.id)}
        />
      )}
      {adicionarEditarAtividade.open && (
        <AdicionarEditarAtividade
          adicionarEditarAtividade={adicionarEditarAtividade}
          setAdicionarEditarAtividade={setAdicionarEditarAtividade}
        />
      )}
    </>
  );
};

export default AtividadeDataTable;
