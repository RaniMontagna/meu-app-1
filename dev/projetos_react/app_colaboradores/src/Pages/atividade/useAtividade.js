import api from '../../Services/api';
import useApp from '../../Hooks/useApp';
import useAtividade from '../../Hooks/useAtividade';

const useAtividadeHook = () => {
  const { toastRef } = useApp();
  const { setAtividade } = useAtividade();

  // Busca atividade
  const buscarAtividade = async () => {
    try {
      const res = await api.get('/atividade');
      if (res.data) {
        setAtividade(res.data);
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao buscar atividade', life: 3000 });
    }
  };

  // Adicionar atividade
  const adicionarAtividade = async (atividade, callBackSucesso) => {
    try {
      const { status } = await api.post('/atividade', atividade);
      if (status === 200) {
        callBackSucesso();
        buscarAtividade();
        toastRef.current.show({ severity: 'success', summary: 'Atividade adiciona com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao adicionar atividade', life: 3000 });
    }
  };

  // Remover atividade
  const removerAtividade = async (id) => {
    try {
      const { status } = await api.delete(`/atividade/${id}`);
      if (status === 200) {
        buscarAtividade();
        toastRef.current.show({ severity: 'success', summary: 'Atividade excluída com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao remover atividade', life: 3000 });
    }
  };

  // Editar atividade
  const editarAtividade = async (atividade, callBackSucesso) => {
    try {
      const { status } = await api.put(`/atividade`, atividade);
      if (status === 200) {
        callBackSucesso();
        buscarAtividade();
        toastRef.current.show({ severity: 'success', summary: 'Atividade editado com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar atividade', life: 3000 });
    }
  };

  return {
    adicionarAtividade,
    removerAtividade,
    editarAtividade,
    buscarAtividade,
  };
};

export default useAtividadeHook;
