/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useCategoriasListagem } from '../../categoriasListagem/useCategoriasListagem';
import useCategorias from '../../../../hooks/useCategorias';
import useAdicionarEditarDialog from './useAdicionarEditarDialog';

const AdicionarEditarDialog = () => {
  const { buscarCategoriaPorId } = useCategoriasListagem();
  const { register, handleSubmit, setValue } = useForm();
  const { adicionarEditarDialog } = useCategorias();

  const { onSubmit, handleClose } = useAdicionarEditarDialog();

  const _buscarCategoriaPorId = async (id) => {
    const { titulo, descricao } = await buscarCategoriaPorId(id);
    setValue('titulo', titulo);
    setValue('descricao', descricao);
  };

  React.useEffect(() => {
    if (adicionarEditarDialog.codigo) {
      _buscarCategoriaPorId(adicionarEditarDialog.codigo);
    }
  }, [adicionarEditarDialog]);

  return (
    <Dialog open={adicionarEditarDialog.open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {adicionarEditarDialog.codigo ? 'Editar categoria' : 'Adicionar categoria'}
        </DialogTitle>
        <DialogContent>
          <TextField
            {...register('titulo')}
            autoFocus
            margin="dense"
            label="Titulo"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
            required
          />
          <TextField
            {...register('descricao')}
            margin="dense"
            label="Descrição"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarDialog;
