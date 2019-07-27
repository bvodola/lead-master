import React, { Component } from 'react';
import Radio from 'material-ui/Radio';

class RadioGroup extends Component {

  handleChecked(id, isChecked) {
    let { stateHandler, name } = this.props;
    let state = stateHandler.get();

    if(isChecked) state[name].push(id);
    else {
      let index = state[name].indexOf(id);
      if(index > -1) {
        state[name].splice(index, 1);
      }
    }
    stateHandler.set(name, state[name]);
  }

  render() {
    let { stateHandler, name, items, checkboxProps } = this.props;
    let parentState = stateHandler.get();
    let default_values = parentState[name];

    return(
      <div className='checkbox-group'>
        {items.map((item,i) => {

          let isDefaultChecked = false;
          default_values.forEach((v) => {
            if(v == item.id)
              isDefaultChecked = true;
          });

          return (
            <Checkbox
              {...checkboxProps}
              key={item.id}
              defaultChecked={isDefaultChecked}
              label={item.label}
              onCheck={(ev, isChecked) => {this.handleChecked(item.id, isChecked)}}
            />
          )
        }
      )}
      </div>
    )
  }
}

export default RadioGroup;
