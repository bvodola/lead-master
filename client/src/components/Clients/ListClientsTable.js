import React from 'react';
import ListClientsTableRow from './ListClientsTableRow';
import { Table } from '../../helpers/Table';

class ListClientsTable extends React.Component {

  
  render() {
    const { clients } = this.props;

    return(
      <Table header={['Nome', 'Email', 'Celular', 'Ações']}>
        {clients.map((client,i) => (
          <ListClientsTableRow client={client} key={i} />
        ))}
      </Table>
    )
  }
}

export default ListClientsTable;