import api from '../../Services/api';
import useApp from '../../Hooks/useApp';
import useSolicitantes from '../../Hooks/useSolicitantes';

const useSolicitantesHook = () => {
  const { toastRef } = useApp();
  const { setSolicitantes } = useSolicitantes();

  // Busca solicitantes
  const buscarSolicitantes = async () => {
    try {
      const res = await api.get('/solicitante');
      if (res.data) {
        setSolicitantes(res.data);
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao buscar solicitantes', life: 3000 });
    }
  };

  // Adicionar solicitante
  const adicionarSolicitante = async (solicitante, callBackSucesso) => {
    try {
      const { status } = await api.post('/solicitante', solicitante);
      if (status === 200) {
        callBackSucesso();
        buscarSolicitantes();
        toastRef.current.show({ severity: 'success', summary: 'Solicitante adicionar com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao adicionar solicitante', life: 3000 });
    }
  };

  // Remover solicitante
  const removerSolicitante = async (id) => {
    try {
      const { status } = await api.delete(`/solicitante/${id}`);
      if (status === 200) {
        buscarSolicitantes();
        toastRef.current.show({ severity: 'success', summary: 'Solicitante excluído com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao remover solicitante', life: 3000 });
    }
  };

  // Editar solicitante
  const editarSolicitante = async (solicitante, callBackSucesso) => {
    try {
      const { status } = await api.put(`/solicitante`, solicitante);
      if (status === 200) {
        callBackSucesso();
        buscarSolicitantes();
        toastRef.current.show({ severity: 'success', summary: 'Solicitante editado com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar solicitante', life: 3000 });
    }
  };

  return {
    adicionarSolicitante,
    removerSolicitante,
    editarSolicitante,
    buscarSolicitantes,
  };
};

export default useSolicitantesHook;
