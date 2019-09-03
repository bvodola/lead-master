import React from 'react';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import WithData from 'src/components/withData';
import { Icon, unmask, whatsappUrl } from 'src/helpers';
import { Table, Tr, Td } from 'src/helpers/Table';
import { LEADS, TOGGLE_CLIENT_ARCHIVED } from 'src/types';
import moment from 'moment';

const styles = {
  description: {
    maxWidth: '300px'
  }
}

class LeadsScreen extends React.Component {

  render() {
    return (

        <WithData polling={5000} query={LEADS()}>
          {({data, query, mutation, handler, loading, loadingQueryName}) => {

            if(!data) {
              return 'Loading...'
            } else {
              return (
                <Table header={['Data', 'Nome', 'Telefone', 'Descrição', 'Ações']}>
                  {data.clients.map(client => (
                    <Tr key={client._id}>
                      <Td>{moment(client.created).fromNow()}</Td>
                      <Td>{client.name}</Td>
                      <Td>
                        <a target='_blank' href={`http://${whatsappUrl}.whatsapp.com/send?phone=55`+unmask(client.phone)}>
                          {client.phone} <Icon style={{fontSize: '12px'}}>open_in_new</Icon>
                        </a>
                      </Td>
                      <Td style={styles.description}>
                        {client.lead_description}
                      </Td>
                      <Td>
                        <Link style={{textDecoration: 'none'}} to={'/documents-form/'+client._id}>
                          <IconButton>
                            <Icon>description</Icon>
                          </IconButton>
                        </Link>
                        <IconButton onClick={() => {
                          handler.set('data.clients', data.clients.filter(c => c._id !== client._id));
                          mutation(TOGGLE_CLIENT_ARCHIVED({_id: client._id, is_archived: true}));
                        }}>
                          <Icon>archive</Icon>
                        </IconButton>
                      </Td>
                    </Tr>
                  ))}
                </Table>
              )
            }
          
      }}
      </WithData>
    )
  }
}

LeadsScreen.propTypes = {
}

export default LeadsScreen;