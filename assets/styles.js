/**
 * Booleans for experiemental styles
 * @const
 */
const experimental = {
  invertBadges: true,
}

/**
 * Pixel measurements in PUPSyS
 * @const
 */
export const measurements = {
  entryHeight: 60,
}

/**
 * Styles for text in PUPSyS
 * @const
 */
export const textStyles = {
  entryFontSize: 16,
}

/**
 * Styles for buttons in PUPSyS
 * @const
 */
export const buttonStyles = {
  buttonElevation: 2,
  buttonBorderWidth: 1,
  buttonWidth: 150,
  buttonHeight: 50,
  dropDownButtonHeight: 40,
}

/**
 * Styles for cards in PUPSyS
 * @const
 */
export const cardStyles = {
  cardBorderRadius: 15,
  cardInnerBorderRadius: 14,
  cardElevation: 5,
  cardMarginBottom: 10,
}

/**
 * Colors and gradients for PUPSyS darkMode
 * @const
*/
export const darkTheme = {
  backgroundGradient: ['rgba(34,197,94,0.05)', '#1E2028'],
  backgroundGradientBackground: "#1E2028",
  badgeBorder: experimental.invertBadges ? "#22242E" : "#EEF0F3",
  badgeText: experimental.invertBadges ? "#22242E" : "#EEF0F3",
  buttonBorder: "#FCFCFC",
  buttonBorderDisabled: "#767676",
  buttonFill: '#22242E',
  cardBorder: "#FCFCFC",
  cardFill: '#22242E',
  cardFillDisabled: '#1E2028',
  navigationHeaderBackground: "#282C3D",
  popupGradient: ['rgba(34,197,94,0.05)', '#1E2028'],
  searchFill: "#282C3D",
  selectedFill: ['#1a533d', '#41356b'],
  settingsCardFill: '#22242E',
  statusBarColor: "#1E2028",
  tabBarColor: "#1E2028",
  textFieldBorderColor: "#FCFCFC",
  textFieldFill: "#1E2028",
  textSecondary: "#767676",
  textPrimary: "#FCFCFC",
}

/**
 * Colors and gradients for PUPSyS lightMode
 * @const
 */
export const lightTheme = {
  backgroundGradient: ['rgba(34,197,94,0.05)', "#F4F5F5"],
  backgroundGradientBackground: "#F4F5F5",
  badgeBorder: experimental.invertBadges ? "#EEF0F3" : "#0A1930",
  badgeText: experimental.invertBadges ? "#EEF0F3" : "#0A1930",
  buttonBorder: "#0A1930",
  buttonBorderDisabled: "#8C8C8C",
  buttonFill: "#EEF0F3",
  cardBorder: "#0A1930",
  cardFill: "#EEF0F3",
  cardFillDisabled: '#F4F5F5',
  navigationHeaderBackground: "#e4e4e4",
  popupGradient: ['rgba(34,197,94,0.05)', "#F4F5F5"],
  searchFill: "#e4e4e4",
  selectedFill: ["#7ce7af", "#ab9dd0"],
  settingscardFill: "#EEF0F3",
  statusBarColor: "#F4F5F5",
  tabBarColor: "#F4F5F5",
  textFieldBorderColor: "#0A1930",
  textFieldFill: "#F4F5F5",
  textSecondary: "#8C8C8C",
  textPrimary: "#0A1930",
}

/**
 * DarkMode agnostic colors and gradients for PUPSyS
 * @const
 */
export const globalColors = {
  disabledGradient: ['#888888', '#888888'],
  selectedGradient: ['#6442AC', '#6442AC'],
  whiteGradient: ['#888888', '#888888'],
  greenGradient: ['#00DD66', '#00DD66'],
  orangeGradient: ['#FF9922', '#FF9922'],
  redGradient: ['#FD3C4A', '#FD3C4A'],
  green: "#22C55E",
  greenAlpha: "rgba(34, 197, 94, 0.2)",
  red: "#FD3C4A",
  orange: "#FF9922",
}