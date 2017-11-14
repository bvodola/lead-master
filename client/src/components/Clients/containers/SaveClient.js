import React from 'react';
import axios from 'axios';
import SaveClient from '../SaveClient';

class SaveClientContainer extends React.Component {

  getData(page=0, cb=() => {}) {

    axios.get('/api/clients/'+this.props.clientId)
      .then((response) => {
        const client = response.data[0];
        this.setState({ client });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return(
      <SaveClient {...this.props} {...this.state} />
    )
  }
};

export default SaveClientContainer;
