import React, { createContext, useRef } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const toastRef = useRef();

  return <GlobalContext.Provider value={{ toastRef }}>{children}</GlobalContext.Provider>;
};

export { GlobalProvider };
export default GlobalContext;
