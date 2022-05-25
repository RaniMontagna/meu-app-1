import React, { createContext, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

const RequisicaoContext = createContext();

const RequisicaoProvider = ({ children }) => {
  const [requisicao, setRequisicao] = React.useState([]);

  const [filtrosDataTable, setFiltrosDataTable] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <RequisicaoContext.Provider value={{ filtrosDataTable, setFiltrosDataTable, requisicao, setRequisicao }}>
      {children}
    </RequisicaoContext.Provider>
  );
};

export { RequisicaoProvider };
export default RequisicaoContext;
