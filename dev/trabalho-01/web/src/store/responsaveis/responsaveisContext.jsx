import React, { createContext, useState } from 'react';

const ResponsaveisContext = createContext();

const ResponsaveisProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [adicionarEditarDialog, setAdicionarEditarDialog] = useState({ open: false });
  const [excluirDialog, setExcluirDialog] = useState({ open: false });

  return (
    <ResponsaveisContext.Provider
      value={{
        data,
        setData,
        adicionarEditarDialog,
        setAdicionarEditarDialog,
        excluirDialog,
        setExcluirDialog,
      }}
    >
      {children}
    </ResponsaveisContext.Provider>
  );
};

export { ResponsaveisProvider };
export default ResponsaveisContext;
