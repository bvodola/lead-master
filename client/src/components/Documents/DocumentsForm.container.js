import React from 'react';
import DocumentsForm from './DocumentsForm';
import { StateHandler } from 'react-form-container';
import axios from '../../helpers/axios';
import { cookie, getAge } from '../../helpers';
import { LinearProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';

const initialState = () => ({
  client: {
    is_lead: false,
    name: '',
    birthday: '',
    nacionality: 'brasileira',
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
      state: ''
    },
    phone: '',
    email: '',
    accident_date: '',
    bank_account: {
      type: '',
      name: '',
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
      cpf: ''
    },
    products: []
  },
  isUnder16: false,
  loading: true,
  isSnackbarOpened: false
});

class DocumentsFormContainer extends React.Component {
  constructor() {
    super();
    this.state = initialState();
  }

  handleToggleSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    const newState = reason !== 'timeout' ? !this.state.isSnackbarOpened : false;
    this.setState({ isSnackbarOpened: newState });
  };

  async onSubmit(generate = true) {
    let _id = this.props.clientId;
    let { client } = this.state;
    client.is_lead = false; // As we are generating client forms, he is no longer just a lead
    this.setState({ client });

    if (typeof _id === 'undefined') {
      // If we have no id, save new client
      _id = (await axios.post('/api/clients/', this.state.client, {
        headers: { Authorization: 'Bearer ' + cookie.get('token') }
      })).data._id;
    } else {
      // Otherwise, updates existing client
      await axios.put('/api/clients/' + _id, this.state.client, {
        headers: { Authorization: 'Bearer ' + cookie.get('token') }
      });
    }

    // Goes to the client page and opens feedback snackbar
    this.props.history.push('/documents-form/' + _id);
    this.handleToggleSnackbar();

    // Open Google Drive forms window
    if (generate) window.open(`/documents/${_id}?forms=${client.products.join(',')}`);
  }

  handleChangeAge() {
    const { birthday } = this.state.client;

    if (birthday.length === 10) {
      const b = birthday;
      const age = getAge(b.substr(6, 4), b.substr(3, 2), b.substr(0, 2));
      const isUnder16 = age < 16;

      this.setState({ isUnder16 });
    } else if (this.state.isUnder16) {
      this.setState({ isUnder16: false });
    }
  }

  async getData() {
    const { clientId } = this.props;

    if (typeof clientId !== 'undefined') {
      const client = (await axios.get('/api/clients/' + clientId, {
        headers: { Authorization: 'Bearer ' + cookie.get('token') }
      })).data;
      this.setState({ client: { ...this.state.client, ...client } });
    }
  }

  async componentDidMount() {
    await this.getData();
    this.setState({ loading: false }, () => {
      this.handleChangeAge();
    });
  }

  async completeAddress(zip) {
    if (zip.length == 9) {
      try {
        const res = (await axios.get(`http://viacep.com.br/ws/${zip}/json/`)).data;
        let { client } = this.state;

        let address = {
          zip,
          street: res.logradouro,
          complement: res.complemento,
          neighborhood: res.bairro,
          city: res.localidade,
          state: res.uf
        };

        client.address = { ...client.address, ...address };
        this.setState({ client });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const stateHandler = new StateHandler(this);

    console.log(this.state);
    if (this.state.loading) {
      return <LinearProgress />;
    } else {
      return (
        <DocumentsForm
          {...this.state}
          handleChange={stateHandler.set.bind(this)}
          handleToggleSnackbar={this.handleToggleSnackbar.bind(this)}
          handleChangeAge={this.handleChangeAge.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          stateHandler={stateHandler}
          completeAddress={this.completeAddress.bind(this)}
          scope={this}
        />
      );
    }
  }
}

export default withRouter(DocumentsFormContainer);
