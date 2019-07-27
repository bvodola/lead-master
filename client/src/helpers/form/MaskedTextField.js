import React from 'react';
import { _ } from './StateHandler';
import VMasker from 'vanilla-masker';
import { default as MuiTextField } from 'material-ui/TextField';

const MaskedTextField = (props) => {
  let { stateHandler, name, onChange, ...childProps } = props;
  let state = stateHandler.get();
  let value = _.get(state,name);

  return(
    <MuiTextField
      value={value}
      onChange={(ev) => {  
        const maskedValue = props.mask === 'money' ?
          VMasker.toMoney(ev.target.value, { unit: 'R$' }):
          VMasker.toPattern(ev.target.value, props.mask);
        stateHandler.set(name, maskedValue);

        if(typeof onChange === 'function') {
          onChange(ev);
        }
      }}
      {...childProps}
    />
  )
};

export default MaskedTextField;
