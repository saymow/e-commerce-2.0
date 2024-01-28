import React, { useMemo } from 'react';
import { Table as BoostrapTable } from 'react-bootstrap';

export type Columns = Record<string, any>;

export type Row<T = {}> = Record<keyof T, any>;

interface Props {
  columns: Columns;
  idColumn: string;
  rows: Row[];
}

const Table: React.FC<Props> = props => {
  const { idColumn, columns, rows } = props;

  const columnsJsx = useMemo(
    () => Object.keys(columns).map(key => <th key={key}>{columns[key]}</th>),
    [columns]
  );

  const rowsJsx = useMemo(
    () =>
      rows.map(row => (
        <tr key={(row as any)[idColumn]}>
          {Object.keys(row).map(key => (
            <td key={key}>{(row as any)[key]}</td>
          ))}
        </tr>
      )),
    [rows, idColumn]
  );

  return (
    <BoostrapTable striped bordered hover>
      <thead>
        <tr>{columnsJsx}</tr>
      </thead>
      <tbody>{rowsJsx}</tbody>
    </BoostrapTable>
  );
};

export default Table;
