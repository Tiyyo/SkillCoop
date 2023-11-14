function getDateUTC(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  const millisecond = date.getUTCMilliseconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}

export default getDateUTC;
