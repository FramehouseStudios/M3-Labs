/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str - The input string to capitalize
 * @returns {string} The string with each word's first letter capitalized
 * @example
 * capitalizeWords("los angeles") // returns "Los Angeles"
 * capitalizeWords("new york city") // returns "New York City"
 */
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Truncates a string if it exceeds the maximum length, appending an ellipsis.
 * Must use a ternary operator for this implementation.
 * @param {string} str - The string to truncate
 * @param {number} maxLength - The maximum length before truncation
 * @returns {string} The original string if within limit, or truncated string with ellipsis
 * @example
 * truncate("This text will be truncated", 25) // returns "This text will be truncat..."
 * truncate("Short text", 25) // returns "Short text"
 */
function truncate(str, maxLength) {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}

/**
 * Performs a series of array manipulations including adding elements, sorting, and replacing.
 * @param {string[]} startArray - The initial array of animal names
 * @param {string} newEnd1 - First animal to add to the end
 * @param {string} newEnd2 - Second animal to add to the end
 * @param {string} newStart1 - First animal to add to the beginning
 * @param {string} newStart2 - Second animal to add to the beginning
 * @returns {string[]} The manipulated array with all operations applied
 * @example
 * arrayManipulation(["Tiger", "Giraffe"], "Calf", "Bear", "Elephant", "Lion", "Zebra")
 * // returns sorted array with all elements added and middle replaced
 */
function arrayManipulation(
  startArray,
  replacementValue,
  newEnd1,
  newEnd2,
  newStart1,
  newStart2,
) {
  let animals = [...startArray]; // Create a copy to avoid modifying the original
  // d) Replace the middle element with 'Calf'
  animals[Math.floor(animals.length / 2)] = replacementValue;
  // a) Add two new values to the end
  animals.push(newEnd1, newEnd2);
  // b) Add two new values to the beginning
  animals.unshift(newStart1, newStart2);
  // c) Sort the values alphabetically
  animals.sort();
  return animals;
}

/**
 * Converts a dash-separated CSS property to camelCase format.
 * @param {string} cssProp - The CSS property in dash-separated format
 * @returns {string} The CSS property converted to camelCase
 * @example
 * camelCase("margin-left") // returns "marginLeft"
 * camelCase("background-image") // returns "backgroundImage"
 * camelCase("display") // returns "display"
 */
function camelCase(cssProp) {
  return cssProp
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}

/**
 * Performs precise arithmetic operations on floating-point numbers to avoid JavaScript precision errors.
 * @param {number} float1 - The first number
 * @param {number} float2 - The second number
 * @param {'+'|'-'|'*'|'/'} operation - The arithmetic operation to perform
 * @param {number} [numDecimals=2] - Number of decimal places for the result (default: 2)
 * @returns {number} The result of the operation with specified decimal precision
 * @example
 * currencyOperation(0.1, 0.2, "+") // returns 0.3
 * currencyOperation(0.3, 0.1, "-") // returns 0.2
 * currencyOperation(0.1, 0.2, "*", 3) // returns 0.02
 */
function currencyOperation(float1, float2, operation, numDecimals = 2) {
  let result;

  switch (operation) {
    case "+":
      result = float1 + float2;
      break;
    case "-":
      result = float1 - float2;
      break;
    case "*":
      result = float1 * float2;
      break;
    case "/":
      result = float1 / float2;
      break;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }

  return Number(result.toFixed(numDecimals));
}

/**
 * Removes duplicate values from an array, returning only unique values.
 * @param {Array} duplicatesArray - Array containing duplicate values
 * @returns {Array} New array containing only unique values from the input
 * @example
 * unique(["red", "green", "blue", "red", "yellow"]) // returns ["red", "green", "blue", "yellow"]
 */
function unique(duplicatesArray) {
  return [...new Set(duplicatesArray)];
}

/**
 * Processes an array of book objects using advanced array methods.
 * @param {Object[]} books - Array of book objects
 * @param {number} books[].id - Unique identifier for the book
 * @param {string} books[].title - Title of the book
 * @param {string} books[].author - Author of the book
 * @param {number} books[].year - Publication year
 * @returns {Object} Object containing processed book data
 * @returns {string} returns.bookTitleWithId1 - Title of the book with id 1
 * @returns {Object[]} returns.oldBooks - Array of books published before 1950
 * @returns {Object[]} returns.booksWithGenre - Array of books with added genre property
 * @example
 * processBooks([{id: 1, title: "1984", author: "George Orwell", year: 1949}])
 * // returns { bookTitleWithId1: "1984", oldBooks: [...], booksWithGenre: [...] }
 */
