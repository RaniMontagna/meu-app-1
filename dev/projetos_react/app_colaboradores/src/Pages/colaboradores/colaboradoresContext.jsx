import React, { createContext, useRef } from 'react';

const ColaboradoresContext = createContext();

const ColaboradoresProvider = ({ children }) => {
  const toastRef = useRef();
  const [editando, setEditando] = React.useState({ open: false, colaborador: {} });

  return (
    <ColaboradoresContext.Provider
      value={{
        toastRef,
        editando,
        setEditando,
      }}
    >
      {children}
    </ColaboradoresContext.Provider>
  );
};

export { ColaboradoresProvider };
export default ColaboradoresContext;
