/*
  Students should complete the following functions.
  You can test your work by running the tests with `npm run test`
*/

/**
 * Creates a counter function that starts from a given number and increments by a given step.
 * @param {number} [startFrom=0] - The number to start the counter from.
 * @param {number} [incrementBy=1] - The number to increment the counter by on each call.
 * @returns {function(): number} A function that returns the next number in the sequence.
 * @example
 * const counter1 = makeCounter(5, 2); // counter1() returns 5, then 7, then 9...
 * const counter2 = makeCounter(); // counter2() returns 0, then 1, then 2...
 * const counter3 = makeCounter(10, -1); // counter3() returns 10, then 9, then 8...
 */
function makeCounter(startFrom = 0, incrementBy = 1) {
  let current = startFrom;

  return function () {
    current += incrementBy;
    return current;
  };
}

/**
 * Logs a message to the console (used in setTimeout testing).
 * @param {string} msg - The message to be logged.
 * @example
 * delayMsg("Hello World"); // Logs: "This message will be printed after a delay: Hello World"
 * delayMsg("Test message"); // Logs: "This message will be printed after a delay: Test message"
 */
function delayMsg(msg) {
  console.log(`This message will be printed after a delay: ${msg}`);
}

/**
 * Returns the expected order of execution for setTimeout calls in the test file.
 * This function should track the order in which delayMsg is called and return that order.
 * @returns {string[]} An array of strings representing the message execution order.
 * @example
 * // After the test setTimeout calls complete:
 * getOrder(); // returns ["#3: Delayed by 0ms", "#2: Delayed by 20ms", "#1: Delayed by 100ms", "#4: Not delayed at all"]
 */
function getOrder() {
  return [
    "#4: Not delayed at all",
    "#3: Delayed by 0ms",
    "#2: Delayed by 20ms",
    "#1: Delayed by 100ms",
  ];
}

/**
 * Creates a debounced version of a function that delays invoking the function
 * until after `ms` milliseconds have passed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Function} The new debounced function.
 * @example
 * const debouncedLog = debounce(console.log, 300);
 * debouncedLog("Hello"); // Only logs after 300ms of inactivity
 * debouncedLog("World"); // Resets timer, waits another 300ms
 * debouncedLog("!"); // Resets timer, waits another 300ms, then logs "!"
 */
function debounce(func, ms) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), ms);
  };
}

/**
 * Prints the Fibonacci sequence up to a specified limit, with a one-second delay
 * between each number. Uses setInterval for timing control.
 * @param {number} limit - The number of Fibonacci numbers to print.
 * @example
 * printFibonacci(5); // Prints: 0, 1, 1, 2, 3 (one number per second)
 * printFibonacci(8); // Prints: 0, 1, 1, 2, 3, 5, 8, 13 (one number per second)
 */
function printFibonacci(limit) {
  let first = 0;
  let second = 1;
  let count = 0;

  const timer = setInterval(() => {
    const next = first + second;
    console.log(next);
    first = second;
    second = next;
    count++;

    if (count >= limit) {
      clearInterval(timer);
    }
  }, 1000);
}

/**
 * The car object, representing a classic car with a description method.
 * Note: The description method will fail when called from setTimeout due to `this` context loss.
 * @property {string} make - The car manufacturer.
 * @property {string} model - The car model.
 * @property {number} year - The car's year.
 * @property {Function} description - Method that describes the car (loses `this` context in setTimeout).
 * @example
 * car.description(); // Logs: "This car is a Porsche 911 from 1964"
 * setTimeout(() => car.description(), 100); // Fails: `this` is undefined in setTimeout
 */
const car = {
  make: "Porsche",
  model: "911",
  year: 1964,
  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};

/**
 * Returns a version of the car's description method that is permanently bound
 * to the car object, ensuring `this` is always correct even in setTimeout.
 * @returns {Function} The bound description method that works correctly in any context.
 * @example
 * const boundDesc = fixCar();
 * boundDesc(); // Logs: "This car is a Porsche 911 from 1964"
 * setTimeout(() => boundDesc(), 100); // Still works correctly!
 * const anotherBound = fixCar();
 * anotherBound(); // Each counter is independent
 */
function fixCar(carToFix = car) {
  return carToFix.description.bind(carToFix);
}

/**
 * Adds a `delay` method to the Function prototype. The delayed function
 * returns a promise that resolves with the function's result after the specified delay.
 * @param {number} ms - The delay in milliseconds.
 * @returns {function(...args): Promise<any>} A new function that will execute after the delay.
 */
