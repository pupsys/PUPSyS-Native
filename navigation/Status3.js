// Library Imports
import { useContext, useRef, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { LineChart, } from "react-native-chart-kit";

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, DevicesContext, } from '../Context';

// API Imports
import { buttonImages, navigationImages, statusImages, } from "../api/image";
import { statusTabsPages, } from "../api/navigation";
import { 
  averagedAdc, 
  getAlpha, 
  getGraphLabels, 
  getHumidityColor,
  getHumidityColorOverall, 
  getHumiditySource, 
  getMostSevereColor, 
  getPressureColor,
  getPressureColorOverall,
  getPressureSource,
  getScaledAdc, 
  getTemperatureColor,
  getTemperatureColorOverall,
  getTemperatureSource,
  thresholds, } from '../api/sensor'; 

// Component Imports
import { PauseButton, } from "../components/Button";
import { Divider, GradientCard, } from "../components/Card";
import { CenteredTitle, StyledText, } from '../components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Width of graphs relative to screen width */
const GRAPHSCALE = 0.85;

/** Number of cards for overall carousel */
const NUM_OVERALL_CARDS = 4;

/**
 * Component to hold Status Tabs
 * @param {Object} props - Component properties
 * @param {ReactNavigation} props.navigation - Navigation object from AppStack 
 * @returns {React.Component} - Navigator component for Status pages
 */
