/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import React from 'react';
// import { useCategoriasListagem } from '../../categoriasListagem/useCategoriasListagem';

const AdicionarEditarDialog = ({ adicionarEditarDialog, setAdicionarEditarDialog }) => {
  // const { buscarCategoriaPorId } = useCategoriasListagem();

  const _handleClose = () => {
    setAdicionarEditarDialog({ open: false });
  };
  const _handleSubmit = (values) => {
    _handleClose();
  };

  const _buscarCategoriaPorId = async (id) => {
    // const res = await buscarCategoriaPorId(id);
    //TODO: fazer lógica para colocar valores no form
  };

  React.useEffect(() => {
    if (adicionarEditarDialog.codigo) {
      _buscarCategoriaPorId(adicionarEditarDialog.codigo);
    }
  }, [adicionarEditarDialog]);

  return (
    <FormControl>
      <Dialog open={adicionarEditarDialog.open} onClose={_handleClose}>
        <DialogTitle>Adicionar categoria</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label="Titulo"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={_handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={_handleSubmit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
};

export default AdicionarEditarDialog;
