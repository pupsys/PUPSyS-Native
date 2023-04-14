/**
 * Generates a new random number within the possible deviation from the average every "x" seconds,
 * adds the number to the array and updates the React state using the setter function.
 * @param {number[]} numbers - The React state containing an array of numbers.
 * @param {Function} setNumbers - The React state setter function for the numbers array.
 * @param {number} average - The average value for the newly generated numbers.
 * @param {number} deviation - The possible deviation from the average value.
 * @param {number} interval - The interval in seconds between generating new numbers.
 */
export function generateRandomNumbers(numbers, setNumbers, average, deviation, interval) {
  const generateNumber = () => {
    const min = average - deviation;
    const max = average + deviation;
    const randomNumber = Math.random() * (max - min) + min;
    const updatedNumbers = [...numbers, randomNumber];

    setNumbers(updatedNumbers);
  };

  setInterval(generateNumber, interval * 1000);
}
