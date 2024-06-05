function getDateFromTimestamp(timestampInMilliseconds) {
    // Convert the timestamp to milliseconds
    const timestamp = timestampInMilliseconds;
    const date = new Date(timestamp);

    // Get individual components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month starts from 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date and time in a desired format
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedDate;
}


function convertDateTimeToTimestamp(dateTimeString) {
    const date = new Date(dateTimeString);
    const timestamp = date.getTime();
    return timestamp;
}

module.exports = { convertDateTimeToTimestamp, getDateFromTimestamp }