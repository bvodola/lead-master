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
        
        <form action="" onSubmit={(ev) => { ev.preventDefault(); props.search(props.searchTerm) }}>
          <TextField label='Buscar Clientes (Nome, Email, Telefone, RG, CPF)' autoFocus fullWidth value={props.searchTerm} onChange={(ev) => props.setState({searchTerm: ev.target.value})} />
        </form>
        
        {props.loading ? <LinearProgress /> : <div style={{height: '5px' }}>&nbsp;</div> }
        {props.data.length > 0 ?
          <span>
            <ListClientsTable deleteClient={props.deleteClient} clients={clients} />
            <Button
              disabled={props.showLoadMoreButton ? false : true }
              onClick={() => props.getData()}>
                {props.showLoadMoreButton ? 'Carregar Mais' : 'Fim da lista'}
            </Button>
          </span> :
          null
        }
        
        

        <Link to='/clients/add'>
          <Button variant='fab' color="primary" aria-label="add" style={style.addClient}>
            <Icon>add</Icon>
          </Button>
        </Link>

      </div>
    )

};

export default Clients;
