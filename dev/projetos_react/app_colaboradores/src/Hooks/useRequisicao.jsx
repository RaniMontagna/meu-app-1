import { useContext } from 'react';
import RequisicaoContext from '../Context/requisicaoContext';

const useRequisicao = () => {
  const _requisicaoContext = useContext(RequisicaoContext);

  return _requisicaoContext;
};

export default useRequisicao;
