import React from 'react';
import ListClientsTableRow from './ListClientsTableRow';
import { Table } from '../../helpers/Table';

const ListClientsTable = (props) => {
  const { clients, header, selector, onSelectClient, clearData, scope } = props;
  return(
    <Table header={header}>
      {clients.map((client,i) => (
        <ListClientsTableRow
          client={client}
          deleteClient={props.deleteClient}
          selector={selector}
          onSelectClient={onSelectClient}
          clearData={clearData}
          key={i}
          scope={scope}
        />
      ))}
    </Table>
  );
}

export default ListClientsTable;