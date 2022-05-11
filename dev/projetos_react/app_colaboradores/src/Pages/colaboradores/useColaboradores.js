import React, { useContext } from 'react';
import AppContext from '../../Context/appContext';
import api from '../../Services/api';
import ColaboradoresContext from '../../Context/colaboradoresContext';

const useColaboradores = () => {
  const [colaboradores, setColaboradores] = React.useState([]);
  const { setEditando } = useContext(ColaboradoresContext);
  const { toastRef } = useContext(AppContext);

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
  const adicionarColaborador = async (colaborador) => {
    try {
      const { status } = await api.post('/colaborador', colaborador);
      if (status === 200) {
        setEditando({ open: false });
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
  const editarColaborador = async (colaborador) => {
    try {
      const { status } = await api.put(`/colaborador`, colaborador);
      if (status === 200) {
        setEditando({ open: false });
        buscarColaboradores();
        toastRef.current.show({ severity: 'success', summary: 'Colaborador editado com sucesso', life: 3000 });
      }
    } catch (error) {
      toastRef.current.show({ severity: 'error', summary: 'Erro ao editar colaborador', life: 3000 });
    }
  };

  return {
    colaboradores,
    adicionarColaborador,
    removerColaborador,
    editarColaborador,
    buscarColaboradores,
    toastRef,
  };
};

export default useColaboradores;
