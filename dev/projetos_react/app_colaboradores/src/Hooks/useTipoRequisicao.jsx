import { useContext } from 'react';
import TipoRequisicaoContext from '../Context/tipoRequisicaoContext';

const useTipoRequisicao = () => {
  const _tipoRequisicaoContext = useContext(TipoRequisicaoContext);

  return _tipoRequisicaoContext;
};

export default useTipoRequisicao;
