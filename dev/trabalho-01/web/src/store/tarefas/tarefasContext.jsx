import React, { createContext, useState } from 'react';

const TarefasContext = createContext();

const TarefasProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [adicionarEditarDialog, setAdicionarEditarDialog] = useState({ open: false });
  const [excluirDialog, setExcluirDialog] = useState({ open: false });

  return (
    <TarefasContext.Provider
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
    </TarefasContext.Provider>
  );
};

export { TarefasProvider };
export default TarefasContext;