export default function Status({navigation}) {

  // Get context
  const { devices } = useContext(DevicesContext);
  const { dark } = useContext(DarkContext);

  /**
   * Component to display a card with list of all connected devices and their pressure readings
   * @param {Objects} props - Component properties
   * @param {string} props.reading - Reading to display from device
   * @param {number} props.orange - Orange threshold
   * @param {number} props.red - Red threshold
   * @returns {React.Component} - ScrollView populated with a header and {@link DeviceListItem}
   * Not including a {@link props.reading} will display overall status
   */
  function DeviceList({reading, orange, red}) {

    /** If not given a reading, we're in overall mode */
    const overallMode = !reading;

    /**
     * Component for rendering a device in BLE devices list
     * @param {Object} props - Component properties
     * @param {boolean} props.header - Whether this is the header
     * @param {Object} props.device - Device object
     * @returns {React.Component} - View acting as a ListItem for a device
     * @see {@link devices}
     */
    function DeviceListItem({header, device}) {

      /** Handle any reading header override from overallMode **/
      const readingHeader = overallMode ? "Status" : "Reading"; 

      /**
       * Get color of reading by thresholds {@link orange} and {@link red} or overall
       * @returns {string} - Color key string
       */
      function getBackgroundColor() {
        // Guard clauses
        if (header)                           { return; } // This is the header 
        if (!device[reading] && !overallMode) { return; } // Somehow there is no device reading, but we're not in overall mode

        // If we're in overallMode, take the most severe of all reading colors
        if (overallMode) {
          // We're in overallMode
          const pressureColor = getPressureColor(device);
          const temperatureColor = getTemperatureColor(device);
          const humidityColor = getHumidityColor(device);

          return getMostSevereColor([pressureColor, temperatureColor, humidityColor]);
        }

        // If we're not in overallMode, just compare with given thresholds
        if (device[reading] >= red) {
          return globalColors.red;
        }
        if (device[reading] >= orange) {
          return globalColors.red;
        }
        return globalColors.green;
      }

      function getReadingText() {
        // Guard clauses:
        if (!device) { return "?"; } // Somehow device is undefined?? This happens, but it shouldn't.

        // If we're in overallMode, get the text from the backgroundColor
        if (overallMode) {
          /** Overall color for this device */
          const overallColor = getBackgroundColor();
          if (overallColor === globalColors.red) {
            return "Act Now";
          }
          if (overallColor === globalColors.orange) {
            return "Pay Attention";
          }
          return "Good Job";
        }
        return device[reading];
      }

      /** Handle a reading value override */
      const readingValue = getReadingText();

      // Render device in a View
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 2,
            backgroundColor: getAlpha(getBackgroundColor()),
          }}
        >
          <StyledText text={header ? "#" : `${device.id + 1}`} width="10%" align="center"/>
          <Divider vertical={true}/>
          <StyledText text={header ? "Location" : device.location} width="50%"/>
          <Divider vertical={true}/>
          <StyledText text={header ? readingHeader : readingValue} width="40%"/>
        </View>
      )
    }
      /**
       * Map BLE devices to list items
       */
      function renderBLEDevices() {
        return devices.map((device, index) => {
          return <DeviceListItem key={index} device={device}/>
        })
      }

      return (
        <ScrollView
            style={{
              backgroundColor: dark ? darkTheme.tabBarColor : lightTheme.tabBarColor,
              width: "100%",
              padding: 10,
              marginTop: 10,
              borderColor: dark ? darkTheme.cardBorder : lightTheme.cardBorder,
              borderWidth: 1,
              borderRadius: 5,
            }}
            >
              <DeviceListItem header={true}/>
              <Divider />
              { renderBLEDevices() }
        </ScrollView>
      )
    }

  /**
   * Component to display all overall readings in a horizontal carousel
   * @returns {React.Component} - Overall readings in a horizontal ScrollView
   */
  function OverallCarousel() {

    /**
     * Component to display overall pressure readings
     * @returns {React.Component} - Overall pressure readings in a GradientCard
     */
    function PressureOverall() {

      /** Overall pressure color */
      const pressureOverallColor = getPressureColorOverall(devices);

      return (
        <GradientCard flexDirection="column" gradient={pressureOverallColor}>
          <StyledText text="Pressure (mmHg)" />
          <Divider marginTop={10} />
          <DeviceList reading="pressure" orange={thresholds.pressure.ORANGE} red={thresholds.pressure.RED}/>
        </GradientCard>
      );
    }

    /**
     * Component to display overall temperature readings
     * @returns {React.Component} - Overall temperature readings in a GradientCard
     */
    function TemperatureOverall() {

      /** Overall temperature color */
      const temperatureOverallColor = getTemperatureColorOverall(devices);

      return (
        <GradientCard flexDirection="column" gradient={temperatureOverallColor}>
          <StyledText text="Temperature (°C)" />
          <Divider marginTop={10} />
          <DeviceList reading="temperature" orange={thresholds.temperature.ORANGE} red={thresholds.temperature.RED}/>
        </GradientCard>
      );
    }

    /**
     * Component to display overall humidity readings
     * @returns {React.Component} - Overall humidity readings in a GradientCard
     */
    function HumidityOverall() {

      /** Overall humidity color */
      const humidityOverallColor = getHumidityColorOverall(devices);

      return (
        <GradientCard flexDirection="column" gradient={humidityOverallColor}>
          <StyledText text="Humidity (%)" />
          <Divider marginTop={10} />
          <DeviceList reading="humidity" orange={thresholds.humidity.ORANGE} red={thresholds.humidity.RED}/>
        </GradientCard>
      );
    }

    /**
     * Component to display which sensors have any issues
     * @returns {React.Component} - Overall readings in a GradientCard
     */
    function OverallHome() {

      /**
       * Using the three colors {@link pressureOverallColor}, {@link temperatureOverallColor}, and {@link humidityOverallColor},
       * return the most severe of the three.
       */
      function getOverallColor() {
        // Get all three overall colors
        const pressureOverallColor = getPressureColorOverall(devices);
        const temperatureOverallColor = getTemperatureColorOverall(devices);
        const humidityOverallColor = getHumidityColorOverall(devices);

        // If any are red, return red
        if (pressureOverallColor === globalColors.red || temperatureOverallColor === globalColors.red || humidityOverallColor === globalColors.red) {
          return globalColors.red;
        }

        // If any are orange, return orange
        if (pressureOverallColor === globalColors.orange || temperatureOverallColor === globalColors.orange || humidityOverallColor === globalColors.orange) {
          return globalColors.orange;
        }

        // All is well! Return green
        return globalColors.green;
      }

      /** Overall color */
      const overallColor = getOverallColor();

      return (
        <GradientCard flexDirection="column" gradient={overallColor}>
          <StyledText text="Overall" />
          <Divider marginTop={10} />
          <DeviceList overallMode={true} />
        </GradientCard>
      );
    }
    
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ 
          width: `${100 * NUM_OVERALL_CARDS}%`,
        }}
        style={{
          paddingBottom: 10
        }}
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={100}
        decelerationRate="fast"
        pagingEnabled
      >
        <OverallHome />
        <PressureOverall />
        <TemperatureOverall />
        <HumidityOverall />
      </ScrollView>
    )
  }
  
  return (
    <ScrollView
      style={{
        padding: 10,
      }}
    >
      <OverallCarousel />
      <CenteredTitle text="Sensors:" />
      <Sensors />
    </ScrollView>
  )
}

