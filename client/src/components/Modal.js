import React from 'react'
import PropTypes from 'prop-types';
import MuiModal from '@material-ui/core/Modal';
import { Icon } from '../helpers';

const Modal = ({open, toggle, children, wrapperStyle={}}) => 
  <MuiModal
    open={open}
    onEscapeKeyDown={toggle}
  >
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.9)',
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: '5% 20%',
      ...wrapperStyle,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
      <Icon
        style={{
          alignSelf: 'flex-end',
          fontSize: '30px',
          cursor: 'pointer',
        }}
        onClick={toggle}
      >
        close
      </Icon>
        {children}
      </div>
    </div>
  </MuiModal>

  Modal.propTypes = {
    open: PropTypes.bool, // Sets modal visibility
    toggle: PropTypes.func, // Function executed when close icon or ESC key are pressed
    children: PropTypes.node, // Content of the modal
  }

  export default Modal;