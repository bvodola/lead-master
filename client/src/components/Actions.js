import React from 'react';
import Radium from 'radium';

import IconButton from 'material-ui/IconButton';
import { screen } from '../helpers/grid';
import { Icon } from '../helpers';

const showMdUp = {
  display: 'inline',
  [screen.smUp]: {
    display: 'inline',
  }
};

const Actions = (props) => {
  let { style } = props;

  return(
    <div style={style}>
      <span style={showMdUp}>
        <IconButton>
          <Icon>delete</Icon>
        </IconButton>
      </span>
      <span style={showMdUp}>
        <IconButton>
          <Icon>plus_one</Icon>
        </IconButton>
      </span>
      <IconButton>
        <Icon>more_vert</Icon>
      </IconButton>
    </div>
  );
};

export default Radium(Actions);
