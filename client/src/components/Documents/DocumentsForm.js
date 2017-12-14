import React from 'react'
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography'

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
  const { client, handleChange, handleChangeAge, isUnder16 } = props

  return(
    <div style={style.container}>
      <Typography type='title'>Gerar Formulários DPVAT</Typography>

      <TextField value={client.name} onChange={(ev) => handleChange('client.name', ev.target.value)} label="Nome da vítima" fullWidth />
      <TextField value={client.birthday} onBlur={() => handleChangeAge()} onChange={(ev) => handleChange('client.birthday', ev.target.value)} label="Data de Nascimento" fullWidth />
      {!isUnder16?
        <div>
          <TextField value={client.nacionality} onChange={(ev) => handleChange('client.nacionality', ev.target.value)} label="Nacionalidade" fullWidth />
          <TextField value={client.marital_status} onChange={(ev) => handleChange('client.marital_status', ev.target.value)} label="Estado Civil" fullWidth />
          <TextField value={client.job} onChange={(ev) => handleChange('client.job', ev.target.value)} label="Emprego" fullWidth />
          <TextField value={client.income} onChange={(ev) => handleChange('client.income', ev.target.value)} label="Renda mensal" fullWidth />
        </div>
      :null}
      <TextField value={client.accident_date} onChange={(ev) => handleChange('client.accident_date', ev.target.value)} label="Data do acidente" fullWidth />

      <div style={style.box}>
        <Typography type='subheading'>Dados de contato</Typography>
        <TextField value={client.phone} onChange={(ev) => handleChange('client.phone', ev.target.value)} label="Telefone" fullWidth />
        <TextField value={client.email} onChange={(ev) => handleChange('client.email', ev.target.value)} label="Email" fullWidth />
      </div>

      <div style={style.box}>
        <Typography type='subheading'>Documentos</Typography>
        <TextField value={client.rg.number} onChange={(ev) => handleChange('client.rg.number', ev.target.value)} label="Número do RG" fullWidth />
        <TextField value={client.rg.expedition_date} onChange={(ev) => handleChange('client.rg.expedition_date', ev.target.value)} label="Data de expedição" fullWidth />
        <TextField value={client.rg.emitter} onChange={(ev) => handleChange('client.rg.emitter', ev.target.value)} label="Órgão Emissor" fullWidth />
        <TextField value={client.cpf} onChange={(ev) => handleChange('client.cpf', ev.target.value)} label="CPF" fullWidth />
      </div>

      {isUnder16?
      <div style={style.box}>
        <Typography type='subheading'>Representante Legal</Typography>
        <TextField value={client.tutor.name} onChange={(ev) => handleChange('client.tutor.name', ev.target.value)} label="Nome" fullWidth />
        <TextField value={client.tutor.cpf} onChange={(ev) => handleChange('client.tutor.cpf', ev.target.value)} label="CPF" fullWidth />
        <TextField value={client.tutor.job} onChange={(ev) => handleChange('client.tutor.job', ev.target.value)} label="Profissão" fullWidth />
        <TextField value={client.tutor.nacionality} onChange={(ev) => handleChange('client.tutor.nacionality', ev.target.value)} label="Nacionalidade" fullWidth />
        <TextField value={client.tutor.marital_status} onChange={(ev) => handleChange('client.tutor.marital_status', ev.target.value)} label="Estado Civil" fullWidth />
        <TextField value={client.tutor.email} onChange={(ev) => handleChange('client.tutor.email', ev.target.value)} label="Email" fullWidth />
        <TextField value={client.tutor.phone} onChange={(ev) => handleChange('client.tutor.phone', ev.target.value)} label="Telefone" fullWidth />
      </div>
      :null}

      <div style={style.box}>
        <Typography type='subheading'>Endereço{isUnder16?' (Representante Legal)':''}</Typography>
        <TextField value={client.address.street} onChange={(ev) => handleChange('client.address.street', ev.target.value)} label="Endereço" fullWidth />
        <TextField value={client.address.number} onChange={(ev) => handleChange('client.address.number', ev.target.value)} label="Número" fullWidth />
        <TextField value={client.address.complement} onChange={(ev) => handleChange('client.address.complement', ev.target.value)} label="Complemento" fullWidth />
        <TextField value={client.address.neighborhood} onChange={(ev) => handleChange('client.address.neighborhood', ev.target.value)} label="Bairro" fullWidth />
        <TextField value={client.address.zip} onChange={(ev) => handleChange('client.address.zip', ev.target.value)} label="CEP" fullWidth />
        <TextField value={client.address.city} onChange={(ev) => handleChange('client.address.city', ev.target.value)} label="Cidade" fullWidth />
        <TextField value={client.address.state} onChange={(ev) => handleChange('client.address.state', ev.target.value)} label="Estado" fullWidth />
      </div>

      <div style={style.box}>
        <Typography type='subheading'>Dados Bancários{isUnder16?' (Representante Legal)':''}</Typography>
        <TextField value={client.bank_account.name} onChange={(ev) => handleChange('client.bank_account.name', ev.target.value)} label="Banco" fullWidth />
        <TextField value={client.bank_account.type} onChange={(ev) => handleChange('client.bank_account.type', ev.target.value)} label="Tipo" fullWidth />
        <TextField value={client.bank_account.agency} onChange={(ev) => handleChange('client.bank_account.agency', ev.target.value)} label="Agência" fullWidth />
        <TextField value={client.bank_account.number} onChange={(ev) => handleChange('client.bank_account.number', ev.target.value)} label="Conta" fullWidth />
      </div>

      <Button style={{width: '100%'}} raised color='primary' onClick={() => props.onSubmit()}>Gerar Documentos</Button>
    </div>
  )
}

export default DocumentsForm;

DocumentsForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object
}
