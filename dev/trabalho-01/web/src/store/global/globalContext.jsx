import React, { createContext } from 'react';
import { useSnackbar } from 'notistack';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const toggleNotificacao = ({ mensagem, variante }) => {
    enqueueSnackbar(mensagem, {
      variant: variante ?? 'success',
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: 3000,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        toggleNotificacao,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
export default GlobalContext;
