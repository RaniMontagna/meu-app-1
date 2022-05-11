import { useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import useColaboradoresContext from '../../../Hooks/useColaboradores';

export const HeaderWithSearch = ({ setAdicionarEditarColaborador }) => {
  const { setFiltrosDataTable, filtrosDataTable } = useColaboradoresContext();
  const [search, setSearch] = useState('');

  const _handleLimparFiltros = () => {
    setFiltrosDataTable({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setSearch('');
  };

  const _handleOnChangeSearch = (e) => {
    let _filtros = { ...filtrosDataTable };
    _filtros['global'].value = e?.target?.value;
    setFiltrosDataTable(_filtros);
    setSearch(e?.target?.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={_handleLimparFiltros}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={search} onChange={_handleOnChangeSearch} placeholder="Buscar por colaborador" />
        </span>
      </div>
      <div>
        <Button
          type="button"
          icon="pi pi-plus"
          label="Adicionar colaborador"
          className="p-button-outlined"
          onClick={() => setAdicionarEditarColaborador({ open: true })}
        />
      </div>
    </div>
  );
};
