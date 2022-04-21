import api from '../../../services/api';

export const useCategoriasListagem = () => {
  const listarCategorias = async () => {
    try {
      const res = await api.get('/categoria');
      if (res.data) {
        // TODO: criar lógica da listagem
      }
    } catch (error) {
      // TODO: tratar error
    }
  };

  const adicionarCategoria = async (categoria) => {
    try {
      const { status } = await api.post('/categoria', categoria);
      if (status === 200) {
        // TODO: criar lógica de adicionar categoria
      }
    } catch (error) {
      // TODO: tratar error
    }
  };

  const editarCategoria = async (categoria) => {
    try {
      const { status } = await api.put('/categoria', categoria);
      if (status === 200) {
        // TODO: criar lógica de editar categoria
      }
    } catch (error) {
      // TODO: tratar error
    }
  };

  const deletarCategoria = async (id) => {
    try {
      const { status } = await api.delete(`/categoria/${id}`);
      if (status === 200) {
        // TODO: criar lógica de deletar categoria
      }
    } catch (error) {
      // TODO: tratar error
    }
  };

  return {
    listarCategorias,
    adicionarCategoria,
    editarCategoria,
    deletarCategoria,
  };
};
