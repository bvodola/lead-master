import React from 'react';
import axios from '../../helpers/axios';
import ListClients from './ListClients';
import ClientSelector from './ClientSelector';
import { cookie } from '../../helpers';

const removeById = (arr, id) => {
  return arr.filter((v,i,a) => {
    if(v.id === id || v._id === id) return false;
    else return true
  })
}

const getCachedData = () =>  {
  return {
    data: JSON.parse(localStorage.getItem('ListClients_state_data')),
    page: JSON.parse(localStorage.getItem('ListClients_state_page')),
    searchTerm: JSON.parse(localStorage.getItem('ListClients_state_searchTerm')),
  }
}

const setCachedData = (state) =>  {
  localStorage.setItem('ListClients_state_data', JSON.stringify(state.data));
  localStorage.setItem('ListClients_state_page', JSON.stringify(state.page));
  localStorage.setItem('ListClients_state_searchTerm', JSON.stringify(state.searchTerm));
}

class ClientsContainer extends React.Component {

  constructor(props) {
    super(props);
    const {data, page, searchTerm} = getCachedData();
    this.state = {
      searchTerm: searchTerm || '',
      data: data || [],
      page: page ? Number(page) : 2,
      loading: false,
      showLoadMoreButton: true,
      isClientSelected: false,
    };
  }

  async search(term) {
    this.setState({loading: true})
    const data = (await axios.get(`/api/clients?search=${term}&sort=name`, {
      headers: {'Authorization': 'Bearer '+cookie.get('token')}
    })).data;
    this.setState({ data, loading: false, page:2, showLoadMoreButton: true}, () => {
      setCachedData(this.state);
    });

  }

  async getData(cb=() => {}) {
    this.setState({loading: true})
    const { page } = this.state;
    const data = [ ...this.state.data, ...(await axios.get(`/api/clients?search=${this.state.searchTerm}&page=${page}&sort=name`, {
      headers: {'Authorization': 'Bearer '+cookie.get('token')}
    })).data];
    const dataWasAdded = this.state.data.length < data.length;

    if(!dataWasAdded)
      this.setState({showLoadMoreButton: false});

    this.setState({ data, page: page+1 }, () => {
      this.setState({loading: false})
      setCachedData(this.state);
      cb(dataWasAdded);
    });

  }

  deleteClient(id) {
    axios.delete('/api/clients/'+id, {
      headers: {'Authorization': 'Bearer '+cookie.get('token')}
    })
    .then((response) => {
      let { data } = this.state;
      data = removeById(data, id);
      this.setState({data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  clearData() {
    this.setState({data: []}, () => {setCachedData(this.state);});
  }

  render() {
    const Component = this.props.selector ? ClientSelector : ListClients;

    return(
      <Component
        scope={this} 
        {...this.props}
        {...this.state}
        getData={this.getData.bind(this)}
        deleteClient={this.deleteClient.bind(this)}
        setState={this.setState.bind(this)}
        search={this.search.bind(this)}
        loading={this.state.loading}
        clearData={this.clearData.bind(this)}
      />
    )
  }
};

export default ClientsContainer;
