import useGlobal from '../../../hooks/useGlobal';
import useTarefas from '../../../hooks/useTarefas';
import api from '../../../services/api';

export const useTarefasListagem = () => {
  const { toggleLoading, handleErrors, toggleNotificacao } = useGlobal();
  const { setData } = useTarefas();

  const listarTarefas = async () => {
    toggleLoading(true);
    try {
      const res = await api.get('/tarefas');
      if (res.data) {
        toggleLoading(false);

        setData(res.data);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const adicionarTarefa = async (tarefa) => {
    toggleLoading(true);
    try {
      const { status } = await api.post('/tarefas', tarefa);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Tarefa adicionada com sucesso.',
        });
        listarTarefas();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const editarTarefa = async (tarefa) => {
    toggleLoading(true);
    try {
      const { status } = await api.put('/tarefas', tarefa);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Tarefa editada com sucesso.',
        });
        listarTarefas();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const deletarTarefa = async (id) => {
    toggleLoading(true);
    try {
      const { status } = await api.delete(`/tarefas/${id}`);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Tarefa excluída com sucesso.',
        });
        listarTarefas();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const buscarTarefaPorId = async (id) => {
    toggleLoading(true);
    try {
      const res = await api.get(`/tarefas/${id}`);
      if (res.data) {
        toggleLoading(false);
        return res.data;
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return {
    listarTarefas,
    buscarTarefaPorId,
    adicionarTarefa,
    editarTarefa,
    deletarTarefa,
  };
};
