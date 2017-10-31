import React from 'react';

const Icon = (props) => {
  const { children } = props;
  return(
    <span className='material-icons' {...props}></span>
  );
};

const checkNested = (obj, props) => {
  var args = props.split('.');

  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

const getNested = (obj, props) => {
  if(typeof props !== 'undefined') {
    var args = props.split('.');
    for (var i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return null;
      }
      obj = obj[args[i]];
    }
  }
  return obj;
}

const isObject = (o) => {
  return o instanceof Object && o.constructor === Object;
}

const merge = (obj1, obj2) => {
  if(isObject(obj1) && isObject(obj2)) {
    return { ...obj1 , ...obj2 };
  }
  if(!isObject(obj1) && isObject(obj2)) {
    return obj2;
  }
  if(isObject(obj1) && !isObject(obj2)) {
    return obj1;
  }
}

export { Icon, checkNested, getNested, merge, isObject };