/**
 * Component for displaying sensors separately from one another
 */
function Sensors() {
  
  // Get Context
  const { dark } = useContext(DarkContext);

  // Get data from sensors over BLE
  const { devices, setDevices } = useContext(DevicesContext);

  /**
   * Render a sensor card for each sensor in {@link sensorData}
   */
  function renderSensorCards() {
    // Guard Clauses:
    if (!devices) { return; } // No sensor data exists, so we shouldn't try to render anything

    return devices.map((device, index) => {
      return <SensorCard key={index} device={device} />
    });
  }

  /**
   * A component for rendering sensor data
   * @param {Object} props.device device from DevicesContext
   * @returns {React.Component} - A GradientCard with sensor data displays
   */
  function SensorCard({device}) {

    /** This device's pressure color */
    const pressureColor = getPressureColor(device);
    /** This device's temperature color */
    const temperatureColor = getTemperatureColor(device);
    /** This device's humidity color */
    const humidityColor = getHumidityColor(device);
    /** Get colors of all readings */
    const allColors = [ pressureColor, temperatureColor, humidityColor ];

    /**
     * Get the border color by picking the most extreme color of any reading
     * @returns {string} - Color key string
     */
    function getSummaryColor() {

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
     * Component to display humidity device
     */
    function HumidityReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getHumiditySource(device)}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={`${device.humidity}%`} 
            marginLeft={5} 
            marginRight={5} 
            color={humidityColor}
          />
        </View>
      )
    }

    /**
     * Component to display temperature device
     */
    function TemperatureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center">
          <Image 
            source={getTemperatureSource(device)}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={`${device.temperature}°C`} 
            marginLeft={5} 
            marginRight={5} 
            color={temperatureColor}
          />
        </View>
      )
    }

    /**
     * Component to display pressure device
     */
    function PressureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getPressureSource(device)}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={`${device.pressure}mmHg`} 
            marginLeft={5} 
            marginRight={5} 
            color={pressureColor}
          />
        </View>
      )
    }

    return (
      <GradientCard
        flexDirection="column"
        justifyContent="center"
        gradient={getSummaryColor()}
      >
        <StyledText 
          text={`Sensor ${device.id + 1}: ${device.location}`} 
          fontWeight="bold" 
          marginBottom={5}
        />
        <Divider />
        <View 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
          style={{          
            width: "100%",
            margin: 5,
          }}
        >
          <PressureReading />
          <TemperatureReading />
          <HumidityReading />
        </View>
        <Summary color={getSummaryColor()} />
      </GradientCard>
    )
  }
    
  return (
    <View>
      <ScrollView
        style={{
          padding: 10,
        }}
      >
        { renderSensorCards() }
      </ScrollView>
    </View>
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

const examplePressureData = {
  labels: getGraphLabels(averagedAdc),
  datasets: [
    {
      data: averagedAdc
    }
  ]
};

const exampleOverallPressureData = {
  labels: getGraphLabels(averagedAdc),
  datasets: [
    {
      data: averagedAdc
    },
    {
      data: getScaledAdc(.5)
    },
    {
      data: getScaledAdc(.8)
    },
    {
      data: getScaledAdc(.6)
    }
  ]
};

const exampleTemperatureData = {
  labels: getGraphLabels(
    [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  ),
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ]
    }
  ]
};

const exampleHumidityData = {
  labels: getGraphLabels(
    [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  ),
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ]
    }
  ]
};