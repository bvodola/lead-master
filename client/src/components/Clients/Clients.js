import React from 'react';
import Text from '../../helpers/Text';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Icon } from '../../helpers';
import ListClients from './ListClients.container';

const style = {
  container: {
    marginBottom: '80px'
  },
  addClient: {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
  }
}

const Clients = () => (
  <div style={style.container} className='Clients'>
    <Text type='title'>
      Clientes
    </Text>

    <ListClients />

    <Link to='/clients/add'>
      <Button variant='fab' color="primary" aria-label="add" style={style.addClient}>
        <Icon>add</Icon>
      </Button>
    </Link>
  </div>
)

export default Clients;