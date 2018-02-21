import React from 'react'
import PropTypes from 'prop-types';
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider';
import Text from 'material-ui/Typography';
import { FormContainer, TextField, MaskedTextField, CheckboxGroup } from 'react-form-container';

const style = {
  container: {
    padding: '32px'
  },

  box: {
    padding: '32px',
    margin: '16px -32px',
    background: '#f9f9f9'
  }
}

const DocumentsForm = (props) => {
  const { client, handleChangeAge, isUnder16, scope, completeAddress } = props

  return(
    <FormContainer scope={scope}>
      <div style={style.container}>
        <Text type='title'>Gerar Documentos DPVAT</Text>
        <TextField name='client.name' label="Nome da vítima" fullWidth />
        <MaskedTextField name='client.birthday' mask='99/99/9999' onBlur={() => handleChangeAge()} label="Data de Nascimento" fullWidth />
        <MaskedTextField name='client.accident_date' mask='99/99/9999' label="Data do acidente" fullWidth />
        {!isUnder16?
          <div>
            <TextField name='client.nacionality' label="Nacionalidade" fullWidth />
            <TextField name='client.marital_status' label="Estado Civil" fullWidth />
            <TextField name='client.job' label="Emprego" fullWidth />
            <MaskedTextField name='client.income' mask='money' label="Renda mensal" fullWidth />
          </div>
        :null}

        <div style={style.box}>
          <Text type='subheading'>Dados de contato</Text>
          <MaskedTextField name='client.phone' mask='(99) 99999-9999' label="Telefone" fullWidth />
          <TextField name='client.email' label="Email" fullWidth />
        </div>

        <div style={style.box}>
          <Text type='subheading'>Documentos</Text>
          <TextField name='client.rg.number' label="Número do RG" fullWidth />
          <MaskedTextField name='client.rg.expedition_date' mask='99/99/9999' label="Data de expedição" fullWidth />
          <TextField name='client.rg.emitter' label="Órgão Emissor" fullWidth />
          <MaskedTextField name='client.cpf' label="CPF" fullWidth mask='999.999.999-99' />
        </div>

        {isUnder16?
        <div style={style.box}>
          <Text type='subheading'>Representante Legal</Text>
          <TextField name='client.tutor.name' label="Nome" fullWidth />
          <MaskedTextField name='client.tutor.cpf' label="CPF" fullWidth mask='999.999.999-99' />
          <TextField name='client.tutor.job' label="Profissão" fullWidth />
          <TextField name='client.tutor.nacionality' label="Nacionalidade" fullWidth />
          <TextField name='client.tutor.marital_status' label="Estado Civil" fullWidth />
          <TextField name='client.tutor.email' label="Email" fullWidth />
          <MaskedTextField name='client.tutor.phone' label="Telefone" fullWidth mask='(99) 99999-9999'/>
        </div>
        :null}

        <div style={style.box}>
          <Text type='subheading'>Endereço{isUnder16?' (Representante Legal)':''}</Text>
          <MaskedTextField onBlur={(ev) => completeAddress(ev.target.value)} name='client.address.zip' label="CEP" fullWidth mask='99999-999' />
          <TextField name='client.address.street' label="Endereço" fullWidth />
          <TextField name='client.address.number' label="Número" fullWidth />
          <TextField name='client.address.complement' label="Complemento" fullWidth />
          <TextField name='client.address.neighborhood' label="Bairro" fullWidth />
          <TextField name='client.address.city' label="Cidade" fullWidth />
          <TextField name='client.address.state' label="Estado" fullWidth />
        </div>

        <div style={style.box}>
          <Text type='subheading'>Dados Bancários{isUnder16?' (Representante Legal)':''}</Text>
          <TextField name='client.bank_account.name' label="Banco" fullWidth />
          <TextField name='client.bank_account.type' label="Tipo" fullWidth />
          <TextField name='client.bank_account.agency' label="Agência" fullWidth />
          <TextField name='client.bank_account.number' label="Conta" fullWidth />
        </div>

        <div style={style.box}>
          <Text type='subheading'>Gerar também formulários para</Text>
          <CheckboxGroup name='client.products' options={[
            {name: 'fisioterapia', label: 'Fisioterapia'},
          ]} />
        </div>

        <Button style={{width: '100%'}} variant='raised' color='primary' onClick={() => props.onSubmit()}>Gerar Documentos</Button>
      </div>
    </FormContainer>
  )
}

export default DocumentsForm;

DocumentsForm.propTypes = {
  handleChangeAge: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object
}
