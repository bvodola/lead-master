import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

class DatePickerButton extends React.Component {
  render() {
    const {onChange, value, style, children, ...otherProps} = this.props;
    return(
      <div style={style}>
        <DatePicker
          keyboard
          showTodayButton
          allowKeyboardControl
          autoOk
          value={value}
          label="Data"
          format="DD/MM/YYYY"
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          onChange={onChange}
          todayLabel={'Hoje'}
          cancelLabel={'Cancelar'}
          ref={node => this.picker = node}
          style={{display: 'none' }}
          {...otherProps}
        />
        {children ? 
          <span onClick={() => this.picker.open()}>
            {children}
          </span>
          :
          <IconButton onClick={() => this.picker.open()}>
            <Icon>event</Icon>
          </IconButton>
        }
        
      </div>
    )
  }
}

DatePickerButton.propTypes = {
  value: PropTypes.any, // Value of the picker (Date object or valid string date)
  onChange: PropTypes.func, // Function to be called whenever the picker changes
  style: PropTypes.object, // Picker style
  children: PropTypes.node, // Child node (defaults to calendar icon)
}

export default DatePickerButton;