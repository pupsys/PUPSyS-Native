
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