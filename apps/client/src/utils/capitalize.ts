import checkIfExist from './check-existence';

const capitalize = (arg?: string | null) => {
  const argValue = checkIfExist(arg);
  const capital = argValue.slice(0, 1).toUpperCase();
  const restOfStr = argValue.slice(1);
  return (capital + restOfStr).split('_').join(' ');
};

export default capitalize;
