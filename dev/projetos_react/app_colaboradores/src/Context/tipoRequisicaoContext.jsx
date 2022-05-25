import React, { createContext, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

const TipoRequisicaoContext = createContext();

const TipoRequisicaoProvider = ({ children }) => {
  const [tipoRequisicao, setTipoRequisicao] = React.useState([]);

  const [filtrosDataTable, setFiltrosDataTable] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <TipoRequisicaoContext.Provider
      value={{ filtrosDataTable, setFiltrosDataTable, tipoRequisicao, setTipoRequisicao }}
    >
      {children}
    </TipoRequisicaoContext.Provider>
  );
};

export { TipoRequisicaoProvider };
export default TipoRequisicaoContext;
