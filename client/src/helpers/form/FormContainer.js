import React from 'react';
import StateHandler from './StateHandler';

window.fields = [];
window.React = React;

function recursiveMap(children, cb) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) { return child; }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, cb)
      });
    }

    return cb(child);
  })
}

const FormContainer = (props) => {
  let stateHandler = new StateHandler(props.scope);

  let formFields = [
    'p', 'button', 'RaisedButton'
  ];

  let children = recursiveMap(props.children, function(child) {

    let field = typeof child.type.name !== 'undefined' ? child.type.name : child.type;

    return formFields.indexOf(field) === -1 ?
      React.cloneElement(child, {stateHandler: stateHandler}):
      React.cloneElement(child, {stateHandler: stateHandler});

  });

  return (
    <div className="form-container">
      {children}
    </div>
  );
 }


export default FormContainer;
