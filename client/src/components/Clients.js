import React from 'react';
import IconButton from 'material-ui/IconButton';
import { Icon } from '../helpers';
import { Table, Tr, Td } from '../helpers/Table';

const style = {
  actions: {
    minWidth: '100px',
    [screen.xsDown]: {
      position: 'relative',
      minWidth: '50px',
    },
    showSmUp: {
      [screen.xsDown]: {
        display: 'none'
      }
    }
  }
}

const Clients = (props) => (
  <div className='ClientsComponent'>

    <Table header={['Nome', 'Contatos', 'Produtos', 'Ações']}>
      <Tr>
        <Td stackable><strong>José da Silva Junior</strong></Td>
        <Td stackable>Alguma coisa aqui, mais alguma coisa</Td>
        <Td stackable>Algum produto ou sei lá o que</Td>
        <Td style={style.actions}>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </span>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </Td>
      </Tr>

      <Tr>
        <Td stackable><strong>José da Silva Junior</strong></Td>
        <Td stackable>Alguma coisa aqui, mais alguma coisa</Td>
        <Td stackable>Algum produto ou sei lá o que</Td>
        <Td style={style.actions}>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </span>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </Td>
      </Tr>

      <Tr>
        <Td stackable><strong>José da Silva Junior</strong></Td>
        <Td stackable>Alguma coisa aqui, mais alguma coisa</Td>
        <Td stackable>Algum produto ou sei lá o que</Td>
        <Td style={style.actions}>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </span>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </Td>
      </Tr>

      <Tr>
        <Td stackable><strong>José da Silva Junior</strong></Td>
        <Td stackable>Alguma coisa aqui, mais alguma coisa</Td>
        <Td stackable>Algum produto ou sei lá o que</Td>
        <Td style={style.actions}>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </span>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </Td>
      </Tr>

    </Table>

  </div>
);

export default Clients;
