import React from 'react';
import axios from 'axios';
import Clients from '../';

class ClientsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getData(page=0, cb=() => {}) {

    axios.get('/api/clients/')
      .then((response) => {
        const data = [ ...this.state.data , ...response.data ];
        const dataWasAdded = this.state.data.length < data.length;
        this.setState({ data }, () => {
          cb(dataWasAdded);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return(
      <Clients {...this.props} {...this.state} />
    )
  }
};

export default ClientsContainer;
