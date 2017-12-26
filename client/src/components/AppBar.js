import React from 'react';
import Radium from 'radium';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { default as MuiAppBar } from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Text from '../helpers/Text';
import { Icon } from '../helpers';
import { screen } from '../helpers/grid';

const classes = {
  buttonLabel: {
    paddingLeft: '20px',
  }
}

const style = {
  menuIcon: {
    [screen.mdUp]: {
      display: 'none'
    }
  }
}

const AppBar = (props) => (
  <MuiAppBar position="fixed">
    <Toolbar>
      <span style={style.menuIcon}>
        <IconButton color="contrast" aria-label="Menu">
          <Icon>menu</Icon>
        </IconButton>
      </span>
      <Text type="title" color="inherit">
        LM
      </Text>
      <div style={{marginLeft: '20px', float: 'right'}}>
        <Link style={{textDecoration: 'none'}} to='/'><Button color='contrast'>Agenda</Button></Link>
        <Link style={{textDecoration: 'none'}} to='/clients'><Button color='contrast'>Clientes</Button></Link>
        <Link style={{textDecoration: 'none'}} to='/documents-form'><Button color='contrast'>Gerar Documentos</Button></Link>
        <Button onClick={() => props.logout()} classes={{label: props.classes.buttonLabel}} color='contrast'>
          <Icon style={{position: 'absolute', left: '10px'}}>power_settings_new</Icon> Logout
        </Button>
      </div>

    </Toolbar>
  </MuiAppBar>
);

export default withStyles(classes)(Radium(AppBar));
