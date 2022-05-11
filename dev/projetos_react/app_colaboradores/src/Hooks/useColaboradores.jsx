import { useContext } from 'react';
import ColaboradoresContext from '../Context/colaboradoresContext';

const useColaboradores = () => {
  const _colaboradoresContext = useContext(ColaboradoresContext);

  return _colaboradoresContext;
};

export default useColaboradores;