function processBooks(books) {
  // a) Get the title of the book with id 1
  const bookTitleWithId1 = books.find((book) => book.id === 1)?.title;
  // b) Get all book objects written before 1950
  const oldBooks = books.filter((book) => book.year < 1950);
  // c) Add a new genre property to each book with the value 'classic'
  const booksWithGenre = books.map((book) => ({ ...book, genre: "classic" }));

  return {
    bookTitleWithId1,
    oldBooks,
    booksWithGenre,
  };
}

/**
 * Manages and combines phone book Map objects, updating contact information.
 * @param {Map<string, string>} phoneBookABC - First phone book map with name-phone pairs
 * @param {Map<string, string>} phoneBookDEF - Second phone book map with name-phone pairs
 * @param {string} newCarolineNumber - New phone number for Caroline
 * @returns {Map<string, string>} Combined phone book with all unique contacts and updated Caroline number
 * @example
 * const abc = new Map([["Annabelle", "0412312343"], ["Caroline", "0455221182"]]);
 * const def = new Map([["David", "0444555666"]]);
 * managePhoneBook(abc, def, "0400000000") // returns Map with all contacts
 */
function managePhoneBook(phoneBookABC, phoneBookDEF, newCarolineNumber) {
  return new Map([
    ...phoneBookABC,
    ...phoneBookDEF,
    ["Caroline", newCarolineNumber],
  ]);
}

/**
 * Processes salary data to calculate total compensation and identify the highest earner.
 * @param {Object.<string, number>} salaries - Object with names as keys and salaries as values
 * @returns {Object} Object containing salary analysis results
 * @returns {number} returns.totalSalaries - Sum of all salaries
 * @returns {string} returns.topEarner - Name of the person with highest salary
 * @example
 * processSalaries({Timothy: 35000, David: 25000, Mary: 55000})
 * // returns { totalSalaries: 115000, topEarner: "Mary" }
 */
function processSalaries(salaries) {
  const entries = Object.entries(salaries);
  const totalSalaries = entries.reduce((total, [, salary]) => total + salary, 0);
  const topEarner = entries.reduce((highest, current) =>
    current[1] > highest[1] ? current : highest,
  )[0];

  return { totalSalaries, topEarner };
}

/**
 * Performs various date calculations including time passed and days between dates.
 * @param {Date} date - The date to process (used as reference for calculations)
 * @returns {Object} Object containing date calculation results
 * @returns {number} returns.minutesPassed - Total minutes passed in the day (hours * 60 + minutes)
 * @returns {number} returns.secondsPassed - Total seconds passed in the day (minutesPassed * 60 + seconds)
 * @returns {number} returns.daysBetween - Number of days between the input date and December 31, 2025
 * @example
 * processDate(new Date("2025-10-11T10:30:00"))
 * // returns { minutesPassed: 630, secondsPassed: 37800, daysBetween: 81 }
 */
function processDate(date) {
  const today = new Date(date);

  // a) Get total minutes passed today
  const minutesPassed = today.getHours() * 60 + today.getMinutes();
  // b) Get total seconds passed today
  const secondsPassed = minutesPassed * 60 + today.getSeconds();
  // d) Calculate days between today and a future date
  const futureDate = new Date(2025, 11, 31);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const futureStart = new Date(
    futureDate.getFullYear(),
    futureDate.getMonth(),
    futureDate.getDate(),
  );
  const daysBetween = Math.round(
    (futureStart - todayStart) / millisecondsPerDay,
  );

  return {
    minutesPassed,
    secondsPassed,
    daysBetween,
  };
}

// Do not modify this line. This is the mechanism that allows your code to be tested.
module.exports = {
  capitalizeWords,
  truncate,
  arrayManipulation,
  camelCase,
  currencyOperation,
  unique,
  processBooks,
  managePhoneBook,
  processSalaries,
  processDate,
};
