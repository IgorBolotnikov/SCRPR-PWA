export function toLocalDate(datetime: string): string {
  const dateArray = new Date(datetime).toString().split(' ');
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
}

export function toLocalTime(datetime: string): string {
  const timeArray = new Date(datetime).toString().split(' ')[4].split(':');
  return `${timeArray[0]}:${timeArray[1]}`;
}
