// Library Imports
import { createContext } from "react";

/**
 * @type {React.Context<boolean>}
 * @static Tells the entire application whether we're in darkmode
 */
export const DarkContext = createContext();

/**
 * @type {React.Context<string>}
 * @static Tells the entire application device states
 */
export const DevicesContext = createContext();
