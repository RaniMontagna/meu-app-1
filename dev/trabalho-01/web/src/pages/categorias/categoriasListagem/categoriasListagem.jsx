/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import { useCategoriasListagem } from './useCategoriasListagem';
import DataTable from '../../../components/dataTable/dataTable';
import { MdOutlineEdit, MdOutlineCancel, MdAdd } from 'react-icons/md';

import AdicionarEditarDialog from '../dialog/adicionarEditarDialog/adicionarEditarDialog';
import ExcluirDialog from '../dialog/excluirDialog/excluirDialog';
import useCategorias from '../../../hooks/useCategorias';

const CategoriasListagem = () => {
  const { listarCategorias } = useCategoriasListagem();
  const {
    setAdicionarEditarDialog,
    setExcluirDialog,
    adicionarEditarDialog,
    excluirDialog,
    data,
  } = useCategorias();

  React.useEffect(() => {
    if (data === null) {
      listarCategorias();
    }
  }, []);

  const columns = ['Titulo', 'Descrição'];

  const rows = useMemo(() => {
    if (data) {
      return data.map((it) => {
        return {
          titulo: it.titulo,
          descricao: it.descricao,
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
          label: 'Nova Categoria',
          icon: <MdAdd size={24} />,
          onClick: () => setAdicionarEditarDialog({ open: true }),
        }}
      />
      {adicionarEditarDialog?.open && <AdicionarEditarDialog />}
      {excluirDialog?.open && <ExcluirDialog />}
    </>
  );
};

export default CategoriasListagem;
