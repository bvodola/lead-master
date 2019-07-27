import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import ListClientsTable from './ListClientsTable';

const ListClients = (props) => {
  const { onSelectClient, onUnselectClient, data, clearData, onChange, value, scope } = props;
  const clients = data;
  const { isClientSelected } = scope.state;

    return(
      <div className='ClientSelector'>
        <TextField
          style={{
            backgroundColor: isClientSelected ? '#d1ff33' : 'white'
          }}
          value={value}
          autoFocus
          fullWidth
          label='Cliente'
          onChange={(ev) => {
            if(ev.target.value.length > 0) {
              props.search(ev.target.value);
            } else {
              props.setState({data: []})
            }

            if(typeof onChange === 'function') onChange(ev);

            if(isClientSelected) {
              scope.setState({isClientSelected: false});
              onUnselectClient();
            }
          
          }}
          onKeyUp={(ev) => {
            const ESC_KEY = 27;
            if(ev.keyCode == ESC_KEY) clearData();
          }}

        />
        
        {props.data.length > 0 &&
          <ListClientsTable
            deleteClient={props.deleteClient}
            clients={clients}
            selector
            onSelectClient={onSelectClient}
            clearData={clearData}
            scope={scope}
          />
        }
        {props.loading ? <LinearProgress /> : <div style={{height: '5px' }}>&nbsp;</div> }
      </div>
    )

};

export default ListClients;
