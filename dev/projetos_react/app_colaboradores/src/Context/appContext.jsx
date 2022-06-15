import { Toast } from 'primereact/toast';
import React, { createContext, useRef } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const toastRef = useRef();
  const [token, setToken] = React.useState(sessionStorage.getItem('token'));

  return (
    <AppContext.Provider value={{ toastRef, token, setToken }}>
      {children}
      <Toast ref={toastRef} />
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
