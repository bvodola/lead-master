import React from 'react'
import DocumentsForm from './DocumentsForm'
import { StateHandler } from 'react-form-container';
import axios from '../../helpers/axios';
import { cookie } from '../../helpers';
import { LinearProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';

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
    let _id = this.props.clientId;

    if(typeof _id === 'undefined') {
      _id = (await axios.post('/api/clients/', this.state.client, {
        headers: {'Authorization': 'Bearer '+cookie.get('token')}
      })).data._id;
    } else {
      await axios.put('/api/clients/'+_id, this.state.client, {
        headers: {'Authorization': 'Bearer '+cookie.get('token')}
      });
    }
    window.open('/documents/'+_id);
    this.props.history.push('/documents-form/'+_id);
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
      const client = (await axios.get('/api/clients/'+clientId, {
        headers: {'Authorization': 'Bearer '+cookie.get('token')}
      })).data
      this.setState({ client: { ...this.state.client, ...client}});
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
          scope={this}
        />
      )
    }

  }
}

export default withRouter(DocumentsFormContainer);
