import { useContext } from 'react';
import AndamentoContext from '../Context/andamentoContext';

const useAndamento = () => {
  const _andamentoContext = useContext(AndamentoContext);

  return _andamentoContext;
};

export default useAndamento;
