const CLIENT = ({_id}) => `
  {
    client(_id: "${_id}"){
      _id name products{ product{name} status{name}} tasks{_id content completed date} logs{_id content created}
    }
  }`;

const LEADS = () => `
  {
    clients(client: { is_lead: true, is_archived: false} ) {
      _id name phone lead_description created
    }
  }`;

const TOGGLE_LEAD = ({_id, is_lead}) => `
  mutation {
    editClient(client: {
      _id: "${_id}"
      is_lead: ${is_lead}
    }) {
      _id
      is_lead
    }
  }`;

const TOGGLE_CLIENT_ARCHIVED = ({_id, is_archived}) => `
  mutation {
    editClient(client: {
      _id: "${_id}"
      is_archived: ${is_archived}
    }) {
      _id
      is_archived
    }
  }`;

const ADD_TASK = ({content, date, client_id}) => `
  mutation {
    addTask(task: {
      content: "${content}"
      date: "${date}"
      client_id: "${client_id}"
    }) { _id }
  }`;

const TOGGLE_TASK = ({_id, completed}) => `
  mutation {
    editTask(task: {
      _id: "${_id}"
      completed: ${completed}
    }) {
      _id
      content
      completed
    }
  }`;

const EDIT_TASK = ({_id, content, date}) => `
  mutation {
    editTask(task: {
      _id: "${_id}"
      content: "${content}"
      date: "${date}"
    }) {
      _id
      content
      completed
    }
  }`;

const REMOVE_TASK = ({_id}) => `
  mutation {
    removeTask(task: {
      _id: "${_id}"
    }) {
      _id
    }
  }`;

const ADD_LOG = ({content, client_id}) => `
  mutation {
    addLog(log: {
      content: "${content}"
      client_id: "${client_id}"
    }) { _id }
  }`;

const EDIT_LOG = ({_id, content}) => `
  mutation {
    editLog(log: {
      _id: "${_id}"
      content: "${content}"
    }) {
      _id
      content
    }
  }`;

const REMOVE_LOG = ({_id}) => `
  mutation {
    removeLog(log: {
      _id: "${_id}"
    }) {
      _id
    }
  }`;

const TASKS_FROM_PERIOD = ({startDate, endDate}) => `
  {
    tasksFromPeriod(
      startDate: "${startDate}"
      endDate: "${endDate}"
    ) {
      _id
      completed
      content
      client{_id name}
      date
    }
  }`;

export {
  CLIENT,
  ADD_TASK,
  TOGGLE_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  ADD_LOG,
  EDIT_LOG,
  REMOVE_LOG,
  TASKS_FROM_PERIOD,
  LEADS,
  TOGGLE_LEAD,
  TOGGLE_CLIENT_ARCHIVED,
}