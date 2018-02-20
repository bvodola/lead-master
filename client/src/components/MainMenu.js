import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = (props) => (
  <div>
    <Link style={{textDecoration: 'none'}} to='/clients'><Button style={{color: 'white'}}>Clientes</Button></Link>
    <Link style={{textDecoration: 'none'}} to='/documents-form'><Button style={{color: 'white'}}>Gerar Documentos</Button></Link>
    <Button onClick={() => props.logout()} classes={{label: props.classes.buttonLabel}} style={{color: 'white'}}>
      <Icon style={{position: 'absolute', left: '10px', color: 'white'}}>power_settings_new</Icon> Logout
    </Button>

    {/* <Link style={{textDecoration: 'none'}} to='/'>
      <ListItem button>
          <ListItemText primary='Agenda' />
      </ListItem>
    </Link> */}
    <Link style={{textDecoration: 'none'}} to='/clients'>
      <ListItem button>
        <ListItemText primary='Clientes' />
      </ListItem>
    </Link>
    <Link style={{textDecoration: 'none'}} to='/documents-form'>
      <ListItem button>
        <ListItemText primary='Gerar Documentos' />
      </ListItem>
    </Link>
    <ListItem button onClick={() => props.logout()}>
      <Icon style={{position: 'absolute', left: '10px', marginRight: '12px', color: 'rgba(0,0,0,0.87)'}}>power_settings_new</Icon>
      <ListItemText primary='Logout' style={{marginLeft: '5px' }} />
    </ListItem>

  </div>
);

export default MainMenu;