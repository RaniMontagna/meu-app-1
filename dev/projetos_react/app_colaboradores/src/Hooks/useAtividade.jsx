import { useContext } from 'react';
import AtividadeContext from '../Context/atividadeContext';

const useAtividade = () => {
  const _atividadeContext = useContext(AtividadeContext);

  return _atividadeContext;
};

export default useAtividade;
