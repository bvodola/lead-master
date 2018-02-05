import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, unmask } from '../../helpers';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';;
import { LinearProgress } from 'material-ui/Progress';

import Text from '../../helpers/Text';

import ListClientsTable from './ListClientsTable';



const style = {
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
        
        <form action="" onSubmit={(ev) => { ev.preventDefault(); props.search(props.searchField) }}>
          <TextField label='Buscar Clientes' autoFocus fullWidth value={props.searchField} onChange={(ev) => props.setState({searchField: ev.target.value})} />
        </form>
        
        {props.loading ? <LinearProgress /> : null }
        <ListClientsTable clients={clients} />
        <Button onClick={() => props.getData()}>Carregar Mais</Button>

        <Link to='/clients/add'>
          <Button fab color="primary" aria-label="add" style={style.addClient}>
            <Icon>add</Icon>
          </Button>
        </Link>

      </div>
    )

};

export default Clients;
