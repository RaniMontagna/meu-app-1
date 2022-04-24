import { useContext } from 'react';
import ResponsaveisContext from '../store/responsaveis/responsaveisContext';

const useResponsaveis = () => {
  const _globalContext = useContext(ResponsaveisContext);

  return _globalContext;
};

export default useResponsaveis;
