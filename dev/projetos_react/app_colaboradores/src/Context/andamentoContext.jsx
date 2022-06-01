import React, { createContext, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

const AndamentoContext = createContext();

const AndamentoProvider = ({ children }) => {
  const [andamento, setAndamento] = React.useState([]);

  const [filtrosDataTable, setFiltrosDataTable] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <AndamentoContext.Provider value={{ filtrosDataTable, setFiltrosDataTable, andamento, setAndamento }}>
      {children}
    </AndamentoContext.Provider>
  );
};

export { AndamentoProvider };
export default AndamentoContext;
