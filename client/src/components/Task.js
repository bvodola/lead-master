import React from 'react';
import Radium from 'radium';

import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';

import { screen } from '../helpers/grid';
import Text from '../helpers/Text';
import { Icon } from '../helpers';
import { Table, Tr, Td } from '../helpers/Table';

const style = {
  time: {
    fontWeight: 'bold',
    marginTop: '16px',
  },
  name: {
    marginTop: '16px',
    minWidth: '100px',
    fontWeight: 'bold',
  },
  actions: {
    minWidth: '50px',
    [screen.smUp]: {
      minWidth: '150px',
    },
    showSmUp: {
      display: 'none',
      [screen.smUp]: {
        display: 'inline'
      }
    }
  }

}

const Task = (props) => {

  return(
    <Tr>
      <Td style={{padding: '8px <0></0>'}}>
        <Checkbox />
      </Td>
      <Td style={style.time} inline>
        07:40
      </Td>
      <Td style={style.name} inline>
        José da Silva
      </Td>
      <Td stackable style={{marginBottom: '16px'}}>
        Ligar para o José imediatamente.
        Ligar para o José imediatamente.
        Ligar para o José imediatamente.
        Ligar para o José imediatamente.
      </Td>
      <Td>
        <div style={style.actions}>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </span>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>plus_one</Icon>
            </IconButton>
          </span>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </Td>
    </Tr>
  )
};

const TaskList = (props) => (
  <Table {...props}></Table>
);

export { TaskList };
export default Radium(Task);
