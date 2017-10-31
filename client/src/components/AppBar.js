import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { default as MuiAppBar } from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Text from '../helpers/Text';
import { Icon } from '../helpers';

const AppBar = (props) => (
  <MuiAppBar position="fixed">
    <Toolbar>
      <IconButton color="contrast" aria-label="Menu">
        <Icon>menu</Icon>
      </IconButton>
      <Text type="title" color="inherit">
        LM
      </Text>
      <div style={{marginLeft: '20px', float: 'right'}}>
        <Link style={{textDecoration: 'none'}} to='/'><Button color='contrast'>Agenda</Button></Link>
        <Link style={{textDecoration: 'none'}} to='/clients'><Button color='contrast'>Clientes</Button></Link>
      </div>

    </Toolbar>
  </MuiAppBar>
);

export default withRouter(AppBar);
