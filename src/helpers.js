export function toLocalDate(datetime) {
  const dateArray = new Date(datetime).toString().split(" ");
  return dateArray[1] + ' ' + dateArray[2] + ', ' + dateArray[3];
}

export function toLocalTime(datetime) {
  const timeArray = new Date(datetime).toString().split(" ")[4].split(":");
  return timeArray[0] + ':' + timeArray[1];
}
