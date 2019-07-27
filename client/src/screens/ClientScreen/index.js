import React from 'react'
import moment from 'moment';
import 'moment/locale/pt-br';
import Modal from '../../components/Modal'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Icon } from '../../helpers';
import StateHandler from '../../helpers/form/StateHandler';
import {Table, Tr, Td} from '../../helpers/Table'
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import {CLIENT, ADD_TASK, TOGGLE_TASK, EDIT_TASK, REMOVE_TASK, ADD_LOG, EDIT_LOG, REMOVE_LOG} from '../../types';
import WithData from '../../components/withData'
import ContentEditable from 'react-contenteditable'
import { DatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import DatePickerButton from '../../components/DatePickerButton'
moment.locale('pt-br');

const sortBy = (prop) => (a,b) => {
  if(a[prop] < b[prop]) return -1;
  if(a[prop] > b[prop]) return 1;
  return 0;
}

class ClientScreen extends React.Component {

  constructor(props) {
    super(props);

    this.initialTaskState = () => ({
      client_id: this.props.clientId,
      content: '',
      date: new Date().setHours(0,0,0,0),
    })

    this.initialLogState = () => ({
      client_id: this.props.clientId,
      content: '',
    })

    this.state = {
      addTaskModalOpen: false,
      addLogModalOpen: false,
      task: this.initialTaskState(),
      log: this.initialLogState(),
      selectedTableRow: null,
    }

    this.handler = new StateHandler(this);
  }

  toggleAddTaskModal = () => {
    this.setState({addTaskModalOpen: !this.state.addTaskModalOpen})
  }

  toggleAddLogModal = () => {
    this.setState({addLogModalOpen: !this.state.addLogModalOpen})
  }

  render() {
    const { clientId } = this.props;
    const { task, log } = this.state;

    const sameDayAsNext = (t,i) => t[i+1] && moment(t[i].tDate).format('YY-MM-DDDD') === moment(t[i+1].tDate).format('YY-MM-DDDD')
    const sameDayAsBefore = (t,i) => t[i-1] && moment(t[i].tDate).format('YY-MM-DDDD') === moment(t[i-1].tDate).format('YY-MM-DDDD')

    return (
      <WithData query={CLIENT({_id: clientId})}>
        {({data, mutation, handler}) => {
          if(!data || !data.client) return 'Loading...';

          let {tasks, logs, products} = data.client;
          logs = logs.map(l => ({ ...l, type: 'log', tDate: new Date(l.created) }));
          tasks = tasks.map(t => ({ ...t, type: 'task', tDate: new Date(t.date+'T23:59:59.999999-02:00') }))
          let timeline = [ ...logs, ...tasks ];
          timeline.sort(sortBy('tDate'))

          return(
            <div>
              <h1>{data.client.name}</h1>
              <Button onClick={this.toggleAddTaskModal}>Nova Tarefa</Button>
              <Button onClick={this.toggleAddLogModal}>Novo Registro</Button>

              <Table header={['Data', 'Descrição', 'Ações']}>
                {timeline.map((item,i) => (
                  <Tr 
                    key={item._id}
                    style={{
                      // borderBottom: sameDayAsNext(timeline,i) ? 'none' : '1px solid #eee',
                      backgroundColor: item._id === this.state.selectedTableRow ? '#eee' : 'transparent',
                      ':hover': {
                        backgroundColor: '#eee',
                      }
                    }}
                  >

                    <Td stackable style={{marginTop: '10px', fontWeight: 'bold'}}>
                        {item.type === 'task' ?
                          <DatePickerButton
                            style={{cursor: 'pointer'}}
                            value={moment(item.date).format('YYYY-MM-DD')}
                            onChange={(date) => {
                              date = new Date(date).setHours(0,0,0,0);
                              handler.set(
                                'data.client.tasks',
                                data.client.tasks.map(t => t._id === item._id ? {...item, date} : t )
                              )
                              mutation(EDIT_TASK({...item, date}));
                            }}
                          >
                            {moment(item.date).format('DD/MM/YYYY')}
                          </DatePickerButton>
                          :
                          moment(item.date).format('DD/MM/YYYY')
                        }
                    </Td>

                    <Td stackable style={{textDecoration: item.completed ? 'line-through' : 'none', width: '80%', padding: '3px'}}>
                      {item.type === 'task' ?
                        <Checkbox
                        style={{
                          marginLeft: '-4px',
                          marginRight: '8px',
                          padding: '0',
                        }}
                        checked={item.completed}
                        onClick={() => {
                          handler.set(
                            'data.client.tasks',
                            data.client.tasks.map(t => t._id === item._id ? {...item, completed: !item.completed} : t )
                          )
                          mutation(TOGGLE_TASK({_id: item._id, completed: !item.completed}));
                        }}
                      />:
                      ''
                      }
                      <ContentEditable
                        style={{outline: '0px solid transparent'}}
                        tagName='span'
                        html={item.content}
                        onChange={(ev) => {
                          const content = ev.target.value;
                          handler.set(
                            `data.client.${item.type}s`,
                            data.client[`${item.type}s`].map(t => t._id === item._id ? {...item, content} : t )
                          )
                          item.type == 'task' ?
                            mutation(EDIT_TASK({...item, content})):
                            mutation(EDIT_LOG({...item, content}))
                        }}
                        onFocus={() => {
                          handler.set('busy', true)
                          this.setState({selectedTableRow: item._id})
                        }}
                        onBlur={() => {
                          handler.set('busy', false)
                          this.setState({selectedTableRow: null})
                        }}
                      />
                    </Td>
                    <Td>
                      <IconButton 
                        style={{
                          padding: '8px',
                          margin: '-4px 0'
                        }}
                        onClick={() => {
                          handler.set(
                            `data.client.${item.type}s`,
                            data.client[`${item.type}s`].filter(t => t._id !== item._id)
                          )
                          item.type == 'task' ?
                            mutation(REMOVE_TASK({_id: item._id})):
                            mutation(REMOVE_LOG({_id: item._id}))
                        }}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </Table>

              <div style={{marginTop: '32px'}}>
                {products.map(product => (
                  <div key={product._id }>
                    <b>{product.product.name}</b>
                    <p>{product.status.name}</p>
                  </div>
                ))}
              </div>
              
              <Modal
                open={this.state.addTaskModalOpen}
                toggle={this.toggleAddTaskModal}
              >
                <h1>Adicionar tarefa para {data.client.name}</h1>

                <TextField
                  autoFocus
                  label='Descrição'
                  variant='outlined'
                  style={{
                    marginBottom: '24px'
                  }}
                  value={task.content}
                  onChange={(ev) => this.handler.set('task.content', ev.target.value)}
                />

                <DatePicker
                  keyboard
                  showTodayButton
                  allowKeyboardControl
                  autoOk
                  value={moment(task.date).format('YYYY-MM-DD')}
                  label="Data"
                  variant="outlined"
                  format="DD/MM/YYYY"
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  onChange={(date) => {
                    date = new Date(date).setHours(0,0,0,0);
                    console.log(date)
                    this.handler.set('task.date', date)
                  }} 
                  todayLabel={'Hoje'}
                  cancelLabel={'Cancelar'}
                />

                <Button variant="contained" color="primary"
                  style={{
                    marginTop: '24px',
                    padding: '16px',
                  }}
                  onClick={() => {
                    const temp = {...task, _id: Math.random().toString(36).substring(2)}
                    handler.set('data.client.tasks', temp, true)
                    mutation(ADD_TASK(task), true)
                    this.handler.set('task', this.initialTaskState())
                    this.toggleAddTaskModal()
                  }}
                >
                  Salvar
                </Button>

              </Modal>

              <Modal
                open={this.state.addLogModalOpen}
                toggle={this.toggleAddLogModal}
              >
                <h1>Adicionar registro para {data.client.name}</h1>

                <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={(ev) => {
                  ev.preventDefault();
                  const temp = {...log, created: new Date(), _id: Math.random().toString(36).substring(2)}
                  handler.set('data.client.logs', temp, true)
                  mutation(ADD_LOG(log), true)
                  this.handler.set('log', this.initialLogState())
                  this.toggleAddLogModal()
                }}>
                  <TextField
                    autoFocus
                    label='Descrição'
                    variant='outlined'
                    value={log.content}
                    onChange={(ev) => this.handler.set('log.content', ev.target.value)}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      marginTop: '24px',
                      padding: '16px',
                    }}
                  >
                    Salvar
                  </Button>
                </form>
              </Modal>
            </div>
          )
        }}
      </WithData>
      
    )
  }
}

ClientScreen.propTypes = {
  clientId: PropTypes.string // ID of the client to be fetched
}

export default ClientScreen;