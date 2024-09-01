const { formatInTimeZone } = require ('date-fns-tz')
const { isValid, parse } = require('date-fns');

const IndianTime = (date,format) =>{
    const convert = formatInTimeZone(date, 'Asia/Kolkata', format);
    return convert;
}



const convertToISOFormat = (dateString) => {
  try {
    const parsedDate = parse(dateString, "dd-MM-yyyy HH:mm:ss", new Date());
    if (!isValid(parsedDate)) {
        throw new Error(
        "Invalid date format. Expected format is dd-MM-yyyy HH:mm:ss."
        );
    }
    return parsedDate.toISOString();
  } catch (error) {
    return false;
  }
};

module.exports = {
    IndianTime,
    convertToISOFormat

}