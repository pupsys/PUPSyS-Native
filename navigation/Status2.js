// Library Imports
import { useContext, useEffect, useState, } from 'react';
import { Dimensions, Image, View, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { LineChart } from "react-native-chart-kit";

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, DevicesContext, SensorContext } from '../Context';

// API Imports
import { buttonImages, statusImages, } from "../api/image";
import { statusTabsPages, } from "../api/navigation";
import { getSummaryColor, getPressureColor, getTemperatureColor, getHumidityColor, } from '../api/sensor'; 
import { thresholds, } from '../api/threshold';

// Component Imports
import { PauseButton, } from "../components/Button";
import { Divider, GradientCard, } from "../components/Card";
import { CenteredTitle, StyledText, } from '../components/Text';
import { createStackNavigator } from '@react-navigation/stack';

/** Navigator for all status tabs */
const StatusStack = createStackNavigator();

/** Width of graphs relative to screen width */
const GRAPHSCALE = 0.85;

/**
 * Component to hold Status Tabs
 * @param {Object} props - Component properties
 * @param {ReactNavigation} props.navigation - Navigation object from AppStack 
 * @returns {React.Component} - Navigator component for Status pages
 */
export default function Status({navigation}) {

  // Get Context
  const { dark } = useContext(DarkContext);
    
  // Render Status tabs
  return (
    <View style={{height: '100%'}}>
      <StatusStack.Navigator
        initialRouteName={statusTabsPages.DASHBOARD}
        screenOptions={{
          headerShown: false,
        }}
      >
        <StatusStack.Screen name={statusTabsPages.DASHBOARD} component={Dashboard}/>
      </StatusStack.Navigator>
    </View>
  )
}

/**
 * Dashboard page for sensor / reading data
 * @param {Object} props - Component properties
 * @param {ReactNavigation} props.navigation - Navigation object from StatusStack 
 * @returns {React.Component} - Page with routes to sensor and reading detail pages
 */
