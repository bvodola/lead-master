import React from 'react';
import MuiDrawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { Icon } from '../helpers';
import Text from '../helpers/Text';

const Drawer = (props) => (
  <MuiDrawer onRequestClose={(ev) => props.toggleDrawer()} open={props.isDrawerOpened}>
    <List onClick={(ev) => {ev.preventDefault(); props.toggleDrawer()}}>
      <Link style={{textDecoration: 'none'}} to='/'>
        <ListItem button>
            <ListItemText primary='Agenda' />
        </ListItem>
      </Link>
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
    </List>
  </MuiDrawer>
);

export default Drawer;