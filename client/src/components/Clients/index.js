import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

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
  const
    clients = props.data,
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    whatsappUrl = isMobile ?  'api' : 'web';

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
                {client.email}
              </Td>
              <Td stackable>
                <a target='_blank' href={`http://${whatsappUrl}.whatsapp.com/send?phone=55`+unmask(client.phone)}>{client.phone}</a>
              </Td>
              <Td style={style.actions}>
                <span style={style.actions.showSmUp}>
                  <Tooltip title='Apagar'>
                    <IconButton onClick={() => { props.deleteClient(client._id) } }>
                      <Icon>delete</Icon>
                    </IconButton>
                  </Tooltip>
                </span>
                <Tooltip title='Editar'>
                  <Link style={{textDecoration: 'none'}} to={'/documents-form/'+client._id}>
                    <IconButton>
                      <Icon>edit</Icon>
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title='Ver Documentação'>
                  <a style={{textDecoration: 'none'}} target='_blank' href={'/documents/'+client._id}>
                    <IconButton>
                      <Icon>description</Icon>
                    </IconButton>
                  </a>
                </Tooltip>
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