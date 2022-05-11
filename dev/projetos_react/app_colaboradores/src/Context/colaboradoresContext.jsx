import React, { createContext, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

const ColaboradoresContext = createContext();

const ColaboradoresProvider = ({ children }) => {
  const [filtrosDataTable, setFiltrosDataTable] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <ColaboradoresContext.Provider value={{ filtrosDataTable, setFiltrosDataTable }}>
      {children}
    </ColaboradoresContext.Provider>
  );
};

export { ColaboradoresProvider };
export default ColaboradoresContext;
