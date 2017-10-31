import React from 'react';
import { _ } from './StateHandler';
import { default as MuiSelect } from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const SelectField = (props) => {
  let { name, options, stateHandler } = props;
  let state = stateHandler.get();
  let value = _.get(state,name);
  console.log('value', value);
  let childProps = JSON.parse(JSON.stringify(props));
  delete childProps.stateHandler;
  delete childProps.options;
  delete childProps.onChange;

  return(
    <MuiSelect
      {...childProps}
      value={value}
      onChange={(ev, i, value) =>  {
        stateHandler.set(name, value);
        if(typeof props.onChange === 'function')
          props.onChange(ev,i,value);
      }}
    >
      {options.map((option, i) => (
        <MenuItem
          key={i}
          value={ option.value || option._id || option.id || option.name || option.title }
        >
          {option.label || option.name || option.title || option.value}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default SelectField;
