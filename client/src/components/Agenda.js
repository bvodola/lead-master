import React from 'react';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import { Row, Col, col, flexCenter } from '../helpers/grid';
import Text from '../helpers/Text';
import { Icon } from '../helpers';
import Task, { TaskList } from './Task';
import { Table, Tr, Td } from '../helpers/Table';

const style = {
  wrapper: {
    ...col(),
    marginBottom: '100px'
  },
  subheading: {
    ...col('100%'),
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  addTask: {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
  }
}

const Agenda = () => (
  <div style={style.wrapper}>

    <Row style={flexCenter}>
      <Col>
        <Text type='title'>
          Agenda
        </Text>
      </Col>
      <Col>

        <Text type='body1'>24/10/2017</Text>
      </Col>
      <Col style={{position: 'relative', float: 'right'}}>
        <IconButton>
          <Icon>event</Icon>
        </IconButton>
      </Col>
    </Row>



    <Text style={style.subheading} type='subheading'>Tarefas sem horário</Text>
    <TaskList>
      <Task />
      <Task />
    </TaskList>

    <Button fab color="primary" aria-label="add" style={style.addTask}>
      <Icon>add</Icon>
    </Button>

  </div>
);

export default Agenda;
