/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import { useResponsaveisListagem } from './useResponsaveisListagem';
import DataTable from '../../../components/dataTable/dataTable';
import { MdOutlineEdit, MdOutlineCancel, MdAdd } from 'react-icons/md';

import AdicionarEditarDialog from '../dialog/adicionarEditarDialog/adicionarEditarDialog';
import ExcluirDialog from '../dialog/excluirDialog/excluirDialog';
import useResponsaveis from '../../../hooks/useResponsaveis';

const ResponsaveisListagem = () => {
  const { listarResponsaveis } = useResponsaveisListagem();
  const {
    setAdicionarEditarDialog,
    setExcluirDialog,
    adicionarEditarDialog,
    excluirDialog,
    data,
  } = useResponsaveis();

  React.useEffect(() => {
    if (data === null) {
      listarResponsaveis();
    }
  }, []);

  const columns = ['Nome', 'Email'];

  const rows = useMemo(() => {
    if (data) {
      return data.map((it) => {
        return {
          nome: it.nome,
          email: it.email,
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
          label: 'Novo Responsável',
          icon: <MdAdd size={24} />,
          onClick: () => setAdicionarEditarDialog({ open: true }),
        }}
      />
      {adicionarEditarDialog?.open && <AdicionarEditarDialog />}
      {excluirDialog?.open && <ExcluirDialog />}
    </>
  );
};

export default ResponsaveisListagem;