function Dashboard({navigation}) {

  // Get Context
  const { dark } = useContext(DarkContext);
  const { devices, setDevices } = useContext(DevicesContext);
  
  /**
   * Component for rendering a list of all devices currently connected. Clicking on a device brings
   * the user to a detailed view of all device data.
   */
  function DeviceList() {

    // Map devices to gradient cards
    return devices.map((device, index) => {

      /** Overall color for device */
      const summaryColor = getSummaryColor(device);

      /**
       * Header for device card
       * @returns {React.Component} - Text for device location and summary icon
       */
      function DeviceHeader() {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StyledText text={`${device.location}:`}/>
            <Summary color={summaryColor} />
          </View>
        )
      }

      /**
       * Horizontal list of device readings
       * @returns {React.Component} - Text for pressure, temperature, and humidity
       */
      function DeviceReadings() {

        /**
         * Component to render a single device reading
         * @param {Object} props - Component properties
         * @param {string} props.title - Reading title
         * @param {string} props.unit - Reading unit
         * @param {number} props.value - Reading value
         * @param {string} props.color - Reading color
         * @returns {React.Component} - Colored reading text and value
         */
        function Reading({title, unit, value, color}) {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StyledText text={title} color={color}/>
              <StyledText text={value.toString() + unit} color={color}/>
            </View>
          )
        }

        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Reading title="Pressure" unit="mmHg" value={device.pressure} color={getPressureColor(device)} />
            <Reading title="Temperature" unit="°C" value={device.temperature} color={getTemperatureColor(device)} />
            <Reading title="Humidity" unit="%" value={device.humidity} color={getHumidityColor(device)} />
          </View>
        )
      }

      return (
        <GradientCard key={index} flexDirection="column" gradient={summaryColor}>
          <DeviceHeader />
          <Divider marginTop={10} marginBottom={10} color={summaryColor} />
          <DeviceReadings />
        </GradientCard>
      )
    });
  }

  /**
   * Carousel component displaying overall status and a card for each reading type
   * @returns {React.Component} - View with gradient cards for readings and overall status 
   */
  function OverallCarousel() {
    
    /** Overall color for patient */
    const overallColor = getOverallColor();

    /**
     * Get the overall pressure color
     * @returns {string} - Color key string
     */
    function getPressureColorOverall() {
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
     * Get the overall temperature color
     * @returns {string} - Color key string
     */
    function getTemperatureColorOverall() {
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
     * Get the overall humidity color
     * @returns {string} - Color key string
     */
    function getHumidityColorOverall() {
      for (const device of devices) {
        if (device.humidity >= thresholds.humidity.RED) {
          return globalColors.red;
        }
        if (device.humidity >= thresholds.humidity.ORANGE) {
          return globalColors.orange;
        }
      }
      return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
    }

    /**
     * Get the most severe of overall pressure, temperature, and humidity colors
     * @returns {string} - Color key string
     */
    function getOverallColor() {
      // Get all three reading colors
      const pressureColor = getPressureColorOverall();
      const temperatureColor = getTemperatureColorOverall();
      const humidityColor = getHumidityColorOverall();

      // If any are red, return red
      if (pressureColor === globalColors.red || temperatureColor === globalColors.red || humidityColor === globalColors.red) {
        return globalColors.red;
      }

      // If any are orange, return orange
      if (pressureColor === globalColors.orange || temperatureColor === globalColors.orange || humidityColor === globalColors.orange) {
        return globalColors.orange;
      }

      // If all was well, return green
      return globalColors.green;
    }

    /**
     * Component to display overall patient status
     * @returns {React.Component} - Gradient card for overall patient status 
     */
    function OverallCard() {

      /**
       * Header for overall card
       * @returns {React.Component} - Overall title and summary icon
       */
      function OverallHeader() {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StyledText text={"Overall:"}/>
            <Summary color={overallColor} />
          </View>
        )
      }

      /**
       * Horizontal list of overall readings
       * @returns {React.Component} - Icons and checks for pressure, temperature, and humidity
       */
      function OverallReadings() {

        const pressureColor = getPressureColorOverall();
        const temperatureColor = getTemperatureColorOverall();
        const humidityColor = getHumidityColorOverall();

        /**
         * Component to render a single device reading
         * @param {Object} props - Component properties
         * @param {Image} props.icon - Reading icon
         * @param {string} props.color - Reading overall color
         * @returns {React.Component} - Colored reading text and value
         */
        function Reading({icon, color}) {
          
          /** Checked if color is green */
          const checked = (color === globalColors.green);

          return (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image source={icon} style={{ width: 30, height: 30, }}/>
              <StyledText text={checked ? "✓" : "✖"} color={color}/>
            </View>
          )
        }

        /**
         * Get pressure icon based on overall pressure color
         * @returns {Image} - Source for pressure icon
         */
        function getPressureIcon() {
          /** Scope to pressure icons only */
          const pressureImages = statusImages.pressure;

          // If red, return red
          if (pressureColor === globalColors.red) {
            return pressureImages.RED;
          }

          // If orange, return orange
          if (pressureColor === globalColors.orange) {
            return pressureImages.ORANGE;
          }

          // Return based on theme
          return dark ? pressureImages.DARK : pressureImages.LIGHT;
        }

        /**
         * Get temperature icon based on overall temperature color
         * @returns {Image} - Source for temperature icon
         */
        function getTemperatureIcon() {
          /** Scope to temperature icons only */
          const temperatureImages = statusImages.temperature;

          // If red, return red
          if (temperatureColor === globalColors.red) {
            return temperatureImages.RED;
          }

          // If orange, return orange
          if (temperatureColor === globalColors.orange) {
            return temperatureImages.ORANGE;
          }

          // Return based on theme
          return dark ? temperatureImages.DARK : temperatureImages.LIGHT;
        }

        /**
         * Get humidity icon based on overall humidity color
         * @returns {Image} - Source for humidity icon
         */
        function getHumidityIcon() {
          /** Scope to humidity icons only */
          const humidityImages = statusImages.humidity;

          // If red, return red
          if (humidityColor === globalColors.red) {
            return humidityImages.RED;
          }

          // If orange, return orange
          if (humidityColor === globalColors.orange) {
            return humidityImages.ORANGE;
          }

          // Return based on theme
          return dark ? humidityImages.DARK : humidityImages.LIGHT;
        }

        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Reading icon={getPressureIcon()} color={pressureColor} />
            <Reading icon={getTemperatureIcon()} color={temperatureColor} />
            <Reading icon={getHumidityIcon()} color={humidityColor} />
          </View>
        )
      }

      return (
        <GradientCard flexDirection="column" gradient={overallColor}>
          <OverallHeader />
          <Divider color={overallColor} marginTop={10} marginBottom={10} />
          <OverallReadings />
        </GradientCard>
      )
    }

    return (
      <View>
        <OverallCard />
      </View>
    )
  }
  
  return (
    <ScrollView
      style={{
        height: "100%",
        paddingHorizontal: 20,
      }}
    >
      <OverallCarousel />
      <Divider marginTop={10} />
      <CenteredTitle text="Devices:" />
      <DeviceList />
    </ScrollView>
  )
}

/**
 * Summary component displaying smiley icon and text based on color input
 * @param {Object} props - Component properties
 * @param {string} props.color - Color key for summary
 * @returns {React.Component} - View with Image and StyledText for overall sensor readings
 */
function Summary({color}) {
  
    /**
     * Get the summary text based on card's background color
     * @returns {string} - Summary string ("Act Now", "Pay Attention", or "Good Job")
     */
    function getSummaryText() {
      if (color === globalColors.red) {
        return "Act Now";
      }
      if (color === globalColors.orange) {
        return "Pay Attention";
      }
      return "Good Job";
    }

    /**
     * Get the summary image based on card's background color
     * @returns {Image} - Image source
     */
    function getSummarySource() {
      if (color === globalColors.red) {
        return statusImages.faces.ACTNOW;
      }
      if (color === globalColors.orange) {
        return statusImages.faces.PAYATTENTION;
      }
        return statusImages.faces.GOODJOB;
    }

    return (
      <View display="flex" flexDirection="row" alignItems="center" >
        <Image source={getSummarySource()} style={{height: 20, width: 20}}/>
        <StyledText text={getSummaryText()} color={color} marginLeft={10}/>
      </View>
    )
}