export function getDateFromTimestamp(timestampInMilliseconds) {
  return new Date(timestampInMilliseconds).toLocaleString();
}
getDateFromTimestamp()