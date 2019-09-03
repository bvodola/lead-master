import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import WithData from 'src/components/withData';
import { LEADS } from 'src/types';
import { default as MuiAppBar } from 'material-ui/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Text from '../helpers/Text';
import { Icon } from '../helpers';
import { screen } from '../helpers/grid';
import { withStyles } from '@material-ui/core/styles';

const StyledBdage = withStyles({
  badge: {
    top: '7px',
    right: '7px',
  },
})(Badge);

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
  },
  menu: {
    marginLeft: '20px',
    float: 'right',
    [screen.smDown]: {
      display: 'none'
    }
  }
}

const AppBar = (props) => (
  <MuiAppBar position="fixed">
    <Toolbar>
      <span style={style.menuIcon} onClick={() => props.toggleDrawer()}>
        <IconButton style={{color: 'white'}} aria-label="Menu">
          <Icon>menu</Icon>
        </IconButton>
      </span>
      <Text type="title" color="inherit">
        LM
      </Text>
      <div style={style.menu}>

        {/* <Link style={{textDecoration: 'none'}} to='/agenda'><Button style={{color: 'white'}}>Agenda</Button></Link> */}

        <WithData polling={5000} query={LEADS()}>  
          {({data}) => {
            const numberOfLeads = data ? data.clients.length : 0;
            const leadsMenuItem = <Link style={{textDecoration: 'none'}} to='/leads'><Button style={{color: 'white'}}>Leads</Button></Link>;

            return numberOfLeads > 0 ?
              <StyledBdage badgeContent={numberOfLeads} color="secondary">{leadsMenuItem}</StyledBdage> : leadsMenuItem
          }}
        </WithData>
        <Link style={{textDecoration: 'none'}} to='/clients'><Button style={{color: 'white'}}>Clientes</Button></Link>
        <Link style={{textDecoration: 'none'}} to='/documents-form'><Button style={{color: 'white'}}>Gerar Documentos</Button></Link>
        <Button onClick={() => props.logout()} classes={{label: props.classes.buttonLabel}} style={{color: 'white'}}>
          <Icon style={{position: 'absolute', left: '10px', color: 'white'}}>power_settings_new</Icon> Logout
        </Button>
        
      </div>

    </Toolbar>
  </MuiAppBar>
);

export default withStyles(classes)(Radium(AppBar));
