import React from 'react';
// import { StateHandler } from 'react-form-container';
import {cookie} from '../helpers';
import axios from '../helpers/axios';
import Snackbar from './Commons/Snackbar';

const withData = (Component, endpoints) => {
  
  const getInitialData = () => {
    let initialData = {}
    endpoints.forEach(e => initialData[e.name] = e.initalData || {})
    return initialData
  }

  return class ComponentWithData extends React.Component {

    constructor() {
      super();
      this.state = {
        loading: true,
        isSnackbarOpened: false,
        snackBarMessage: 'Dados salvos com sucesso',
        data: getInitialData()
      };

      this.submitData = this.submitData.bind(this)
      this.getData = this.getData.bind(this)
    }

    async submitData(endpointName, config) {
      const endpointUrl = endpoints.find(e => e.name === endpointName).url.split('?')[0]
      const data = config.data || this.state.data[endpointName]
      let _id = this.props._id || config._id
  
      try {
        if(typeof _id === 'undefined') {
          _id = (await axios.post(`/api/${endpointUrl}`, data, {
            headers: {'Authorization': 'Bearer '+cookie.get('token')}
          })).data._id;
          this.setState({data: getInitialData()}, () => this.handleToggleSnackbar());
        } else {
          await axios.put(`/api/${endpointUrl}/${_id}`, data, {
            headers: {'Authorization': 'Bearer '+cookie.get('token')}
          });
          this.handleToggleSnackbar()
        }
      
      } catch(err) {
        console.log(err);
      }
    }

    async getDataFromUrl(endpointUrl) {
      try {
        const newData = (await axios.get(`/api/${endpointUrl}`, {
          headers: {'Authorization': 'Bearer '+cookie.get('token')}
        })).data
        return newData

      } catch(err) {
        console.log(err)
      }
    }

    async getData(endpointName) {

      const newData = { ...this.state.data }

      if(endpointName) {
        let endpoint = endpoints.find(e => e.name === endpointName)
        const _id = this.props._id || endpoint._id || ''

        endpoint.url += `/${_id}`
        newData[endpointName] = await this.getDataFromUrl(endpoint.url)

      } else {
        await Promise.all(
          endpoints.map(async e => {
            const _id = this.props._id || e._id || ''
            e.url += `/${_id}`
            newData[e.name] = await this.getDataFromUrl(e.url)
          })
        )
      }

      this.setState({data: newData, loading: false})
      
    }
  
    async componentDidMount() {
      try {
        await this.getData()
      } catch(err) {
        console.log(err)
      }
    }

    handleToggleSnackbar = (event, reason) => {
      if (reason === 'clickaway') return;
      const newState = reason !== 'timeout' ?  !this.state.isSnackbarOpened : false;
      this.setState({ isSnackbarOpened: newState });
    };

    render() {
      return(
        <div>
          <Component
            data={this.state.data}
            loading={this.state.loading}
            handleToggleSnackbar={() => this.handleToggleSnackbar()}
            submitData={this.submitData}
            getData={this.getData}
            scope={this}
            {...this.props}
          />
          <Snackbar
            handleToggleSnackbar={this.handleToggleSnackbar}
            isSnackbarOpened={this.state.isSnackbarOpened}
          >
            Informações salvas com sucesso
          </Snackbar>
        </div>
      );
    }
  }
}

export default withData;

/*
endpoints: [
  {
    url: '',
    name: '',
    initialData: {
    }
    fetchData: true
  }
]
*/