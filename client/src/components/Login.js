import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const Login = (props) => (
  <div>
    <form onSubmit={(ev) => props.handleSubmit(ev)}>
      <TextField label='Email' value={props.data.email} onChange={(ev) => props.setState({email: ev.target.value})} />
      <TextField label='Senha' value={props.data.password} onChange={(ev) => props.setState({password: ev.target.value})} type='password' />
      <Button type='submit' variant='raised' color='primary'>Fazer Login</Button>
    </form>
    <a href="http://4f654ffe.ngrok.io/auth/facebook">
      <Button variant='raised' color='primary'>Login com Facebook</Button>
    </a>
  </div>
)

export default Login
