import React from 'react';
import Radium from 'radium';

import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ContentEditable from 'react-contenteditable';

import { screen } from '../helpers/grid';
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

const Task = ({task, onDeleteTask, onToggleTask, onChangeContent, onFocusContent, onBlurContent, selected, onSelectClient}) => {

  return(
    <Tr  style={{backgroundColor: selected ? '#eee' : '#fff',}}>
      <Td style={{padding: '8px 0'}}>
        <Checkbox
          checked={task.completed}
          onClick={(ev) => {
            onToggleTask(task);
            ev.target.blur();
          }}
        />
      </Td>
      {/* <Td style={style.time} inline>
        07:40
      </Td> */}
      <Td style={style.name} inline>
        <span style={{cursor: 'pointer'}} onClick={() => onSelectClient(task.client._id)}>{task.client.name}</span>
      </Td>
      <Td stackable style={{marginBottom: '16px', textDecoration: task.completed ? 'line-through' : 'none'}}>
        <ContentEditable
          style={{outline: '0px solid transparent'}}
          tagName='span'
          html={task.content}
          onChange={(ev) => onChangeContent(task, ev.target.value)}
          onFocus={() => onFocusContent(task)}
          onBlur={() => onBlurContent()}
        />
      </Td>
      <Td>
        <div style={style.actions}>
          <span style={style.actions.showSmUp}>
          <IconButton 
            style={{
              padding: '8px',
              margin: '-4px 0'
            }}
            onClick={() => onDeleteTask(task._id)}
          >
            <Icon>delete</Icon>
          </IconButton>
          </span>
          <span style={style.actions.showSmUp}>
            <IconButton>
              <Icon>plus_one</Icon>
            </IconButton>
          </span>
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
