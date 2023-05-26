// Library Imports
import { createContext } from "react";

/**
 * @type {React.Context<boolean>}
 * @static Tells the entire application whether we're in darkmode
 */
export const DarkContext = createContext();

/**
 * @type {React.Context<Map<string, Object>>}
 * @static Tells the entire application device states
 */
export const DevicesContext = createContext();

/**
 * @type {React.Context<Map<string, Object>>}
 * @static Tells the entire application current patient state
 */
export const PatientContext = createContext();

/**
 * @type {React.Context<Map<string, Object>>}
 * @static Tells the entire application current sensor state
 */
export const SensorContext = createContext();

