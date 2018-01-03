import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { _ } from './StateHandler';

class CheckboxGroup extends Component {

  handleChange(id, isChecked) {
    let { stateHandler, name } = this.props;
    let state = stateHandler.get();
    let stateArray = _.get(state,name);

    if(isChecked) {
      stateArray.push(id);
    }
    else {
      let index = stateArray.indexOf(id);
      if(index > -1) {
        stateArray.splice(index, 1);
      }
    }
    stateHandler.set(name, stateArray);
  }

  render() {
    let { stateHandler, name, options, checkboxProps } = this.props;
    let parentState = stateHandler.get();
    let checkedValues = _.get(parentState,name);



    return(
      <div className='checkbox-group'>
        <FormGroup>
          {options.map((item,i) => {

            let isChecked = false;
            let itemKey = item.id || item._id || item.name || item.title || item.label || item.content || item.value;
            let itemLabel = item.label || item.name || item.title || item.content || item.value;

            checkedValues.forEach((v) => {
              if(v === itemKey)
                isChecked = true;
            });

            return (
              <FormControlLabel
                key={itemKey}

                control={
                  <Checkbox
                    {...checkboxProps}
                    checked={isChecked}
                    label={itemLabel}
                    onChange={(ev, isChecked) => {this.handleChange(itemKey, isChecked)}}
                  />
                }

                label={itemLabel}
              />
            )
          }
        )}
      </FormGroup>
      </div>
    )
  }
}

export default CheckboxGroup;
