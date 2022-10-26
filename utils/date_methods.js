const datesBetween = require('dates-between');

const dateMethods = {
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    // console.log(date.toISOString())
    console.log("---->",result.toISOString())
    return result.toISOString();
  },
  //take in (YYYY-MM-DD)
  dateInIS08601: (date) => {
    const result = new Date(date);
    const newResult = result.substring(0, 10);
    return newResult
  },
  //input iso format dates
  getDatesInRange: (startDate, endDate)=> {
    const arrayOfDates = []
    for (const date of  datesBetween(startDate, endDate)) {
        arrayOfDates.push(date)
        console.log(date);
    }
    return arrayOfDates
}
};

// dateMethods.addDays(new Date(),5)
// console.log(new Date("2022-08-25").toDateString())

module.exports = dateMethods;
