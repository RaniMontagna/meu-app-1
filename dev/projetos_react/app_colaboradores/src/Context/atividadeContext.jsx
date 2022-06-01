import React, { createContext, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

const AtividadeContext = createContext();

const AtividadeProvider = ({ children }) => {
  const [atividade, setAtividade] = React.useState([]);

  const [filtrosDataTable, setFiltrosDataTable] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <AtividadeContext.Provider value={{ filtrosDataTable, setFiltrosDataTable, atividade, setAtividade }}>
      {children}
    </AtividadeContext.Provider>
  );
};

export { AtividadeProvider };
export default AtividadeContext;
