import React from 'react';
import Button from 'material-ui/Button';
import WithData from './withData';
import { Row, Col, col, flexCenter } from '../helpers/grid';
import { Icon } from '../helpers';
import Task, { TaskList } from './Task';
import {TASKS_FROM_PERIOD, REMOVE_TASK, TOGGLE_TASK, EDIT_TASK} from '../types';
import moment from 'moment';
import ClientScreen from '../screens/ClientScreen/';
import DatePickerButton from './DatePickerButton';
import Modal from './Modal';
import { LinearProgress } from 'material-ui/Progress';

const style = {
  wrapper: {
    ...col('100%'),
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

class Agenda extends React.Component {

  constructor() {
    super();
    this.state = {
      startDate: new Date((new Date()).setHours(0,0,0,0)),
      endDate: new Date((new Date()).setHours(23,59,59,999)),
      selectedTableRow: null,
      selectedClientId: null,
    }
  }

  componentDidMount() {
    window.onkeypress = (ev) => {
      ev = ev || window.event;
      if(
        document.activeElement.nodeName !== 'INPUT' &&
        document.activeElement.nodeName !== 'TEXTAREA' &&
        !document.activeElement.attributes.contentEditable
      ) {
        let {startDate, endDate} = this.state;

        switch(ev.keyCode) {
          case(44): // '<'
            this.handleChangeDate(startDate.setDate(startDate.getDate()-1));
            break;
          case(46): // '>'
            this.handleChangeDate(startDate.setDate(startDate.getDate()+1));
            break;
        }
      }
    }
  }

  handleSelectClient = (selectedClientId, refetch) => {
    this.setState({selectedClientId});
    if(!selectedClientId && typeof refetch === 'function') refetch()
  }

  handleChangeDate = (newDate) => {
    this.setState({
      startDate: new Date(new Date(newDate).setHours(0,0,0,0)),
      endDate: new Date(new Date(newDate).setHours(23,59,59,999)),
    })
  }

  render() {

    const {startDate, endDate, selectedTableRow, selectedClientId} = this.state;

    return(
      <WithData query={TASKS_FROM_PERIOD({startDate, endDate})}>
        {({data, query, mutation, handler, loadingQueryName}) => {

          if(!data || !data.tasksFromPeriod) return 'Loading...';
          const onDeleteTask = (taskId) => {
            handler.set(
              'data.tasksFromPeriod',
              data.tasksFromPeriod.filter(t => t._id !== taskId)
            ) 
            mutation(REMOVE_TASK({_id: taskId}), true)
          }

          const onToggleTask = (task) => {
            console.log(data.tasksFromPeriod.map(t => t._id === task._id ? {...task, completed: !task.completed} : t ))
            handler.set(
              'data.tasksFromPeriod',
              data.tasksFromPeriod.map(t => t._id === task._id ? {...task, completed: !task.completed} : t )
            )
            mutation(TOGGLE_TASK({_id: task._id, completed: !task.completed}));
          }

          const onChangeContent = (task, content) => {
            handler.set(
              `data.tasksFromPeriod`,
              data.tasksFromPeriod.map(t => t._id === task._id ? {...task, content} : t )
            )
            mutation(EDIT_TASK({...task, content}))
          }

          const onFocusContent = (task) => {
            handler.set('busy', true)
            this.setState({selectedTableRow: task._id})
          }

          const onBlurContent = () => {
            handler.set('busy', false)
            this.setState({selectedTableRow: null})
          }

          return (
            <div style={style.wrapper}>
              <Row style={flexCenter}>
                <Col>
                  <h1>
                    Agenda
                  </h1>
                </Col>
                <Col>
                  <b style={{marginLeft: '24px'}}>{moment(startDate).format('DD/MM/YYYY')}</b>
                </Col>
                <Col style={{position: 'relative', float: 'right'}}>
                  <DatePickerButton value={startDate} onChange={this.handleChangeDate} />
                </Col>
              </Row>
              
              <TaskList style={{width: '99.66%'}}>
                {
                  loadingQueryName === 'tasksFromPeriod' ?
                    <LinearProgress />:
                    data.tasksFromPeriod.map(task =>
                      <Task
                        key={task._id}
                        task={task}
                        onDeleteTask={onDeleteTask} 
                        onToggleTask={onToggleTask}
                        onChangeContent={onChangeContent}
                        onFocusContent={onFocusContent}
                        onBlurContent={onBlurContent}
                        selected={selectedTableRow === task._id}
                        onSelectClient={this.handleSelectClient}
                      />
                    )
                }
              </TaskList>
          
              <Button variant='fab' color="primary" aria-label='add' style={style.addTask}>
                <Icon>add</Icon>
              </Button>

              <Modal
                open={selectedClientId ? true : false}
                toggle={() => this.handleSelectClient(null, query(null, {triggerLoading: false}))}
                wrapperStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)'
                }}
              >
                <ClientScreen clientId={selectedClientId} />
              </Modal>
            </div>
          )
        }}
      
      </WithData>
    )
  }
}

export default Agenda;
