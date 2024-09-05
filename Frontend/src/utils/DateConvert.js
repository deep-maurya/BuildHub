import moment from 'moment-timezone';

export const convertUTCToIST = (utcDateString) => {
  const istTime = moment.utc(utcDateString).tz('Asia/Kolkata');
  return istTime.format('DD-MM-YYYY HH:mm:ss'); 
};

export const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

// const utcDateString = '2024-08-31T12:00:00Z'; // UTC time
// const istTime = convertUTCToIST(utcDateString);
// console.log(istTime); // Output: "31-08-2024 17:30:00"

