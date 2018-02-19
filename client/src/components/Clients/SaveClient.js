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
  <form onSubmit={(ev) => { ev.preventDefault(); props.handleSubmit()}}>
    <Text type='title'>Cadastrar Cliente</Text>
    <TextField autoFocus required name='client.name' label='Nome' fullWidth />
    <TextField name='client.email' label='E-mail' fullWidth type="email" />
    <MaskedTextField fullWidth required label='Celular' name='client.phone' mask='(99) 99999-9999' />
    <Button type='submit' style={style.submitButton} raised color='primary'>Cadastrar Cliente</Button>
  </form>
</FormContainer>
);

export default SaveClient;