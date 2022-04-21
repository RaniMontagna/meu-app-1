import React, { createContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import Loading from '../../components/loading/loading';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const toggleLoading = (boolean) => {
    setLoading(boolean);
  };

  const toggleNotificacao = ({ mensagem, variante }) => {
    enqueueSnackbar(mensagem, {
      variant: variante ?? 'success',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
      autoHideDuration: 3000,
    });
  };

  const handleErrors = (error) => {
    //TODO: criar lógica de erro

    setLoading(false);
    enqueueSnackbar(String(error), {
      variant: 'error',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
      autoHideDuration: 3000,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        toggleNotificacao,
        toggleLoading,
        handleErrors,
      }}
    >
      {loading && <Loading />}
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
export default GlobalContext;
