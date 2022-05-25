import { useContext } from 'react';
import AppContext from '../Context/appContext';

const useApp = () => {
  const _appContext = useContext(AppContext);

  return _appContext;
};

export default useApp;

