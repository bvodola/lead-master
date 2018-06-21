let date = {};

date.getAge = (age) => { 
  var diff_ms = Date.now() - age.getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

date.convertFromString = (d) => {
  return new Date(d.substr(6,4), Number(d.substr(3,2)-1), d.substr(0,2));
}

module.exports = {
  date
}