import { useContext } from 'react';
import SolicitantesContext from '../Context/solicitantesContext';

const useSolicitantes = () => {
  const _solicitantesContext = useContext(SolicitantesContext);

  return _solicitantesContext;
};

export default useSolicitantes;
