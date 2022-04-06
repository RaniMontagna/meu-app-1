import React from 'react';
import api from '../../Services/api';

const useColaboradores = ({ setEditando }) => {
  const [colaboradores, setColaboradores] = React.useState([]);

  // Busca colaboradores
  const _buscarColaboradores = async () => {
    try {
      const res = await api.get('/colaborador');
      if (res.data) {
        setColaboradores(res.data);
      }
    } catch (error) {
      console.log('Erro ao buscar colaboradores');
    }
  };

  // Adicionar colaborador
  const adicionarColaborador = async (colaborador) => {
    try {
      const { status } = await api.post('/colaborador', colaborador);
      if (status === 200) {
        setEditando({ open: false });
      }
    } catch (error) {
      alert('Erro ao adicionar colaborador');
    }
  };

  // Remover colaborador
  const removerColaborador = async (id) => {
    try {
      const { status } = await api.delete(`/colaborador/${id}`);
      if (status === 200) {
        _buscarColaboradores();
      }
    } catch (error) {
      alert('Erro ao remover colaborador');
    }
  };

  // Editar colaborador
  const editarColaborador = async (colaborador) => {
    try {
      const { status } = await api.put(`/colaborador`, colaborador);
      if (status === 200) {
        setEditando({ open: false });
        _buscarColaboradores();
      }
    } catch (error) {
      alert('Erro ao editar colaborador');
    }
  };

  React.useEffect(() => {
    _buscarColaboradores();
  }, []);

  return {
    colaboradores,
    adicionarColaborador,
    removerColaborador,
    editarColaborador,
  };
};

export default useColaboradores;
