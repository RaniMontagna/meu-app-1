import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import useTipoRequisicao from '../useTipoRequisicao';
import useTipoRequisicaoContext from '../../../Hooks/useTipoRequisicao';
import { HeaderWithSearch } from './tipoRequisicaoDataTable.static';
import AdicionarEditarTipoRequisicao from '../dialogs/adicionarEditarTipoRequisicao';

export const TipoRequisicaoDataTable = () => {
  const { filtrosDataTable, tipoRequisicao } = useTipoRequisicaoContext();
  const { buscarTipoRequisicao, removerTipoRequisicao } = useTipoRequisicao();

  const [confirmarExclusao, setConfirmarExclusao] = useState({ open: false });
  const [adicionarEditarTipoRequisicao, setAdicionarEditarTipoRequisicao] = useState({ open: false });

  useEffect(() => {
    if (tipoRequisicao.length === 0) {
      buscarTipoRequisicao();
    }
  }, [buscarTipoRequisicao, tipoRequisicao.length]);

  return (
    <>
      <DataTable
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        selectionMode="single"
        header={HeaderWithSearch({ setAdicionarEditarTipoRequisicao })}
        filters={filtrosDataTable}
        rowsPerPageOptions={[5, 10]}
        paginatorLeft={<></>}
        paginatorRight={<></>}
        emptyMessage="Nenhum tipo de requisição encontrado"
        value={
          tipoRequisicao?.map((tipoRequisicao, index) => ({
            id: tipoRequisicao._id,
            position: index + 1,
            descricao: tipoRequisicao.descricao,
            actions: (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  label="Editar"
                  className="p-button-outlined p-button-warning"
                  onClick={() => setAdicionarEditarTipoRequisicao({ open: true, tipoRequisicao })}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  label="Excluir"
                  className="p-button-outlined p-button-danger"
                  onClick={() => setConfirmarExclusao({ open: true, id: tipoRequisicao._id })}
                />
              </div>
            ),
          })) ?? []
        }
      >
        <Column field="position" header="Posição" sortable></Column>
        <Column field="descricao" header="Descrição" sortable></Column>
        <Column field="actions" header="Ações" align="right"></Column>
      </DataTable>
      {confirmarExclusao.open && (
        <ConfirmDialog
          visible={confirmarExclusao.open}
          onHide={() => setConfirmarExclusao(false)}
          message="Confirmar a exclusão?"
          header="Confirmação"
          icon="pi pi-question"
          accept={() => removerTipoRequisicao(confirmarExclusao.id)}
        />
      )}
      {adicionarEditarTipoRequisicao.open && (
        <AdicionarEditarTipoRequisicao
          adicionarEditarTipoRequisicao={adicionarEditarTipoRequisicao}
          setAdicionarEditarTipoRequisicao={setAdicionarEditarTipoRequisicao}
        />
      )}
    </>
  );
};

export default TipoRequisicaoDataTable;
