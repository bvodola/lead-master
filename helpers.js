const unmaskCPF = (cpf) => {
  if(!cpf) return null;
  return cpf.match(/[0-9]\w+/g).join('')
};
const maskCPF = (cpf) => {
  if(!cpf) return null;
  const u = unmaskCPF(cpf);
  return `${u.substr(0,3)}.${u.substr(3,3)}.${u.substr(6,3)}-${u.substr(9,2)}`
};

module.exports = {
  unmaskCPF,
  maskCPF,
}