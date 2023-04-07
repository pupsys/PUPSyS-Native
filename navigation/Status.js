// Library Imports
import { useContext, useState, } from 'react'
import { Dimensions, Image, View, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { LineChart } from "react-native-chart-kit";

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, DevicesContext, } from '../Context'

// API Imports
import { averagedAdc, getGraphLabels, } from '../api/sensor'; 

// Component Imports
import { PauseButton, } from "../components/Button"
import { Divider, GradientCard, } from "../components/Card";
import { StyledText } from '../components/Text';

/** Navigator for all status tabs */
const StatusTabs = createBottomTabNavigator();

/**
 * Enum for sensor navigation page names
 * @example
 * tabNames.OVERALL = "Overall";
 * tabNames.SENSORS = "Sensors";
 * @readonly
 * @enum {string}
 */
const tabNames = {
  OVERALL: "Overall",
  SENSORS: "Sensors",
};

/** Width of graphs relative to screen width */
const GRAPHSCALE = 0.85;

export default function Status({navigation}) {

    // Get Context
    const { dark } = useContext(DarkContext);
    
    // Render Status tabs
    return (
      <View style={{height: '100%'}}>
        <StatusTabs.Navigator
          initialRouteName={tabNames.SENSORS}
          backBehavior="none"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              // Get the icon for each tab by darkmode value and tab name
              let imgSrc;
              let routeName = route.name;
              if (routeName === tabNames.OVERALL) {
                imgSrc = focused ? require('../assets/images/PersonSelected.png') : dark ? require('../assets/images/PersonUnselected.png') : require('../assets/images/PersonUnselectedLight.png');
              } else if (routeName === tabNames.SENSORS) {
                imgSrc = focused ? require('../assets/images/SensorsSelected.png') : dark ? require('../assets/images/SensorsUnselected.png') : require('../assets/images/SensorsUnselectedLight.png');
              }
                return <Image style={{width: size, height: size}} source={imgSrc} />
              },
            tabBarActiveTintColor: globalColors.green,
            tabBarInactiveTintColor: dark ? darkTheme.textPrimary : lightTheme.textPrimary,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: dark ? darkTheme.tabBarColor : lightTheme.tabBarColor,
              paddingBottom: 5,
              height: 60, 
              paddingTop: 5,
            },
          })}
        >
          <StatusTabs.Screen name={tabNames.OVERALL} component={Overall}/>
          <StatusTabs.Screen name={tabNames.SENSORS} component={Sensors}/>
        </StatusTabs.Navigator>
      </View>
    )
}

