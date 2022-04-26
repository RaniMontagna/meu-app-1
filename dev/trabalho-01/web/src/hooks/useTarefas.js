import { useContext } from 'react';
import TarefasContext from '../store/tarefas/tarefasContext';

const useTarefas = () => {
  const _globalContext = useContext(TarefasContext);

  return _globalContext;
};

export default useTarefas;
