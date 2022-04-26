import { useContext } from 'react';
import CategoriasContext from '../store/categorias/categoriasContext';

const useCategorias = () => {
  const _globalContext = useContext(CategoriasContext);

  return _globalContext;
};

export default useCategorias;
