import React from 'react'
import Button from 'material-ui/Button'
import MuiSnackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import Icon from '../Icon'

class Snackbar extends React.Component {
  render() {

    return (
      <div>
        <MuiSnackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.props.isSnackbarOpened}
          onClose={this.props.handleToggleSnackbar}
          autoHideDuration={3000}
        
          message={<span>{this.props.children}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.handleToggleSnackbar}
            >
              <Icon>close</Icon>
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default Snackbar;