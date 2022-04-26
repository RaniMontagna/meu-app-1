import useGlobal from '../../../hooks/useGlobal';
import useCategorias from '../../../hooks/useCategorias';
import api from '../../../services/api';

export const useCategoriasListagem = () => {
  const { toggleLoading, handleErrors, toggleNotificacao } = useGlobal();
  const { setData } = useCategorias();

  const listarCategorias = async () => {
    toggleLoading(true);
    try {
      const res = await api.get('/categoria');
      if (res.data) {
        toggleLoading(false);

        setData(res.data);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const adicionarCategoria = async (categoria) => {
    toggleLoading(true);
    try {
      const { status } = await api.post('/categoria', categoria);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Categoria adicionada com sucesso.',
        });
        listarCategorias();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const editarCategoria = async (categoria) => {
    toggleLoading(true);
    try {
      const { status } = await api.put('/categoria', categoria);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Categoria editada com sucesso.',
        });
        listarCategorias();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const deletarCategoria = async (id) => {
    toggleLoading(true);
    try {
      const { status } = await api.delete(`/categoria/${id}`);
      if (status === 200) {
        toggleLoading(false);
        toggleNotificacao({
          mensagem: 'Categoria excluída com sucesso.',
        });
        listarCategorias();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const buscarCategoriaPorId = async (id) => {
    toggleLoading(true);
    try {
      const res = await api.get(`/categoria/${id}`);
      if (res.data) {
        toggleLoading(false);
        return res.data;
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return {
    listarCategorias,
    buscarCategoriaPorId,
    adicionarCategoria,
    editarCategoria,
    deletarCategoria,
  };
};