function Overall() {
  return (
    <View>
    </View>
  )
}

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

    return devices.map((devices, index) => {
      return <SensorCard key={index} data={devices} />
    });
  }

  /**
   * A component for rendering sensor data
   */
  function SensorCard({data}) {

    /**
     * Get the border color by picking the most extreme color of any reading
     * @returns color key
     */
    function getSummaryColor() {
      /** Get colors of all sensors */
      const allColors = [getPressureColor(), getTemperatureColor(), getHumidityColor()];
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
     * Get the color of pressure text
     * @returns color key
     */
    function getPressureColor() {
      if (!data.paused) {
        if (data.pressure >= 350) {
          return globalColors.red;
        }
        if (data.pressure >= 320) {
          return globalColors.orange;
        }
      }
      return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
    }

    /**
     * Get the image source for pressure icon based on reading color
     * @returns image source
     */
    function getPressureSource() {
      const color = getPressureColor();
      if (color === globalColors.red) {
        return require("../assets/images/PressureRed.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/PressureOrange.png");
      }
      // No worries, return theme colored icon
      return dark ? require("../assets/images/PressureDark.png") : require("../assets/images/PressureLight.png");
    }

    /**
     * Get the color of temperature text
     * @returns color key
     */
    function getTemperatureColor() {
      if (!data.paused) {
        if (data.temperature >= 50) {
          return globalColors.red;
        }
        if (data.temperature >= 40) {
          return globalColors.orange;
        }
      }
      return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
    }

    /**
     * Get the image source for temperature icon based on reading color
     * @returns image source
     */
    function getTemperatureSource() {
      const color = getTemperatureColor();
      if (color === globalColors.red) {
        return require("../assets/images/TemperatureRed.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/TemperatureOrange.png");
      }
      // No worries, return theme colored icon
      return dark ? require("../assets/images/TemperatureDark.png") : require("../assets/images/TemperatureLight.png");
    }

    /**
     * Get the color of humidity text
     * @returns color key
     */
    function getHumidityColor() {
      if (!data.paused) {
        if (data.humidity >= 50) {
          return globalColors.red;
        }
        if (data.humidity >= 25) {
          return globalColors.orange;
        }
      }
      return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
    }

    /**
     * Get the image source for humidity icon based on reading color
     * @returns image source
     */
    function getHumiditySource() {
      const color = getHumidityColor();
      if (color === globalColors.red) {
        return require("../assets/images/HumidityRed.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/HumidityOrange.png");
      }
      // No worries, return theme colored icon
      return dark ? require("../assets/images/HumidityDark.png") : require("../assets/images/HumidityLight.png");
    }

    /**
     * Get the summary text based on card's background color
     * @returns summary string ("Act Now", "Pay Attention", or "Good Job")
     */
    function getSummaryText() {
      const color = getSummaryColor();
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
     * @returns image source
     */
    function getSummarySource() {
      const color = getSummaryColor();
      if (color === globalColors.red) {
        return require("../assets/images/ActNow.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/PayAttention.png");
      }
      return require("../assets/images/GoodJob.png");
    }

    /**
     * Change the current device's paused status
     */
    function togglePaused() {
      // Clone devices list
      let newDevices = [];
      for (const d of devices) {
        newDevices.push(d);
      }
      // Set current device's logTo to value of text field
      newDevices[data.id].paused = !newDevices[data.id].paused;
      // Update state
      setDevices(newDevices);
    }

    /**
     * Component to display humidity data
     */
    function HumidityReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getHumiditySource()}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={data.paused ? "..." : `${data.humidity}%`} 
            marginLeft={5} 
            marginRight={5} 
            color={getHumidityColor()}
          />
        </View>
      )
    }

    /**
     * Component to display temperature data
     */
    function TemperatureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center">
          <Image 
            source={getTemperatureSource()}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={data.paused ? "..." : `${data.temperature}°C`} 
            marginLeft={5} 
            marginRight={5} 
            color={getTemperatureColor()}
          />
        </View>
      )
    }

    /**
     * Component to display pressure data
     */
    function PressureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getPressureSource()}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={data.paused ? "..." : `${data.pressure}mmHg`} 
            marginLeft={5} 
            marginRight={5} 
            color={getPressureColor()}
          />
        </View>
      )
    }

    /**
     * Components to show graphs so long as card is expanded
     */
    function Graphs() {
      // Guard clauses:
      if (!data.expanded) { return; } // Card is not expanded
      
      // Render graphs
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            padding: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              padding: 5,
            }}
          >
            <Image 
              source={getPressureSource()}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText text="Pressure (adc)" marginLeft={5} color={getPressureColor()} />
          </View>
          { data.paused  ? <StyledText text="Sensor Paused" width="100%" marginBottom={5} /> : <CenteredChart data={examplePressureData} color={getPressureColor()} /> }
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              padding: 5,
            }}
          >
            <Image 
              source={getTemperatureSource()}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText text="Temperature (°C)" marginLeft={5} color={getTemperatureColor()} />
          </View>
          { data.paused  ? <StyledText text="Sensor Paused" width="100%" marginBottom={5} /> : <CenteredChart data={exampleTemperatureData} color={getTemperatureColor()} /> }
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              padding: 5,
            }}
          >
            <Image 
              source={getHumiditySource()}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText text="Humidity (%)" marginLeft={5} color={getHumidityColor()} />
          </View>
          { data.paused  ? <StyledText text="Sensor Paused" width="100%" marginBottom={5} /> : <CenteredChart data={exampleHumidityData} color={getHumidityColor()} /> }
        </View>
      )
    }

    /**
     * Toggle device expanded status
     */
    function toggleExpanded() {
      // Clone devices list
      let newDevices = [];
      for (const d of devices) {
        newDevices.push(d);
      }
      // Set current device's logTo to value of text field
      newDevices[data.id].expanded = !newDevices[data.id].expanded;
      // Update state
      setDevices(newDevices);
    }

    /**
     * Component to display sensor summary. Does not show if paused.
     */
    function Summary() {
      // Guard clauses:
      if (data.paused) { return; } // Do not show if sensor is paused
      
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image source={getSummarySource()} style={{height: 20, width: 20}}/>
          <StyledText text={getSummaryText()} color={getSummaryColor()} marginLeft={10}/>
        </View>
      )
    }

    return (
      <GradientCard
        flexDirection="column"
        justifyContent="center"
        gradient={getSummaryColor()}
        onClick={toggleExpanded}
        disabled={data.paused}
      >
        <View 
          display="flex" 
          flexDirection="row" 
          aligntItems="center" 
          justifyContent="space-between"
          style={{          
            width: "100%",
          }}
        >
          <StyledText text={`Sensor ${data.id + 1}: ${data.location}`} fontWeight="bold" />
          <Image 
            source={dark ? require("../assets/images/ArrowDownDark.png") : require("../assets/images/ArrowDownLight.png")}
            style={{
              width: 40,
              height: 40,
              transform: [{ rotate: data.expanded ? "0deg" : "180deg" }],
            }}
          />
        </View>
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
        { data.expanded && <Divider /> }
        <Graphs />
        <Summary />
        { data.expanded && <PauseButton paused={data.paused} onClick={togglePaused}/> }
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
 * Component to render a chart with a provided data
 * @param {Object} data chart data
 * @param {string} color line color
 */
function CenteredChart({data, color, backgroundColor}) {

  const {dark} = useContext(DarkContext)

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LineChart
        data={data}
        segments={4}
        width={Dimensions.get("window").width * GRAPHSCALE} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        withVerticalLines={false}
        chartConfig={{
          backgroundColor: dark ? darkTheme.cardFill : lightTheme.cardFill,
          backgroundGradientFrom: dark ? darkTheme.cardFill : lightTheme.cardFill,
          backgroundGradientTo: dark ? darkTheme.cardFill : lightTheme.cardFill,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => color,
          labelColor: () => dark ? darkTheme.textPrimary : lightTheme.textPrimary,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: dark ? darkTheme.textPrimary : lightTheme.textPrimary,
          },
          propsForBackgroundLines: {
            opacity: 0.2,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
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

const exampleTemperatureData = {
  labels: ["January", "February", "March", "April", "May", "June"],
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
  labels: ["January", "February", "March", "April", "May", "June"],
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