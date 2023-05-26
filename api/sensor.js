// Library Imports
import { useContext } from "react";

// API Imports
import { statusImages } from "./image";
import { exampleAdc, } from "./data";

// Style Imports
import { darkTheme, globalColors, lightTheme, } from "../assets/styles";

// Context Imports
import { DarkContext } from "../Context";

/**
 * Get the color of a device's pressure reading
 * @param {Device} device - Device from device context
 * @returns {string} - Color key string
 */
export function getPressureColor(device) {

  // Get context
  const { dark } = useContext(DarkContext);

  if (device.pressure >= thresholds.pressure.RED) {
    return globalColors.red;
  }
  if (device.pressure >= thresholds.pressure.ORANGE) {
    return globalColors.orange;
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Get most severe of all device pressure colors
 * @param {Device[]} devices - Devices from device context
 * @returns {string} - Color key string
 */
export function getPressureColorOverall(devices) {

  // Get context
  const { dark } = useContext(DarkContext);

  for (const device of devices) {
    if (device.pressure >= thresholds.pressure.RED) {
      return globalColors.red;
    }
    if (device.pressure >= thresholds.pressure.ORANGE) {
      return globalColors.orange;
    }
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Get the image source for pressure icon based on reading color
 * @param {Device} device - Device from device context
 * @returns {Image} - Image source
 */
export function getPressureSource(device) {

  // Get context
  const { dark } = useContext(DarkContext);

  const color = getPressureColor(device);
  if (color === globalColors.red) {
    return statusImages.pressure.RED;
  }
  if (color === globalColors.orange) {
    return statusImages.pressure.ORANGE;
  }
  // No worries, return theme colored icon
  return dark ? statusImages.pressure.DARK : statusImages.pressure.LIGHT;
}

/**
 * Get the color of a device's temperature reading
 * @param {Device} device - Device from device context
 * @returns {string} - Color key string
 */
export function getTemperatureColor(device) {

  // Get context
  const { dark } = useContext(DarkContext);
  
  if (device.temperature >= thresholds.temperature.RED) {
    return globalColors.red;
  }
  if (device.temperature >= thresholds.temperature.ORANGE) {
    return globalColors.orange;
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Get most severe of all device temperature colors
 * @param {Device[]} devices - Devices from device context
 * @returns {string} - Color key string
 */
export function getTemperatureColorOverall(devices) {

  // Get context
  const { dark } = useContext(DarkContext);

  for (const device of devices) {
    if (device.temperature >= thresholds.temperature.RED) {
      return globalColors.red;
    }
    if (device.temperature >= thresholds.temperature.ORANGE) {
      return globalColors.orange;
    }
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Get the image source for temperature icon based on reading color
 * @param {Device} device - Device from device context
 * @returns {Image} - Image source
 */
export function getTemperatureSource(device) {

  // Get context
  const { dark } = useContext(DarkContext);

  const color = getTemperatureColor(device);
  if (color === globalColors.red) {
    return statusImages.temperature.RED;
  }
  if (color === globalColors.orange) {
    return statusImages.temperature.ORANGE;
  }
  // No worries, return theme colored icon
  return dark ? statusImages.temperature.DARK : statusImages.temperature.LIGHT;
}

/**
 * Get the color of a device's humidity reading
 * @param {Device} device - Device from device context
 * @returns {string} - Color key string
 */
export function getHumidityColor(device) {

  // Get context
  const { dark } = useContext(DarkContext);
  
  if (device.humidity >= thresholds.humidity.RED) {
    return globalColors.red;
  }
  if (device.humidity >= thresholds.humidity.ORANGE) {
    return globalColors.orange;
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Get most severe of all device humidity colors
 * @param {Device[]} devices - Devices from device context
 * @returns {string} - Color key string
 */
export function getHumidityColorOverall(devices) {

  // Get context
  const { dark } = useContext(DarkContext);

  for (const device of devices) {
    if (device.temperature >= thresholds.humidity.RED) {
      return globalColors.red;
    }
    if (device.temperature >= thresholds.humidity.ORANGE) {
      return globalColors.orange;
    }
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Get the image source for humidity icon based on reading color
 * @param {Device} device - Device from device context
 * @returns {Image} - Image source
 */
export function getHumiditySource(device) {

  // Get context
  const { dark } = useContext(DarkContext);

  const color = getHumidityColor(device);
  if (color === globalColors.red) {
    return statusImages.humidity.RED;
  }
  if (color === globalColors.orange) {
    return statusImages.humidity.ORANGE;
  }
  // No worries, return theme colored icon
  return dark ? statusImages.humidity.DARK : statusImages.humidity.LIGHT;
}

/**
 * Get the border color by picking the most extreme color of any reading
 * @param {Device} device - Device from device context
 * @returns {string} - Color key string
 */
export function getSummaryColor(device) {
  /** Get colors of all sensors */
  const allColors = [getPressureColor(device), getTemperatureColor(device), getHumidityColor(device)];
  // If any of the colors are red, make the card red
  for (const readingColor of allColors) {
    if (readingColor === globalColors.red) {
      return readingColor;
    }
  }
  // If any of the colors are orange, make the card orange
  for (const readingColor of allColors) {
    if (readingColor === globalColors.orange) {
      return readingColor;
    }
  }
  // Everything is well! Make the card green.
  return globalColors.green;
}

/**
 * Get the most severe of an array of colors
 * @param {string[]} colors - Array of colors to parse
 * @returns {string} - most severe of all three color inputs
 */
export function getMostSevereColor(colors) {
  // Check for reds
  for (const c of colors) {
    if (c === globalColors.red) {
      return c;
    }
  }
  // Check for oranges
  for (const c of colors) {
    if (c === globalColors.orange) {
      return c;
    }
  }
  // Return all good
  return globalColors.green;
}

/**
 * Get the correct, low-opacity version of a color
 * @param {string} opaqueColor - Opaque version of color
 * @returns {string} - Alpha version of given color
 */
export function getAlpha(opaqueColor) {
  if (opaqueColor === globalColors.red) {
    return globalColors.redAlpha;
  }
  if (opaqueColor === globalColors.orange) {
    return globalColors.orangeAlpha;
  }
  if (opaqueColor === globalColors.green) {
    return globalColors.greenAlpha;
  }
}

/**
 * Seconds between sensor ADC readings
 * @const
 */
export const SECONDS = 60;

/**
 * Example device information
 */
export const exampleDevices = [
  {
    id: 0,
    name: "HT100",
    signal: "-77dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Left Hip",
    calibration: [30, 40, 50],
    pressure: 350,
    temperature: 50,
    humidity: 50,
    paused: false,    // Remove when sensors page finished
    expanded: false,  // Remove when sensors page finished
  },
  {
    id: 1,
    name: "HT110",
    signal: "-50dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Right Hip",
    calibration: [30, 40, 50],
    pressure: 300,
    temperature: 40,
    humidity: 20,
    paused: false,    // Remove when sensors page finished
    expanded: false,  // Remove when sensors page finished
  },
  {
    id: 2,
    name: "HT120",
    signal: "-111dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Left Heel",
    calibration: [30, 40, 50],
    pressure: 300,
    temperature: 30,
    humidity: 20,
    paused: false,    // Remove when sensors page finished
    expanded: false,  // Remove when sensors page finished
  },
  {
    id: 3,
    name: "HT130",
    signal: "-121dBm",
    logTo: "content://com.android.externalstorage.documents/tree/primary%3APUPSys",
    location: "Right Heel",
    calibration: [30, 40, 50],
    pressure: 300,
    temperature: 30,
    humidity: 20,
    paused: false,    // Remove when sensors page finished
    expanded: false,  // Remove when sensors page finished
  },
];

/**
 * Calculate the average of every 'x' numbers in a list and return a new list with the averages.
 * @param {number[]} numbers - A list of numbers to process.
 * @param {number} y - The interval for calculating the averages.
 * @returns {number[]} - A new list containing the averages of every 'x' numbers.
 */
function averageEveryXNumbers(numbers, x) {
  const averages = [];
  let sum = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  
    if ((i + 1) % x === 0) {
      averages.push(sum / x);
      sum = 0;
    }
  }

  return averages;
}  

/**
 * Get a list of strings representing the time of day for each sensor reading, assuming the last reading happened at the current time
 * @param {number[]} sensorReadings - A list of sensor readings
 * @param {number} y - The number of seconds between readings
 * @returns {string[]} - A list of strings representing the time of day for each sensor reading, formatted as "hh:mm AM/PM"
 */
function getReadingTimes(sensorReadings, y) {
  const currentTime = new Date();
  const readingTimes = [];
  
  for (let i = 0; i < sensorReadings.length; i++) {
    const readingTime = new Date(currentTime.getTime() - y * 1000 * (sensorReadings.length - 1 - i));
    const hours24 = readingTime.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = readingTime.getMinutes();
    const amPm = hours24 < 12 ? 'AM' : 'PM';

    const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    readingTimes.push(formattedTime);
  }
  
  return readingTimes;
}  

/**
 * Returns a new list consisting of every 'x'-th element of the input list.
 * @param {Array} list - The input list.
 * @param {number} x - The interval for selecting elements from the input list.
 * @returns {Array} - A new list containing every 'x'-th element of the input list.
 */
function getEveryXthElement(list, x) {
  const resultList = [];
  
  for (let i = x - 1; i < list.length; i += x) {
    const idx = Math.floor(i)
    resultList.push(list[idx]);
  }
  
  return resultList;
}

/**
 * Generates an array of graph labels based on sensor reading times.
 * It takes an array of sensor readings and returns an array of truncated labels
 * with a fixed number of elements.
 * @param {number[]} sensorReadings - An array of sensor readings.
 * @returns {string[]} - An array of graph labels with a fixed number of elements.
 */
export function getGraphLabels(sensorReadings) {
    const allReadingTimes = getReadingTimes(sensorReadings, SECONDS); 
    const NUM_LABELS = 4;
    const truncatedLabels = getEveryXthElement(allReadingTimes, allReadingTimes.length / NUM_LABELS);
    return truncatedLabels;
}

/**
 * 
 * @returns {number[]} - {@link exampleAdc} list shortened by averaging the number of readings by {@link SECONDS}
 */
export const averagedAdc = averageEveryXNumbers(exampleAdc, SECONDS);

/**
 * Takes a number x and returns a new list created by multiplying all values in the existing "averagedAdc" list by x.
 * @param {number} x - The scaling factor to multiply each value in the averagedAdc list.
 * @returns {number[]} - A new list with the scaled values.
 */
export function getScaledAdc(x) {
  // Assuming averagedAdc is an existing list (array) of numbers
  return averagedAdc.map(value => value * x);
}

/**
 * Thresholds for status colors by reading type
 * @example
 * thresholds.humidity.RED = 50;
 * thresholds.humidity.ORANGE = 25;
 * thresholds.temperature.RED = 50;
 * thresholds.temperature.ORANGE = 40;
 * thresholds.pressure.RED = 350;
 * thresholds.pressure.ORANGE = 325;
 * @readonly
 * @enum {Object}
 */
export const thresholds = {
  /**
   * Humidity thresholds
   * @example
   * thresholds.humidity.RED = 50;
   * thresholds.humidity.ORANGE = 25;
   * @readonly
   * @enum {number}
   */
  humidity: {
    RED: 50,
    ORANGE: 25,
  },
  /**
   * Temperature thresholds
   * @example
   * thresholds.temperature.RED = 50;
   * thresholds.temperature.ORANGE = 40;
   * @readonly
   * @enum {number}
   */
  temperature: {
    RED: 50,
    ORANGE: 40,
  },
  /**
   * Pressure thresholds
   * @example
   * thresholds.pressure.RED = 350;
   * thresholds.pressure.ORANGE = 325;
   * @readonly
   * @enum {number}
   */
  pressure: {
    RED: 350,
    ORANGE: 325,
  },
}