Function.prototype.delay = function (ms) {
  const fn = this;

  return function (...args) {
    const context = this;

    return {
      then(onFulfilled) {
        setTimeout(() => {
          onFulfilled(fn.apply(context, args));
        }, ms);
      },
    };
  };
};

/**
 * Represents a digital clock that displays the current time every second.
 * Uses setInterval to update the display every 1000ms.
 * @property {string} prefix - Text prefix to display before the time.
 * @example
 * const clock = new DigitalClock("Time");
 * clock.start(); // Logs: "Time HH:MM:SS" every second
 * clock.stop(); // Stops the clock updates
 */
class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }

  display() {
    let date = new Date();
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }

    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}

/**
 * Represents a clock that ticks at a custom interval.
 * Inherits all functionality from DigitalClock but overrides the timing.
 * @extends DigitalClock
 * @param {string} prefix - Text prefix to display before the time.
 * @param {number} precision - The tick interval in milliseconds.
 * @example
 * const fastClock = new PrecisionClock("Fast", 500); // Updates every 500ms
 * const slowClock = new PrecisionClock("Slow", 2000); // Updates every 2000ms
 * fastClock.start(); // Logs: "Fast HH:MM:SS" twice per second
 */
class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

/**
 * Represents a clock that can be set to sound an alarm at a specific time.
 * Inherits from DigitalClock and adds alarm functionality.
 * @extends DigitalClock
 * @param {string} prefix - Text prefix to display before the time.
 * @param {string} wakeupTime - The time to trigger the alarm (format: 'HH:MM').
 * @example
 * const alarm = new AlarmClock("Alarm", "08:30");
 * alarm.start(); // Ticks normally until 08:30
 * // At 08:30: logs "Wake Up!" and stops ticking
 */
class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime) {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }

  display() {
    super.display();

    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;

    if (currentTime === this.wakeupTime || this.wakeupTime) {
      console.log("Wake Up!");
      this.stop();
    }
  }
}

/**
 * A decorator function that validates all arguments of a given function are strings.
 * Throws TypeError if any argument is not a string before calling the original function.
 * @param {Function} fn - The function to wrap with validation.
 * @returns {Function} A new function that performs validation before calling the original function.
 * @throws {TypeError} If any argument is not a string.
 * @example
 * const validFunc = validateStringArgs((a, b, c) => a + b + c);
 * validFunc("hello", "world", "!"); // Returns "helloworld!"
 * validFunc("hello", 123, "!"); // Throws TypeError: Argument 123 is not a string
 */
function validateStringArgs(fn) {
  // A decorator returns a new function that wraps the original function.
  return function (...args) {
    if (!args.every((arg) => typeof arg === "string")) {
      throw new TypeError("All arguments must be strings");
    }

    return fn.apply(this, args);
  };
}

/**
 * Returns a promise that resolves or rejects after a random delay between 1-10 seconds.
 * The promise resolves on even delays and rejects on odd delays.
 * @returns {Promise<string>} A promise that resolves with "Resolved!" on even delay
 * and rejects with "Rejected!" on odd delay.
 * @example
 * randomDelay().then(msg => console.log(msg)); // Might log "Resolved!" or "Rejected!"
 * randomDelay().catch(err => console.error(err)); // Handles the rejection
 * // Multiple calls will have different random delays
 */
function randomDelay() {
  const delay = Math.floor(Math.random() * 10) + 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay % 2 === 0) {
        resolve("Resolved!");
      } else {
        reject(new Error("Rejected!"));
      }
    }, delay * 1000);
  });
}

/**
 * Fetches data from a URL using async/await syntax and returns the JSON response.
 * Handles HTTP status checking and error handling.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<object>} A promise that resolves with the JSON data.
 * @example
 * fetchURLDataAsync("https://api.example.com/data")
 *   .then(data => console.log(data))
 *   .catch(err => console.error("Fetch failed:", err));
 * // Uses modern async/await instead of promise chains
 */
// You can use the fetchURLData function from the slides as a reference
// and the following import for your tests.
const fetch = require("node-fetch");

async function fetchURLDataAsync(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

// Do not modify this line.
module.exports = {
  makeCounter,
  getOrder,
  debounce,
  printFibonacci,
  fixCar,
  PrecisionClock,
  AlarmClock,
  validateStringArgs,
  randomDelay,
  fetchURLDataAsync,
};
