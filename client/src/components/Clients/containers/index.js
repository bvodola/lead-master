import React from 'react';
import axios from 'axios';
import Clients from '../';
import { LinearProgress } from 'material-ui/Progress';

const removeById = (arr, id) => {
  return arr.filter((v,i,a) => {
    if(v.id === id || v._id === id) return false;
    else return true
  })
}

class ClientsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  async getData(page=0, cb=() => {}) {
    const data = [...(await axios.get('/api/clients/')).data , ...this.state.data];
    const dataWasAdded = this.state.data.length < data.length;

    this.setState({ data }, () => {
      cb(dataWasAdded);
    });

  }

  deleteClient(id) {
    axios.delete('/api/clients/'+id)
    .then((response) => {
      let { data } = this.state;
      data = removeById(data, id);
      this.setState({data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  async componentDidMount() {
    await this.getData();
    this.setState({loading: false});
  }

  render() {
    return(
      this.state.loading ?
        <LinearProgress />:
        <Clients {...this.props} {...this.state} deleteClient={this.deleteClient.bind(this)} />
    )
  }
};

export default ClientsContainer;
