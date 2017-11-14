import React from 'react';
import axios from 'axios';
import Clients from '../';

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
      .catch((err) => {
        console.log(err);
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

  componentDidMount() {
    this.getData();
  }

  render() {
    return(
      <Clients {...this.props} {...this.state} deleteClient={this.deleteClient.bind(this)} />
    )
  }
};

export default ClientsContainer;
