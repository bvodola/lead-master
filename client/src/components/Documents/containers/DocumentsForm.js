import React from 'react'
import DocumentsForm from '../DocumentsForm'
import { StateHandler } from 'react-form-container';
import axios from '../../../helpers/axios';
import { LinearProgress } from 'material-ui/Progress';

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
    },
    products: []
  },
  isUnder16: false,
  loading: true,
})

class DocumentsFormContainer extends React.Component {

  constructor() {
    super()
    this.state = initialState();
  }

  async onSubmit() {
    let _id = this.state.client._id;

    if(typeof _id === 'undefined') {
      _id = (await axios.post('/api/clients/', this.state.client)).data._id;
    } else {
      await axios.put('/api/clients/'+_id, this.state.client);
    }
    window.open('/documents/'+_id);
  }

  handleChangeAge() {
    const { birthday } = this.state.client;
    const age = String(birthday).length === 10 ?
      Math.floor(((new Date()) - new Date(birthday))/31536000000):99;
    const isUnder16 = (age < 16);

    this.setState({isUnder16});
  }

  async getData() {
    const { clientId } = this.props;

    if(typeof clientId !== 'undefined') {
      const client = (await axios.get('/api/clients/'+clientId)).data
      this.setState({ client });
    }
  }

  async componentDidMount() {
    await this.getData();
    this.setState({ loading: false}, () => {
      this.handleChangeAge();
    });

  }

  render() {
    const stateHandler = new StateHandler(this);

    if(this.state.loading) {
      return <LinearProgress />
    } else {
      return(
        <DocumentsForm
          client={this.state.client}
          isUnder16={this.state.isUnder16}
          handleChange={stateHandler.set.bind(this)}
          handleChangeAge={this.handleChangeAge.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          stateHandler={stateHandler}
        />
      )
    }

  }
}

export default DocumentsFormContainer
