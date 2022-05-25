import React, { createContext, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

const SolicitantesContext = createContext();

const SolicitantesProvider = ({ children }) => {
  const [solicitantes, setSolicitantes] = React.useState([]);

  const [filtrosDataTable, setFiltrosDataTable] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <SolicitantesContext.Provider value={{ filtrosDataTable, setFiltrosDataTable, solicitantes, setSolicitantes }}>
      {children}
    </SolicitantesContext.Provider>
  );
};

export { SolicitantesProvider };
export default SolicitantesContext;
