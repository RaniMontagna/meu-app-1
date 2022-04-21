/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useCategoriasListagem } from './useCategoriasListagem';

const CategoriasListagem = () => {
  const { listarCategorias } = useCategoriasListagem();

  React.useEffect(() => {
    listarCategorias();
  }, []);

  return <div style={{ height: 400, width: '100%' }}></div>;
};

export default CategoriasListagem;
