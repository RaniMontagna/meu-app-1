import useResponsaveis from '../../../../hooks/useResponsaveis';
import { useResponsaveisListagem } from '../../responsaveisListagem/useResponsaveisListagem';

const useAdicionarEditarDialog = () => {
  const { setAdicionarEditarDialog, adicionarEditarDialog } = useResponsaveis();
  const { adicionarResponsavel, editarResponsavel } = useResponsaveisListagem();

  const handleClose = () => {
    setAdicionarEditarDialog({ open: false });
  };

  const onSubmit = (values) => {
    if (adicionarEditarDialog.codigo) {
      editarResponsavel({
        _id: adicionarEditarDialog.codigo,
        ...values,
      });
    } else {
      adicionarResponsavel(values);
    }

    handleClose();
  };

  return {
    onSubmit,
    handleClose,
  };
};

export default useAdicionarEditarDialog;
