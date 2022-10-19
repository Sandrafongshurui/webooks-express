const dateMethods = {
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    // console.log(date.toISOString())
    // console.log(result)
    return result;
  },
};

// dateMethods.addDays(new Date(),5)

module.exports = dateMethods;
