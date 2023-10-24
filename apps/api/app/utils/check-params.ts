function checkParams<T>(...params: Array<T>): number[] {
  const parsedParams: number[] = [];

  params.forEach((param) => {
    if (typeof param !== 'string')
      throw new Error('There is at least one invalid param');
    const parsedParam = parseInt(param, 10);
    if (Number.isNaN(parsedParam)) {
      throw new Error('There is at least one invalid param');
    }
    parsedParams.push(parsedParam);
  });

  return parsedParams;
}
export default checkParams;
