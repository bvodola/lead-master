import React from 'react';
import { _ } from './StateHandler';
import { default as MuiTextField } from 'material-ui/TextField';

const TextField = (props) => {
  let { stateHandler, name } = props;
  let state = stateHandler.get();
  let value = _.get(state,name);

  let childProps = JSON.parse(JSON.stringify(props));
  delete childProps.stateHandler;
  delete childProps.onChange;

  return(
    <MuiTextField
      defaultValue={value}
      onBlur={(ev) => stateHandler.set(name, ev.target.value)}
      onChange={(ev) => {
        if(typeof props.onChange === 'function') {
          props.onChange(ev);
        }
      }}
      {...childProps}
    />
  )
};

export default TextField;
