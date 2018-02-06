import React from 'react';
import Button from 'material-ui/Button';
import Text from '../../helpers/Text';
import { TextField, MaskedTextField, FormContainer } from 'react-form-container';

const style = {
  submitButton: {
    marginTop: '32px',
    width: '100%',
  }
}

const SaveClient = (props) => (
<FormContainer scope={props.scope}>
  <Text type='title'>Cadastrar Cliente</Text>
  <TextField autoFocus name='client.name' label='Nome' fullWidth />
  <TextField name='client.email' label='E-mail' fullWidth />
  <MaskedTextField fullWidth label='Celular' name='client.phone' mask='(99) 99999-9999' />
  <Button type='submit' style={style.submitButton} onClick={() => props.handleSubmit()} raised color='primary'>Cadastrar Cliente</Button>
</FormContainer>
);

export default SaveClient;