import api from '../../Services/api';
import useApp from '../../Hooks/useApp';
import useRequisicao from '../../Hooks/useRequisicao';

const useRequisicaoHook = () => {
  const { toastRef } = useApp();
  const { setRequisicao } = useRequisicao();

  // Busca requisições
  const buscarRequisicao = async () => {
    try {
      const res = await api.get('/requisicao');
      if (res.data) {
        setRequisicao(res.data);
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao buscar requisições', life: 3000 });
    }
  };

  // Adicionar requisição
  const adicionarRequisicao = async (requisicao, callBackSucesso) => {
    try {
      const { status } = await api.post('/requisicao', requisicao);
      if (status === 200) {
        callBackSucesso();
        buscarRequisicao();
        toastRef.current.show({ severity: 'success', summary: 'Requisição adicionada com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao adicionar requisicao', life: 3000 });
    }
  };

  // Remover requisição
  const removerRequisicao = async (id) => {
    try {
      const { status } = await api.delete(`/requisicao/${id}`);
      if (status === 200) {
        buscarRequisicao();
        toastRef.current.show({ severity: 'success', summary: 'Requisição excluída com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao remover requisição', life: 3000 });
    }
  };

  // Editar requição
  const editarRequisicao = async (requisicao, callBackSucesso) => {
    try {
      const { status } = await api.put(`/requisicao`, requisicao);
      if (status === 200) {
        callBackSucesso();
        buscarRequisicao();
        toastRef.current.show({ severity: 'success', summary: 'Requisição editada com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar requisição', life: 3000 });
    }
  };

  return {
    adicionarRequisicao,
    removerRequisicao,
    editarRequisicao,
    buscarRequisicao,
  };
};

export default useRequisicaoHook;
