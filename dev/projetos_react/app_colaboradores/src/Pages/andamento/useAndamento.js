import api from '../../Services/api';
import useApp from '../../Hooks/useApp';
import useAndamento from '../../Hooks/useAndamento';

const useAndamentoHook = () => {
  const { toastRef } = useApp();
  const { setAndamento } = useAndamento();

  // Busca andamento
  const buscarAndamento = async () => {
    try {
      const res = await api.get('/andamento');
      if (res.data) {
        setAndamento(res.data);
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao buscar andamento', life: 3000 });
    }
  };

  // Adicionar andamento
  const adicionarAndamento = async (andamento, callBackSucesso) => {
    try {
      const { status } = await api.post('/andamento', andamento);
      if (status === 200) {
        callBackSucesso();
        buscarAndamento();
        toastRef.current.show({ severity: 'success', summary: 'Andamento adicionar com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao adicionar andamento', life: 3000 });
    }
  };

  // Remover andamento
  const removerAndamento = async (id) => {
    try {
      const { status } = await api.delete(`/andamento/${id}`);
      if (status === 200) {
        buscarAndamento();
        toastRef.current.show({ severity: 'success', summary: 'Andamento excluído com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao remover andamento', life: 3000 });
    }
  };

  // Editar andamento
  const editarAndamento = async (andamento, callBackSucesso) => {
    try {
      const { status } = await api.put(`/andamento`, andamento);
      if (status === 200) {
        callBackSucesso();
        buscarAndamento();
        toastRef.current.show({ severity: 'success', summary: 'Andamento editado com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar andamento', life: 3000 });
    }
  };

  return {
    adicionarAndamento,
    removerAndamento,
    editarAndamento,
    buscarAndamento,
  };
};

export default useAndamentoHook;
