import React from 'react';
import Button from 'material-ui/Button';
import Text from '../../helpers/Text';
import TextField from '../../helpers/form/TextField';
import MaskedTextField from '../../helpers/form/MaskedTextField';
import FormContainer from '../../helpers/form/FormContainer';

import axios from 'axios';

const style = {
  submitButton: {
    marginTop: '32px',
    width: '100%',
  }
}


class SaveClient extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    axios.post('/api/clients'+this.props.client)
      .then((response) => {
        this.setState({client: this.props.initialState().client}, () => {
        });
      })
  }

  render() {
    console.log('this.props',this.props);
    return(
      <FormContainer scope={this.props.scope}>
        <Text type='title'>Cadastrar Cliente</Text>
        <TextField name='client.name' label='Nome' fullWidth />
        <TextField name='client.email' label='E-mail' fullWidth />
        <MaskedTextField fullWidth label='Celular' name='client.phone' mask='(99) 99999-9999' />
        <Button type='submit' style={style.submitButton} onClick={() => this.handleSubmit()} raised color='primary'>Cadastrar Cliente</Button>
      </FormContainer>
    )
  }
}

export default SaveClient;

SaveClient.propTypes = {

}
