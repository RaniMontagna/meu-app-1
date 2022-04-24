/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useCategoriasListagem } from '../../categoriasListagem/useCategoriasListagem';
import useCategorias from '../../../../hooks/useListagem';

const ExcluirDialog = () => {
  const { deletarCategoria } = useCategoriasListagem();
  const { excluirDialog, setExcluirDialog } = useCategorias();

  const _handleClose = () => {
    setExcluirDialog({ open: false });
  };
  const _handleSubmit = () => {
    deletarCategoria(excluirDialog.codigo);
    _handleClose();
  };

  return (
    <Dialog open={excluirDialog.open} onClose={_handleClose}>
      <DialogTitle>Excluir categoria?</DialogTitle>
      <DialogContent>
        Você tem certeza que deseja excluir a categoria <b>{excluirDialog.titulo}</b>?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={_handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={_handleSubmit}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExcluirDialog;
