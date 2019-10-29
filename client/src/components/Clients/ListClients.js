import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import ListClientsTable from './ListClientsTable';

const ListClients = props => {
  const clients = props.data;

  return (
    <div className="ListClients">
      <form
        action=""
        onSubmit={ev => {
          ev.preventDefault();
          props.search(props.searchTerm);
        }}
      >
        <TextField
          autoFocus
          fullWidth
          label="Buscar Clientes (Nome, Email, Telefone, RG, CPF)"
          value={props.searchTerm}
          onChange={ev => props.setState({ searchTerm: ev.target.value })}
        />
      </form>

      {props.data.length > 0 && (
        <span>
          <ListClientsTable
            header={['Nome', 'Telefone', 'Ações']}
            deleteClient={props.deleteClient}
            clients={clients}
          />
          <Button
            fullWidth
            disabled={!props.showLoadMoreButton || props.loading ? true : false}
            onClick={() => props.getData()}
          >
            {props.loading
              ? 'Carregando...'
              : props.showLoadMoreButton
              ? 'Carregar Mais'
              : 'Fim da lista'}
          </Button>
        </span>
      )}

      {props.loading ? <LinearProgress /> : <div style={{ height: '5px' }}>&nbsp;</div>}
    </div>
  );
};

export default ListClients;
