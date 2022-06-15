import { useHelper } from '../../Services/api';
import useApp from '../../Hooks/useApp';
import useTipoRequisicao from '../../Hooks/useTipoRequisicao';

const useTipoRequisicaoHook = () => {
  const { toastRef } = useApp();
  const { setTipoRequisicao } = useTipoRequisicao();
  const { api } = useHelper();

  // Busca tipo de requisição
  const buscarTipoRequisicao = async () => {
    try {
      const res = await api.get('/tipoRequisicao');
      if (res.data) {
        setTipoRequisicao(res.data);
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao buscar tipo de requisição', life: 3000 });
    }
  };

  // Adicionar tipo de requisição
  const adicionarTipoRequisicao = async (tipoRequisicao, callBackSucesso) => {
    try {
      const { status } = await api.post('/tipoRequisicao', tipoRequisicao);
      if (status === 200) {
        callBackSucesso();
        buscarTipoRequisicao();
        toastRef.current.show({ severity: 'success', summary: 'Tipo de requisição adicionar com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao adicionar tipoRequisicao', life: 3000 });
    }
  };

  // Remover tipo de requisição
  const removerTipoRequisicao = async (id) => {
    try {
      const { status } = await api.delete(`/tipoRequisicao/${id}`);
      if (status === 200) {
        buscarTipoRequisicao();
        toastRef.current.show({ severity: 'success', summary: 'Tipo de requisição excluído com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao remover tipoRequisicao', life: 3000 });
    }
  };

  // Editar tipo de requisição
  const editarTipoRequisicao = async (tipoRequisicao, callBackSucesso) => {
    try {
      const { status } = await api.put(`/tipoRequisicao`, tipoRequisicao);
      if (status === 200) {
        callBackSucesso();
        buscarTipoRequisicao();
        toastRef.current.show({ severity: 'success', summary: 'TipoRequisicao editado com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar tipoRequisicao', life: 3000 });
    }
  };

  return {
    adicionarTipoRequisicao,
    removerTipoRequisicao,
    editarTipoRequisicao,
    buscarTipoRequisicao,
  };
};

export default useTipoRequisicaoHook;
