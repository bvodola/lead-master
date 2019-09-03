import React from 'react';
import VMasker from 'vanilla-masker';

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

const unmask = (maskedValue) => {
  const el = document.createElement('input');
  el.value = maskedValue;
  VMasker(el).unMask();
  return el.value;
}

const cookie = {
  get: (key) => {
    let cks = {};
    if(document && document.cookie) {
      document.cookie.split(';').forEach(function(c,i){
        let keyval = c.split('=');
        cks[keyval[0].trim()] = keyval[1];
      });
    }

  	return cks[key];
  },

  set: (key, val) => {
    document.cookie = `${key}=${val}`
  	return true;
  },

  delete: (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

const getAge = (year, month, day)  => {

  year = Number(year);
  month = Number(month);
  day = Number(day);

	var now = new Date()	
	var age = now.getFullYear() - year
	var mdif = now.getMonth() - month + 1
	
	if(mdif < 0)
		{ --age }
	else if(mdif == 0)
	{
		var ddif = now.getDate() - day
		if(ddif < 0)
		{ --age }
	}

	return age
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const whatsappUrl = isMobile ?  'api' : 'web';

export { Icon, checkNested, getNested, merge, isObject, unmask, cookie, getAge, isMobile, whatsappUrl };
