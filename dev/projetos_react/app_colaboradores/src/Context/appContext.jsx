import { Toast } from 'primereact/toast';
import React, { createContext, useRef } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const toastRef = useRef();

  return (
    <AppContext.Provider value={{ toastRef }}>
      {children}
      <Toast ref={toastRef} />
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
