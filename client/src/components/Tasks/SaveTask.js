import React from 'react'
import Button from 'material-ui/Button'
import { FormContainer, TextField, DatePicker } from 'react-form-container';
import ListClients from '../Clients/ListClients.container';

import './SaveTask.sass';
import withData from '../withRestData';

class SaveTask extends React.Component {
  render() {
    const { scope, submitData } = this.props;
    const { clientName } = scope.state.data;

    return(
      <div className='SaveTask'>
        <FormContainer scope={scope}>
          <form onSubmit={(ev) => {ev.preventDefault(); submitData()}}>
            <ListClients
              selector
              value={clientName}
              onChange={(ev, cb=() => {}) => {
                const clientName = ev.target.value
                const data = {
                  ...scope.state.data,
                  clientName
                }
                scope.setState({data}, cb);
              }}
              onSelectClient={(client) => {
                const data = {
                  ...scope.state.data,
                  client,
                  clientName: client.name
                }
                scope.setState({data});
                
              }}
              onUnselectClient={() => {
                const data = {
                  ...scope.state.data,
                  client: null,
                }
                scope.setState({data});
              }}
            />
            <TextField required fullWidth label='Tarefa' name='data.content' />
            <DatePicker label='Data' autoOk showTodayButton format="DD/MM/YYYY" keyboard fullWidth name='data.date' />
            <Button fullWidth type='submit' variant='raised' color='primary'>Cadastrar Tarefa</Button>
          </form>
        </FormContainer>
      </div>
    )
  }
}

export default withData(SaveTask, {
  endpoint: 'tasks',
  initialData: {
    content: '',
    client: null,
    clientName: '',
    date: null
  }
});