/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useTarefasListagem } from '../../tarefasListagem/useTarefasListagem';
import useTarefas from '../../../../hooks/useTarefas';
import useAdicionarEditarDialog from './useAdicionarEditarDialog';

const AdicionarEditarDialog = () => {
  const { buscarTarefaPorId } = useTarefasListagem();
  const { register, handleSubmit, setValue } = useForm();
  const { adicionarEditarDialog } = useTarefas();

  const { onSubmit, handleClose, categoriasOptions, responsaveisOptions } =
    useAdicionarEditarDialog();

  const _buscarTarefasPorId = async (id) => {
    const { categoria, descricao, resumo, responsavel } = await buscarTarefaPorId(id);
    setValue('resumo', resumo);
    setValue('categoria', categoria);
    setValue('responsavel', responsavel);
    setValue('descricao', descricao);
  };

  React.useEffect(() => {
    if (adicionarEditarDialog.codigo) {
      _buscarTarefasPorId(adicionarEditarDialog.codigo);
    }
  }, [adicionarEditarDialog]);

  return (
    <Dialog open={adicionarEditarDialog.open} onClose={handleClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {adicionarEditarDialog.codigo ? 'Editar tarefa' : 'Adicionar tarefa'}
        </DialogTitle>
        <DialogContent>
          <TextField
            {...register('resumo')}
            autoFocus
            margin="dense"
            label="Resumo"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
            required
          />
          <div style={{ margin: '8px 0px' }}>
            <InputLabel id="select-categoria" required>
              Categoria
            </InputLabel>
            <Select
              id="select-categoria"
              placeholder="Categoria"
              {...register('categoria')}
              label="Categoria"
              required
              fullWidth
            >
              {categoriasOptions?.map((it) => {
                return (
                  <MenuItem key={it._id} value={it._id}>
                    {it.titulo}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div style={{ margin: '8px 0px' }}>
            <InputLabel id="select-responsavel">Responsável</InputLabel>
            <Select
              id="select-responsavel"
              placeholder="Responsável"
              {...register('responsavel')}
              label="Responsável"
              fullWidth
            >
              {responsaveisOptions?.map((it) => {
                return (
                  <MenuItem key={it._id} value={it._id}>
                    {it.nome}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <TextField
            {...register('descricao')}
            autoFocus
            margin="dense"
            label="Descrição"
            type="text"
            multiline
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
