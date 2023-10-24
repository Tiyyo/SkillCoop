// convert params to int and check if they are valid

function checkParams<T>(...params: Array<T>): number[] {
  const parsedParams: number[] = [];

  params.forEach((param) => {
    if (typeof param !== 'string')
      throw new Error(`${param} is not a string`);
    const parsedParam = parseInt(param, 10);
    if (Number.isNaN(parsedParam)) {
      throw new Error(`${param} is not a valid param : Can't be parsed to int`);
    }
    parsedParams.push(parsedParam);
  });

  return parsedParams;
}
export default checkParams;
