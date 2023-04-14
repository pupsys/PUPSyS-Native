/** All possible units of height */
const heightUnits = ["in", "cm"];
/** All possible units of weight */
const weightUnits = ["kg", "lb"];

/**
 * Example patient data for use in testing / development
 */
export const examplePatient = {
  /** Patient name */
  name: "Joe Dobbelaar",
  /** Patient weight */
  weight: 78,
  /** Patient's weight unit (defaulted to pounds) */
  weightUnit: weightUnits[1],
  /** Patient height */
  height: 72,
  /** Patient's height unit (defaulted to inches) */
  heightUnit: heightUnits[0],
  /** Patient age in years */
  age: 21,
}

/** Dropdown menu items for possible weight units */
export const weightMenuItems = [
  {value: weightUnits[0], label: weightUnits[0]},
  {value: weightUnits[1], label: weightUnits[1]},
]

/** Dropdown menu items for possible height units */
export const heightMenuItems = [
  {value: heightUnits[0], label: heightUnits[0]},
  {value: heightUnits[1], label: heightUnits[1]},
]