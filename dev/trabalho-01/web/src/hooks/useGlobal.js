import { useContext } from 'react';
import GlobalContext from '../store/global/globalContext';

const useGlobal = () => {
  const _globalContext = useContext(GlobalContext);

  return _globalContext;
};

export default useGlobal;
