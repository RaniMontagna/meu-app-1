import React from 'react';
import './dataTable.css';

import { Fab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Actions from './actions/actions';

const DataTable = ({ columns, rows, fab }) => {
  return (
    <div className="divTable">
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns?.map((it) => {
              return (
                <TableCell key={Math.random()} className="tableCell">
                  {it}
                </TableCell>
              );
            })}
            {rows[0]?.actions && (
              <TableCell className="tableCell" align="right">
                Ações
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((it) => {
            return (
              <TableRow key={Math.random()}>
                {Object.values(it).map((values) => {
                  if (typeof values === 'string') {
                    return (
                      <TableCell key={Math.random()} className="tableCell border">
                        {values}
                      </TableCell>
                    );
                  }
                  return null;
                })}
                {it.actions && (
                  <TableCell className="tableCell border" align="right">
                    <Actions actions={it.actions} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {fab && (
        <div className="divAbsolute">
          <Fab color="primary" variant="extended" onClick={() => fab.onClick()}>
            {fab.icon}
            {fab.label}
          </Fab>
        </div>
      )}
    </div>
  );
};

export default DataTable;
