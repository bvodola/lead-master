import React from 'react';
import axios from '../../../helpers/axios';
import SaveClient from '../SaveClient';

const initialState = () => (
  {
    client: {
      name: '',
      phone: '',
      email: ''
    }
  }
);

class SaveClientContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.post('/api/clients/', { ...this.state.client })
      .then((response) => {
        this.setState({client: initialState().client}, () => {
        });
      })
  }

  getData(page=0, cb=() => {}) {

    const { clientId } = this.props;

    if(typeof clientId !== 'undefined') {
      axios.get('/api/clients/'+clientId)
        .then((response) => {
          const client = response.data[0];
          this.setState({ client });
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return(
      <SaveClient scope={this} {...this.props} {...this.state} handleSubmit={this.handleSubmit} />
    )
  }
};

export default SaveClientContainer;
