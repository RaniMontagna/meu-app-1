import { useHelper } from '../../Services/api';
import useApp from '../../Hooks/useApp';
import useColaboradores from '../../Hooks/useColaboradores';

const useColaboradoresHook = () => {
  const { toastRef } = useApp();
  const { setColaboradores } = useColaboradores();
  const { api } = useHelper();

  // Busca colaboradores
  const buscarColaboradores = async () => {
    try {
      const res = await api.get('/colaborador');
      if (res.data) {
        setColaboradores(res.data);
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao buscar colaboradores', life: 3000 });
    }
  };

  // Adicionar colaborador
  const adicionarColaborador = async (colaborador, callBackSucesso) => {
    try {
      const { status } = await api.post('/colaborador', colaborador);
      if (status === 200) {
        callBackSucesso();
        buscarColaboradores();
        toastRef.current.show({ severity: 'success', summary: 'Colaborador adicionar com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao adicionar colaborador', life: 3000 });
    }
  };

  // Remover colaborador
  const removerColaborador = async (id) => {
    try {
      const { status } = await api.delete(`/colaborador/${id}`);
      if (status === 200) {
        buscarColaboradores();
        toastRef.current.show({ severity: 'success', summary: 'Colaborador excluído com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao remover colaborador', life: 3000 });
    }
  };

  // Editar colaborador
  const editarColaborador = async (colaborador, callBackSucesso) => {
    try {
      const { status } = await api.put(`/colaborador`, colaborador);
      if (status === 200) {
        callBackSucesso();
        buscarColaboradores();
        toastRef.current.show({ severity: 'success', summary: 'Colaborador editado com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar colaborador', life: 3000 });
    }
  };

  return {
    adicionarColaborador,
    removerColaborador,
    editarColaborador,
    buscarColaboradores,
  };
};

export default useColaboradoresHook;
