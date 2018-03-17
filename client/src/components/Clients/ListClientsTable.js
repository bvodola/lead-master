import React from 'react';
import ListClientsTableRow from './ListClientsTableRow';
import { Table } from '../../helpers/Table';

const ListClientsTable = (props) => {
  const { clients } = props;
  return(
    <Table header={['Nome', 'Telefone', 'Produtos', 'Ações']}>
      {clients.map((client,i) => (
        <ListClientsTableRow client={client} deleteClient={props.deleteClient} key={i} />
      ))}
    </Table>
  );
}

export default ListClientsTable;