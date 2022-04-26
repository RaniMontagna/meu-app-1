/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTarefasListagem } from '../../tarefasListagem/useTarefasListagem';
import useTarefas from '../../../../hooks/useTarefas';

const ExcluirDialog = () => {
  const { deletarTarefa } = useTarefasListagem();
  const { excluirDialog, setExcluirDialog } = useTarefas();

  const _handleClose = () => {
    setExcluirDialog({ open: false });
  };
  const _handleSubmit = () => {
    deletarTarefa(excluirDialog.codigo);
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
