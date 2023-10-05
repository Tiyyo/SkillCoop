const capitalize = (arg: string) => {
  const capital = arg.slice(0, 1).toUpperCase();
  const restOfStr = arg.slice(1);
  return (capital + restOfStr).split("_").join(" ");
};

export default capitalize;