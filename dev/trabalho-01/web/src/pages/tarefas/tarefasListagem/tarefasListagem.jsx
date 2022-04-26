/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import { useTarefasListagem } from './useTarefasListagem';
import DataTable from '../../../components/dataTable/dataTable';
import { MdOutlineEdit, MdOutlineCancel, MdAdd } from 'react-icons/md';

import AdicionarEditarDialog from '../dialog/adicionarEditarDialog/adicionarEditarDialog';
import ExcluirDialog from '../dialog/excluirDialog/excluirDialog';
import useTarefas from '../../../hooks/useTarefas';

const TarefasListagem = () => {
  const { listarTarefas } = useTarefasListagem();

  const {
    setAdicionarEditarDialog,
    setExcluirDialog,
    adicionarEditarDialog,
    excluirDialog,
    data,
  } = useTarefas();

  React.useEffect(() => {
    if (data === null) {
      listarTarefas();
    }
  }, []);

  const columns = ['Resumo', 'Categoria', 'Responsável', 'Status'];

  const rows = useMemo(() => {
    if (data) {
      return data.map((it) => {
        return {
          resumo: it?.resumo,
          categoria: it?.categoria?.titulo ?? '',
          responsavel: it.responsavel?.nome ?? '',
          status: it?.status === 0 ? 'Aberto' : 'Fechado',
          actions: [
            {
              label: 'Editar',
              icon: <MdOutlineEdit size={16} />,
              action: () => setAdicionarEditarDialog({ open: true, codigo: it._id }),
            },
            {
              label: 'Excluir',
              icon: <MdOutlineCancel size={16} />,
              action: () =>
                setExcluirDialog({
                  open: true,
                  codigo: it._id,
                  titulo: it.titulo,
                }),
            },
          ],
        };
      });
    }
    return [];
  }, [data]);

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        fab={{
          label: 'Nova Tarefa',
          icon: <MdAdd size={24} />,
          onClick: () => setAdicionarEditarDialog({ open: true }),
        }}
      />
      {adicionarEditarDialog?.open && <AdicionarEditarDialog />}
      {excluirDialog?.open && <ExcluirDialog />}
    </>
  );
};

export default TarefasListagem;
