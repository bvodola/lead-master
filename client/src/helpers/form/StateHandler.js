class _ {

  static get(obj, prop) {
    let targetProp = obj;
    let propArray = prop.split('.');
    propArray.forEach((prop) => {
      targetProp = targetProp[prop];
    });
    return targetProp;
  }

  static set(obj, path, value) {
      var schema = obj;
      var pList = path.split('.');
      var len = pList.length;
      for(var i = 0; i < len-1; i++) {
          var elem = pList[i];
          if( !schema[elem] ) schema[elem] = {}
          schema = schema[elem];
      }
      schema[pList[len-1]] = value;
  }
}

class StateHandler {
  constructor(parent) {
    this.set = this.set.bind(parent);
    this.get = this.get.bind(parent);
  }

  get() {
    return this.state;
  }

  set(name,value,push=false) {

    let state = this.state;
    let nameArray = name.split('.');

    if(nameArray.length>1) {
      if(push == true) {
        const oldValue = _.get(state,name);
        value = oldValue.push(value);
      }
      _.set(state,name,value);
      let firstName = name.split('.')[0];
      this.setState({[firstName]: state[firstName]});

    } else {
      this.setState({[name]: value});
    }
  }

}

export { _ };
export default StateHandler;
