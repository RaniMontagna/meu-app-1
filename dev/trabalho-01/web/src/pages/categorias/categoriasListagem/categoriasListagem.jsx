/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';

import { useCategoriasListagem } from './useCategoriasListagem';
import DataTable from '../../../components/dataTable/dataTable';
import { MdOutlineEdit, MdOutlineCancel, MdAdd } from 'react-icons/md';

import AdicionarEditarDialog from '../dialog/adicionarEditarDialog/adicionarEditarDialog';

const CategoriasListagem = () => {
  const { listarCategorias, data } = useCategoriasListagem();

  const [adicionarEditarDialog, setAdicionarEditarDialog] = useState({ open: false });

  React.useEffect(() => {
    listarCategorias();
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
              action: () => {
                setAdicionarEditarDialog({ open: true, codigo: it._id });
              },
            },
            {
              label: 'Excluir',
              icon: <MdOutlineCancel size={16} />,
              action: () => {
                console.log('entrou', it._id);
              },
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
      {adicionarEditarDialog?.open && (
        <AdicionarEditarDialog
          adicionarEditarDialog={adicionarEditarDialog}
          setAdicionarEditarDialog={setAdicionarEditarDialog}
        />
      )}
    </>
  );
};

export default CategoriasListagem;
