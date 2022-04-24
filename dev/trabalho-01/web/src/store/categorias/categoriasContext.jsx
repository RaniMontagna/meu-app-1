import React, { createContext, useState } from 'react';

const CategoriasContext = createContext();

const CategoriasProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [adicionarEditarDialog, setAdicionarEditarDialog] = useState({ open: false });
  const [excluirDialog, setExcluirDialog] = useState({ open: false });

  return (
    <CategoriasContext.Provider
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
    </CategoriasContext.Provider>
  );
};

export { CategoriasProvider };
export default CategoriasContext;
