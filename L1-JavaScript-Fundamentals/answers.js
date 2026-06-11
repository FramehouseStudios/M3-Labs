"use strict";

// M3-L1 JavaScript Fundamentals
// Submitted by Joshua Ojeda

console.log("1. Type Coercion");
console.log("" + 1 + 0); // "10"
console.log(true + false); // 1
console.log(6 / "3"); // 2
console.log("2" * "3"); // 6
console.log(4 + 5 + "px"); // "9px"
console.log("$" + 4 + 5); // "$45"
console.log("4" - 2); // 2
console.log("4px" - 2); // NaN
console.log("  -9  " + 5); // "  -9  5"
console.log("  -9  " - 5); // -14
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
console.log(" \t \n" - 2); // -2
console.log(undefined == null); // true
console.log(undefined === null); // false

console.log("\n2. String vs. Number Operations");
let three = "3";
let four = "4";
let thirty = "30";
let addition = three + four; // "34" because + concatenates strings.
let multiplication = three * four; // 12 because * converts strings to numbers.
let division = three / four; // 0.75 because / converts strings to numbers.
let subtraction = three - four; // -1 because - converts strings to numbers.
let lessThan1 = three < four; // true because 3 is less than 4.
let lessThan2 = thirty < four; // true because both operands are strings, so JavaScript compares them lexicographically.
let lessThan2Numeric = Number(thirty) < Number(four); // false when explicitly compared as numbers.

console.log(addition);
console.log(multiplication);
console.log(division);
console.log(subtraction);
console.log(lessThan1);
console.log(lessThan2);
console.log(lessThan2Numeric);

console.log("\n3. Truthy and Falsy Values");
if (0) console.log("#1: zero is true"); // Not logged: 0 is falsy.
if ("0") console.log("#2: zero string is true"); // Logged: non-empty strings are truthy.
if (null) console.log("#3: null is true"); // Not logged: null is falsy.
if (-1) console.log("#4: negative is true"); // Logged: non-zero numbers are truthy.
if (1) console.log("#5: positive is true"); // Logged: 1 is truthy.

console.log("\n4. The Ternary Operator");
let a = 2;
let b = 3;
let result = `The sum of ${a} and ${b} is ${
  a + b < 10 ? "less than 10" : "greater than 10"
}`;
console.log(result);
// The += operator adds to the existing value and assigns the result back.

console.log("\n5. Function Syntax");
function getGreeting(name) {
  return `Hello, ${name}!`;
}

const getGreetingExpression = function (name) {
  return `Hello, ${name}!`;
};

const getGreetingArrow = (name) => `Hello, ${name}!`;

console.log(getGreeting("World"));
console.log(getGreetingExpression("World"));
console.log(getGreetingArrow("World"));

console.log("\n6. Objects and this");
const westley = {
  name: "Westley",
  numFingers: 5,
};

const rugen = {
  name: "Count Rugen",
  numFingers: 6,
};

const inigo = {
  firstName: "Inigo",
  lastName: "Montoya",
  greeting(person) {
    const greeting = `Hello, ${person.name}. My name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.getCatchPhrase(person));
  },
  getCatchPhrase: (person) =>
    person.numFingers === 6
      ? "You killed my father. Prepare to die."
      : "Nice to meet you.",
};

inigo.greeting(westley);
inigo.greeting(rugen);

console.log("\n7. Method Chaining");
const basketballGame = {
  score: 0,
  fouls: 0,
  freeThrow() {
    this.score++;
    return this;
  },
  basket() {
    this.score += 2;
    return this;
  },
  threePointer() {
    this.score += 3;
    return this;
  },
  foul() {
    this.fouls++;
    return this;
  },
  halfTime() {
    console.log(`Halftime score is ${this.score}. Fouls: ${this.fouls}.`);
    return this;
  },
  fullTime() {
    console.log(`Final score is ${this.score}. Fouls: ${this.fouls}.`);
    return this;
  },
};

basketballGame
  .basket()
  .freeThrow()
  .freeThrow()
  .foul()
  .basket()
  .threePointer()
  .halfTime()
  .threePointer()
  .fullTime();

console.log("\n8. Iterating Over Objects");
const sydney = {
  name: "Sydney",
  population: 5_121_000,
  state: "NSW",
  founded: "26 January 1788",
  timezone: "Australia/Sydney",
};

const losAngeles = {
  name: "Los Angeles",
  population: 3_898_747,
  state: "California",
  founded: "September 4, 1781",
  timezone: "America/Los_Angeles",
};

function printObjectProperties(object) {
  for (const key in object) {
    console.log(`${key}: ${object[key]}`);
  }
}

printObjectProperties(sydney);
printObjectProperties(losAngeles);

console.log("\n9. Primitives vs. Reference Types");
let teamSports = ["Hockey", "Cricket", "Volleyball"];
let dog1 = "Bingo";
let cat1 = { name: "Fluffy", breed: "Siberian" };

let moreSports = teamSports;
moreSports.push("Basketball");

let dog2 = dog1;
dog2 = "Spot";

let cat2 = cat1;
cat2.name = "Mittens";

console.log(teamSports); // Changed because arrays are reference types.
console.log(dog1); // Unchanged because strings are primitive values.
console.log(cat1); // Changed because objects are reference types.

moreSports = [...teamSports, "Soccer"];
cat2 = { ...cat1, name: "Luna" };

console.log(moreSports);
console.log(cat2);

console.log("\n10. Constructor Functions vs. Classes");
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
}

Person.prototype.canDrive = function () {
  return this.age >= 16;
};

const joshua = new Person("Joshua", 36);
const maya = new Person("Maya", 15);

class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
  }

  canDrive() {
    return this.age >= 16;
  }
}

const alex = new PersonClass("Alex", 18);

console.log(joshua.canDrive());
console.log(maya.canDrive());
console.log(alex.canDrive());
