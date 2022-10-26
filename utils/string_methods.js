const stringMethods = {
    capitalizeFirstLetter: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    capitalizeWords: (str) => {
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);   
        }
        // Directly return the joined string, joinging the array
        return splitStr.join(' '); 
     }
     
  };
  module.exports = stringMethods;
  