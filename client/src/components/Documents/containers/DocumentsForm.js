import React from 'react'
import DocumentsForm from '../DocumentsForm'
import StateHandler from '../../../helpers/form/StateHandler'
import axios from '../../../helpers/axios';

const initialState = () => ({
  client: {
    name: '',
    birthday: '',
    nacionality: '',
    marital_status: '',
    job: '',
    income: '',
    rg: {
      number: '',
      expedition_date: '',
      emitter: ''
    },
    cpf: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      zip: '',
      city: '',
      state: '',
    },
    phone: '',
    email: '',
    accident_date: '',
    bank_account: {
      name: '',
      type: '',
      agency: '',
      number: ''
    },
    tutor: {
      name: '',
      email: '',
      phone: '',
      nacionality: '',
      marital_status: '',
      job: '',
      cpf: '',
    }
  },
  isUnder16: false,
})

class DocumentsFormContainer extends React.Component {

  constructor() {
    super()
    this.state = initialState();
  }

  async onSubmit() {
    const client = (await axios.post('/api/clients/', this.state.client)).data;
    window.open('/documents/'+client._id);
  }

  handleChangeAge() {
    const { birthday } = this.state.client;
    const age = String(birthday).length === 10 ?
      Math.floor(((new Date()) - new Date(birthday))/31536000000):99;
    const isUnder16 = (age < 16);

    this.setState({isUnder16});
  }

  render() {
    const stateHandler = new StateHandler(this);
    return(
      <DocumentsForm
        client={this.state.client}
        isUnder16={this.state.isUnder16}
        handleChange={stateHandler.set.bind(this)}
        handleChangeAge={this.handleChangeAge.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

export default DocumentsFormContainer
