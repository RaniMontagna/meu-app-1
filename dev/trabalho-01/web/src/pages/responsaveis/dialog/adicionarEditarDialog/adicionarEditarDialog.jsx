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
import { useResponsaveisListagem } from '../../responsaveisListagem/useResponsaveisListagem';
import useResponsaveis from '../../../../hooks/useResponsaveis';
import useAdicionarEditarDialog from './useAdicionarEditarDialog';

const AdicionarEditarDialog = () => {
  const { buscarResponsavelPorId } = useResponsaveisListagem();
  const { register, handleSubmit, setValue } = useForm();
  const { adicionarEditarDialog } = useResponsaveis();

  const { onSubmit, handleClose } = useAdicionarEditarDialog();

  const _buscarResponsavelPorId = async (id) => {
    const { nome, email } = await buscarResponsavelPorId(id);
    setValue('nome', nome);
    setValue('email', email);
  };

  React.useEffect(() => {
    if (adicionarEditarDialog.codigo) {
      _buscarResponsavelPorId(adicionarEditarDialog.codigo);
    }
  }, [adicionarEditarDialog]);

  return (
    <Dialog open={adicionarEditarDialog.open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {adicionarEditarDialog.codigo ? 'Editar responsável' : 'Adicionar responsável'}
        </DialogTitle>
        <DialogContent>
          <TextField
            {...register('nome')}
            autoFocus
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
            required
          />
          <TextField
            {...register('email')}
            margin="dense"
            label="Email"
            type="email"
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
