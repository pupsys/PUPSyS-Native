// Library Imports
import { createContext } from "react";

/**
 * @type {React.Context<boolean>}
 * @static Tells the entire application whether or not we're in darkmode
 */
export const DarkContext = createContext();

/**
 * @type {React.Context<string>}
 * @static Tells the entire application what page we're looking at
 */
export const RouteContext = createContext();