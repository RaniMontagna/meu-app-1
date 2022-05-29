import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import useRequisicao from '../useRequisicao';
import useRequisicaoContext from '../../../Hooks/useRequisicao';
import { HeaderWithSearch } from './requisicaoDataTable.static';
import AdicionarEditarRequisicao from '../dialogs/adicionarEditarRequisicao';
import moment from 'moment';

export const RequisicaoDataTable = () => {
  const { filtrosDataTable, requisicao } = useRequisicaoContext();
  const { buscarRequisicao, removerRequisicao } = useRequisicao();

  const [confirmarExclusao, setConfirmarExclusao] = useState({ open: false });
  const [adicionarEditarRequisicao, setAdicionarEditarRequisicao] = useState({ open: false });

  useEffect(() => {
    if (requisicao.length === 0) {
      buscarRequisicao();
    }
  }, [buscarRequisicao, requisicao.length]);

  return (
    <>
      <DataTable
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        selectionMode="single"
        header={HeaderWithSearch({ setAdicionarEditarRequisicao })}
        filters={filtrosDataTable}
        rowsPerPageOptions={[5, 10]}
        paginatorLeft={<></>}
        paginatorRight={<></>}
        emptyMessage="Nenhum requisição encontrado"
        value={
          requisicao?.map((requisicao, index) => ({
            id: requisicao._id,
            position: index + 1,
            titulo: requisicao.titulo,
            descricao: requisicao.descricao,
            dataHoraCriada: moment(requisicao.dataHoraCriada).utc().format('DD/MM/YYYY HH:mm'),
            status: requisicao.status,
            prazoAtendimento: moment(requisicao.prazoAtendimento).utc().format('DD/MM/YYYY HH:mm'),
            solicitante: requisicao.solicitante?.nome ?? 'Anônimo',
            tipoRequisicao: requisicao.tipoRequisicao?.descricao ?? 'Não informado',

            actions: (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  label="Editar"
                  className="p-button-outlined p-button-warning"
                  onClick={() => setAdicionarEditarRequisicao({ open: true, requisicao })}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  label="Excluir"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setConfirmarExclusao({ open: true, id: requisicao._id })}
                />
              </div>
            ),
          })) ?? []
        }
      >
        <Column field="position" header="Posição" sortable></Column>
        <Column field="titulo" header="Título" sortable></Column>
        <Column field="dataHoraCriada" header="Data de criação" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
        <Column field="prazoAtendimento" header="Prazo de atendimento" sortable></Column>
        <Column field="solicitante" header="Solicitante" sortable></Column>
        <Column field="tipoRequisicao" header="Tipo de requisição" sortable></Column>

        <Column field="actions" header="Ações" align="right"></Column>
      </DataTable>
      {confirmarExclusao.open && (
        <ConfirmDialog
          visible={confirmarExclusao.open}
          onHide={() => setConfirmarExclusao(false)}
          message="Confirmar a exclusão?"
          header="Confirmação"
          icon="pi pi-question"
          accept={() => removerRequisicao(confirmarExclusao.id)}
        />
      )}
      {adicionarEditarRequisicao.open && (
        <AdicionarEditarRequisicao
          adicionarEditarRequisicao={adicionarEditarRequisicao}
          setAdicionarEditarRequisicao={setAdicionarEditarRequisicao}
        />
      )}
    </>
  );
};

export default RequisicaoDataTable;
