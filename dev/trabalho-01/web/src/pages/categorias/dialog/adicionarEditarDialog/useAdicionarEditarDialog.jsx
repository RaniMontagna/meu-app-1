import useCategorias from '../../../../hooks/useCategorias';
import { useCategoriasListagem } from '../../categoriasListagem/useCategoriasListagem';

const useAdicionarEditarDialog = () => {
  const { setAdicionarEditarDialog, adicionarEditarDialog } = useCategorias();
  const { adicionarCategoria, editarCategoria } = useCategoriasListagem();

  const handleClose = () => {
    setAdicionarEditarDialog({ open: false });
  };

  const onSubmit = (values) => {
    if (adicionarEditarDialog.codigo) {
      editarCategoria({
        _id: adicionarEditarDialog.codigo,
        ...values,
      });
    } else {
      adicionarCategoria(values);
    }

    handleClose();
  };

  return {
    onSubmit,
    handleClose,
  };
};

export default useAdicionarEditarDialog;
