import React from 'react';
import WithData from '../components/withData'

const CLIENT = ({_id}) => `{
  client(_id: "${_id}"){
    _id name products{ product{name} status{name}} tasks{_id content completed date}
  }
}`;

const ADD_TASK = ({content, date, client_id}) => `mutation {
  addTask(task: {
    content: "${content}"
    date: "${date}"
    client_id: "${client_id}"
  }) { _id }
}`;

class TestScreen extends React.Component {
  render() {
    return(
      <WithData query={CLIENT({_id: "5adf3d1720e2ea003b9ef6b8"})}>
        {({data, mutation, handler}) => {
          if(!data) return 'Loading...';

          return <div>
            {data.client.name}
            <button onClick={() => {

              const opt = {
                _id: Math.random().toString(36).substring(2),
                content: "CACHED added through WithData",
                date: new Date(),
                client_id: "5adf3d1720e2ea003b9ef6b8",
              };

              handler.set('data.client.tasks', opt, true)

              mutation(ADD_TASK({
                content: 'Task Content new Arch',
                date: new Date(),
                client_id: '5adf3d1720e2ea003b9ef6b8'
              }), true)
            }}>Add Example Task</button>

            <div>
              {data.client.tasks.map(task => <div key={task._id}>{task._id} - {task.content}</div>)}
            </div>
          </div> 
        }}
      </WithData>
    )
  }
}

export default TestScreen;