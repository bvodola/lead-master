import React from 'react';
import axios from 'axios';
import ListClients from './ListClients';


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
      searchTerm: '',
      data: [],
      page: 2,
      loading: false,
      showLoadMoreButton: true,
    };
  }

  async search(term) {
    this.setState({loading: true})
    const data = (await axios.get(`/api/clients?search=${term}&sort=name`)).data;
    this.setState({ data, loading: false, page:2, showLoadMoreButton: true});
  }

  async getData(cb=() => {}) {
    const { page } = this.state;
    const data = [ ...this.state.data, ...(await axios.get(`/api/clients?search=${this.state.searchTerm}&page=${page}&sort=name`)).data];
    const dataWasAdded = this.state.data.length < data.length;

    if(!dataWasAdded)
      this.setState({showLoadMoreButton: false});

    this.setState({ data, page: page+1 }, () => {
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

  render() {
    return(
      <ListClients
        scope={this} 
        {...this.props}
        {...this.state}
        getData={this.getData.bind(this)}
        deleteClient={this.deleteClient.bind(this)}
        setState={this.setState.bind(this)}
        search={this.search.bind(this)}
        loading={this.state.loading}
      />
    )
  }
};

export default ClientsContainer;
