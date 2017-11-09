import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

import { Icon, unmask } from '../../helpers';
import { Table, Tr, Td } from '../../helpers/Table';
import Text from '../../helpers/Text';

const style = {
  actions: {
    minWidth: '100px',
    [screen.xsDown]: {
      position: 'relative',
      minWidth: '50px',
    },
    showSmUp: {
      [screen.xsDown]: {
        display: 'none'
      }
    }
  },
  addClient: {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
  }
}

const Clients = (props) => {
  const clients = props.data;

  return(
    <div className='ClientsComponent'>

      <Text type='title'>
        Clientes
      </Text>

      <Table header={['Nome', 'Email', 'Celular', 'Ações']}>

        {clients.map((client,i) => (
          <Tr key={i}>
            <Td stackable><strong>{client.name}</strong></Td>
            <Td stackable>
              {client.attributes.email}
            </Td>
            <Td stackable>
              <a target='_blank' href={'http://api.whatsapp.com/send?phone=55'+unmask(client.attributes.phone)}>{client.attributes.phone}</a>
            </Td>
            <Td style={style.actions}>
              <span style={style.actions.showSmUp}>
                <IconButton>
                  <Icon>delete</Icon>
                </IconButton>
              </span>
              <IconButton>
                <Icon>more_vert</Icon>
              </IconButton>
            </Td>
          </Tr>
        ))}


      </Table>

      <Link to='/clients/add'>
        <Button fab color="primary" aria-label="add" style={style.addClient}>
          <Icon>add</Icon>
        </Button>
      </Link>

    </div>
  )
};

export default Clients;
