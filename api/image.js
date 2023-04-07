/**
 * Navigation controller page icon images
 */
export const navigationImages = {
  /**
   * Enum for AppDrawer drawer icons
   * @example
   * navigationImages.appDrawer.CALIBRATION = "settings-outline";
   * navigationImages.appDrawer.PATIENT = "person-outline";
   * navigationImages.appDrawer.SENSORS = "heart-outline";
   * @readonly
   * @enum {string}
   */
  appDrawer: {
    /** Calibration IonIcon name */
    CALIBRATION: "settings-outline",
    /** Patient IonIcon name */
    PATIENT: "person-outline",
    /** Sensors IonIcon name */
    SENSORS: "heart-outline",
  },
  /**
   * Images for Sensor Page tab icons
   * @example
   * sensorTabs.OVERALLDARK = require('../assets/images/PersonUnselected.png');
   * sensorTabs.OVERALLLIGHT = require('../assets/images/PersonUnselectedLight.png');
   * sensorTabs.OVERALLSELECTED = require('../assets/images/PersonSelected.png');
   * @readonly
   * @enum {image}
   */
  sensorsTabs: {
    /** Overall tab icon darkmode */
    OVERALLDARK: require('../assets/images/PersonUnselected.png'),
    /** Overall tab icon lightmode */
    OVERALLLIGHT: require('../assets/images/PersonUnselectedLight.png'),
    /** Overall tab icon selected */
    OVERALLSELECTED: require('../assets/images/PersonSelected.png'),
    /** Sensors tab icon darkmode */
    SENSORSDARK: require('../assets/images/SensorsUnselected.png'),
    /** Sensors tab icon lightmode */
    SENSORSLIGHT: require('../assets/images/SensorsUnselectedLight.png'),
    /** Sensors tab icon selected */
    SENSORSSELECTED: require('../assets/images/SensorsSelected.png'),
  }
}

/**
 * Images for patient status
 * @example
 * statusImages.faces.ACTNOW = require('../assets/images/ActNow.png');
 * statusImages.faces.GOODJOB = require('../assets/images/GoodJob.png');
 * statusImages.humidity.DARK = require('../assets/images/HumidityDark.png');
 * statusImages.pressure.RED = require('../assets/images/PressureRed.png');
 * @readonly
 * @enum {image}
 */
export const statusImages = {
  /** Status face icons */
  faces: {
    /** Act Now status icon */
    ACTNOW: require('../assets/images/ActNow.png'),
    /** Good Job status icon */
    GOODJOB: require('../assets/images/GoodJob.png'),
    /** Pay Attention status icon */
    PAYATTENTION: require('../assets/images/PayAttention.png'),
  },
  /** Colored humidity icons */
  humidity: {
    /** Humidity icon darkmode */
    DARK: require("../assets/images/HumidityDark.png"),
    /** Humidity icon lightmode */
    LIGHT: require("../assets/images/HumidityLight.png"),
    /** Humidity icon orange */
    ORANGE: require("../assets/images/HumidityOrange.png"),
    /** Humidity icon red */
    RED: require("../assets/images/HumidityRed.png"),
  },
  /** Colored pressure icons */
  pressure: {
    /** Pressure icon darkmode */
    DARK: require("../assets/images/PressureDark.png"),
    /** Pressure icon lightmode */
    LIGHT: require("../assets/images/PressureLight.png"),
    /** Pressure icon orange */
    ORANGE: require("../assets/images/PressureOrange.png"),
    /** Pressure icon red */
    RED: require("../assets/images/PressureRed.png"),
  },
  /** Colored temperature icons */
  temperature: {
    /** Temperature icon darkmode */
    DARK: require("../assets/images/TemperatureDark.png"),
    /** Temperature icon lightmode */
    LIGHT: require("../assets/images/TemperatureLight.png"),
    /** Temperature icon orange */
    ORANGE: require("../assets/images/TemperatureOrange.png"),
    /** Temperature icon red */
    RED: require("../assets/images/TemperatureRed.png"),
  },
}

/**
 * Images for use in buttons
 * @example
 * buttonImages.ARROWDOWNDARKDISABLED = require("../assets/images/ArrowDownDarkDisabled.png");
 * buttonImages.PAUSELIGHT = require("../assets/images/PauseLight.png");
 * buttonImages.PLAYDARK = require("../assets/images/PlayDark.png");
 * @readonly
 * @enum {image}
 */
export const buttonImages = {
  /** Disabled arrow icon darkmode */
  ARROWDOWNDARKDISABLED: require("../assets/images/ArrowDownDarkDisabled.png"),
  /** Disabled arrow icon lightmode */
  ARROWDOWNLIGHTDISABLED: require("../assets/images/ArrowDownLightDisabled.png"),
  /** Arrow icon darkmode */
  ARROWDOWNDARK: require("../assets/images/ArrowDownDark.png"),
  /** Arrow icon lightmode */
  ARROWDOWNLIGHT: require("../assets/images/ArrowDownLight.png"),
  /** Arrow icon red */
  ARROWDOWNRED: require("../assets/images/ArrowDownRed.png"),
  /** Darkmode icon */
  DARKMODE: require("../assets/images/DarkMode.png"),
  /** Lightmode icon */
  LIGHTMODE: require("../assets/images/LightMode.png"),
  /** Paused icon darkmode */
  PAUSEDARK: require("../assets/images/PauseDark.png"),
  /** Paused icon lightmode */
  PAUSELIGHT: require("../assets/images/PauseLight.png"),
  /** Play icon darkmode */
  PLAYDARK: require("../assets/images/PlayDark.png"),
  /** Play icon lightmode */
  PLAYLIGHT: require("../assets/images/PlayLight.png"),
  /** Save / File Browser icon darkmode */
  SAVEDARK: require("../assets/images/SaveDark.png"),
  /** Save / File Browser icon lightmode */
  SAVELIGHT: require("../assets/images/SaveLight.png"),
  /** Search icon darkmode */
  SEARCHDARK: require("../assets/images/SearchIcon.png"),
  /** Search icon lightmode */
  SEARCHLIGHT: require("../assets/images/SearchIconLight.png"),
}

  /**
   * Images for use in Calibration Page
   * @example
   * calibrationImages.HUMANDIAGRAM = require("../assets/images/HumanDiagram.png");
   * calibrationImages.SENSORICON = require("../assets/images/Sensor.png");
   * @readonly
   * @enum {image}
   */
export const calibrationImages = {
  /** Sensor location popup background image */
  HUMANDIAGRAM: require("../assets/images/HumanDiagram.png"),
  /** Sensor location popup sensor icon */
  SENSORICON: require("../assets/images/Sensor.png"),
}