import React from 'react';
import { Tr, Td } from '../../helpers/Table';
import { Link } from 'react-router-dom';
import { Icon, unmask } from '../../helpers';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

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
  }
}

class ListClientsTableRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    if(this.props.client == nextProps.client)
      return false;

    return true;
  }

  render() {
    console.log('ListClientTableRow render()');
    const
      { client } = this.props,
      props = this.props,
      isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      whatsappUrl = isMobile ?  'api' : 'web';
      
    return(
      <Tr>
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
    )
  }
}

export default ListClientsTableRow;