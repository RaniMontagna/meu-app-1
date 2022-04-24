import useGlobal from '../../../hooks/useGlobal';
import useResponsaveis from '../../../hooks/useResponsaveis';
import api from '../../../services/api';

export const useResponsaveisListagem = () => {
  const { toggleLoading, handleErrors, toggleNotificacao } = useGlobal();
  const { setData } = useResponsaveis();

  const listarResponsaveis = async () => {
    toggleLoading(true);
    try {
      const res = await api.get('/responsavel');
      if (res.data) {
        toggleLoading(false);

        setData(res.data);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const adicionarResponsavel = async (responsavel) => {
    toggleLoading(true);
    try {
      const { status } = await api.post('/responsavel', responsavel);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Responsável adicionado com sucesso.',
        });
        listarResponsaveis();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const editarResponsavel = async (responsavel) => {
    toggleLoading(true);
    try {
      const { status } = await api.put('/responsavel', responsavel);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Responsável editado com sucesso.',
        });
        listarResponsaveis();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const deletarResponsavel = async (id) => {
    toggleLoading(true);
    try {
      const { status } = await api.delete(`/responsavel/${id}`);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Responsável excluído com sucesso.',
        });
        listarResponsaveis();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const buscarResponsavelPorId = async (id) => {
    toggleLoading(true);
    try {
      const res = await api.get(`/responsavel/${id}`);
      if (res.data) {
        toggleLoading(false);
        return res.data;
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return {
    listarResponsaveis,
    buscarResponsavelPorId,
    adicionarResponsavel,
    editarResponsavel,
    deletarResponsavel,
  };
};
