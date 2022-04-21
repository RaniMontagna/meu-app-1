import React from 'react';
import useGlobal from '../../../hooks/useGlobal';
import api from '../../../services/api';

export const useCategoriasListagem = () => {
  const { toggleLoading, handleErrors } = useGlobal();
  const [data, setData] = React.useState(null);

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
        // TODO: criar lógica de adicionar categoria
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
        // TODO: criar lógica de editar categoria
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
        // TODO: criar lógica de deletar categoria
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
    data,
    listarCategorias,
    buscarCategoriaPorId,
    adicionarCategoria,
    editarCategoria,
    deletarCategoria,
  };
};
