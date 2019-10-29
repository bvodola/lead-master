import React from 'react';
import { Tr, Td } from '../../helpers/Table';
import { Link } from 'react-router-dom';
import { Icon, unmask } from '../../helpers';

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

const style = {
  actions: {
    minWidth: '150px',
    [screen.xsDown]: {
      position: 'relative',
      minWidth: '50px'
    },
    showSmUp: {
      [screen.xsDown]: {
        display: 'none'
      }
    }
  },
  product: {
    position: 'relative',
    display: 'inline-block',
    margin: '0 4px 4px 0',
    padding: '7px 10px 8px 10px',
    borderRadius: '30px',
    background: '#eee',
    textTransform: 'capitalize',
    icon: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      color: 'rgba(0,0,0,0.5)',
      background: 'rgba(0,0,0,0.1)',
      borderRadius: '30px',
      padding: '7px',
      fontSize: '19px'
    },
    textIcon: {
      padding: '7px 2px 7px 12px',
      fontSize: '15px',
      width: '19px',
      height: '19px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  },
  selector: {
    display: 'table-row-group'
  }
};

class ListClientsTableRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.client == nextProps.client) return false;

    return true;
  }

  render() {
    const { client, selector, onSelectClient, clearData, scope } = this.props,
      props = this.props,
      isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      whatsappUrl = isMobile ? 'api' : 'web';

    if (selector) {
      return (
        <div
          onClick={() => {
            clearData();
            onSelectClient(client);
            scope.setState({ isClientSelected: true });
          }}
          style={style.selector}
        >
          <Tr>
            <Td stackable style={{ minWidth: '100px' }}>
              <strong>{client.name}</strong>
            </Td>
          </Tr>
        </div>
      );
    } else {
      return (
        <Tr>
          <Td stackable style={{ minWidth: '100px' }}>
            <Link to={`/documents-form/${client._id}`}>{client.name}</Link>
          </Td>
          <Td stackable style={{ minWidth: '150px' }}>
            <a
              target="_blank"
              href={`http://${whatsappUrl}.whatsapp.com/send?phone=55` + unmask(client.phone)}
            >
              {client.phone}
            </a>
          </Td>
          <Td style={style.actions}>
            <span style={style.actions.showSmUp}>
              <Tooltip title="Apagar">
                <IconButton
                  onClick={() => {
                    props.deleteClient(client._id);
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </Tooltip>
            </span>
            <Tooltip title="Editar">
              <Link style={{ textDecoration: 'none' }} to={'/documents-form/' + client._id}>
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Ver Documentação">
              <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={'/documents/' + client._id}
              >
                <IconButton>
                  <Icon>description</Icon>
                </IconButton>
              </a>
            </Tooltip>
          </Td>
        </Tr>
      );
    }
  }
}

export default ListClientsTableRow;
