import { useEffect, useMemo } from 'react';
import useCategorias from '../../../../hooks/useCategorias';
import useResponsaveis from '../../../../hooks/useResponsaveis';
import useTarefas from '../../../../hooks/useTarefas';

import { useTarefasListagem } from '../../tarefasListagem/useTarefasListagem';
import { useResponsaveisListagem } from '../../../responsaveis/responsaveisListagem/useResponsaveisListagem';
import { useCategoriasListagem } from '../../../categorias/categoriasListagem/useCategoriasListagem';

const useAdicionarEditarDialog = () => {
  const { setAdicionarEditarDialog, adicionarEditarDialog } = useTarefas();
  const { adicionarTarefa, editarTarefa } = useTarefasListagem();

  const { listarResponsaveis } = useResponsaveisListagem();
  const { listarCategorias } = useCategoriasListagem();

  const responsaveis = useResponsaveis();
  const categorias = useCategorias();

  const handleClose = () => {
    setAdicionarEditarDialog({ open: false });
  };

  const onSubmit = (values) => {
    if (adicionarEditarDialog.codigo) {
      editarTarefa({
        _id: adicionarEditarDialog.codigo,
        ...values,
      });
    } else {
      adicionarTarefa(values);
    }

    handleClose();
  };

  useEffect(() => {
    if (responsaveis.data === null) {
      listarResponsaveis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsaveis.data]);

  useEffect(() => {
    if (categorias.data === null) {
      listarCategorias();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorias.data]);

  const responsaveisOptions = useMemo(() => {
    return responsaveis.data;
  }, [responsaveis.data]);

  const categoriasOptions = useMemo(() => {
    return categorias.data;
  }, [categorias.data]);

  return {
    onSubmit,
    handleClose,
    responsaveisOptions,
    categoriasOptions,
  };
};

export default useAdicionarEditarDialog;
